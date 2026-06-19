import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendEmailVerification,
  User as FirebaseUser,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, UserRole } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AuthContextType {
  user: User | null;
  effectiveUser: User | null;
  loading: boolean;
  signIn: (rolePreference?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  completeRegistration: (role: UserRole, extraData?: Partial<User>) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  adminViewRole: UserRole | null;
  setAdminViewRole: (role: UserRole | null) => void;
  garantias_disponibles: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminViewRole, setAdminViewRole] = useState<UserRole | null>(null);
  const [garantiasDisponibles, setGarantiasDisponibles] = useState(2);

  useEffect(() => {
    if (!user) {
      setGarantiasDisponibles(2);
      return;
    }

    // Subscribe to jobs collection for this client to dynamically compute available guarantees in real-time
    const q = query(
      collection(db, 'jobs'),
      where('clientId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const validStatuses = ['completed', 'completado', 'paid_completed'];
      const completedJobs = snapshot.docs
        .map(d => d.data())
        .filter((d: any) => validStatuses.includes(d.status));
      const spentCount = completedJobs.length;
      setGarantiasDisponibles(Math.max(0, 2 - spentCount));
    }, (error) => {
      console.error("Error subscribing to jobs in AuthProvider for guarantees:", error);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = null;
      }

      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        unsubscribeUserDoc = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data() as User;
            setUser({ ...userData, emailVerified: firebaseUser.emailVerified });
          } else {
            setUser(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user document:", error);
          setLoading(false);
        });
      } else {
        setUser(null);
        setAdminViewRole(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
    };
  }, []);

  const effectiveUser = React.useMemo(() => {
    if (!user) return null;
    if (user.email === 'reartes17diego@gmail.com' && adminViewRole) {
      return { ...user, role: adminViewRole };
    }
    return user;
  }, [user, adminViewRole]);

  const signIn = async (rolePreference?: UserRole) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const isActualAdmin = result.user.email === 'reartes17diego@gmail.com';
    
    // If they are not the actual admin, reset any admin view role
    if (!isActualAdmin) {
      setAdminViewRole(null);
    }
    
    const userRef = doc(db, 'users', result.user.uid);
    let userDoc;
    try {
      userDoc = await getDoc(userRef);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `users/${result.user.uid}`);
      return;
    }

    if (userDoc.exists()) {
      const existingData = userDoc.data() as User;
      
      // If they are not the actual admin, they cannot choose 'admin'
      const targetRole = (!isActualAdmin && (rolePreference as any) === 'admin') ? undefined : rolePreference;

      if (targetRole && existingData.role !== targetRole) {
        try {
          await updateDoc(userRef, { role: targetRole });
        } catch (e) {
          handleFirestoreError(e, OperationType.UPDATE, `users/${result.user.uid}`);
        }
        setUser({ ...existingData, role: targetRole });
      } else {
        setUser(existingData);
      }
    } else {
      // New registration
      let finalRole = rolePreference;
      if (!finalRole || (finalRole as any) === 'admin') {
        finalRole = 'client';
      }

      const newUser: any = {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || 'Usuario',
        role: finalRole,
        createdAt: Date.now()
      };
      if (result.user.photoURL) {
        newUser.photoURL = result.user.photoURL;
      }
      try {
        await setDoc(userRef, newUser);
      } catch (e: any) {
        console.error("Payload failed to create:", newUser);
        handleFirestoreError(e, OperationType.CREATE, `users/${result.user.uid}`);
      }
      
      setUser({ ...newUser, emailVerified: result.user.emailVerified } as User);
    }
  };

  const completeRegistration = async (role: UserRole, extraData?: Partial<User>) => {
    if (!auth.currentUser) throw new Error('No user authenticated');
    
    const newUser: User = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email || '',
      displayName: auth.currentUser.displayName || 'Usuario',
      photoURL: auth.currentUser.photoURL || undefined,
      role: role,
      ...extraData,
      createdAt: Date.now()
    } as any;

    await setDoc(doc(db, 'users', auth.currentUser.uid), newUser);
    
    setUser({ ...newUser, emailVerified: auth.currentUser.emailVerified });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, data);
    setUser({ ...user, ...data });
  };

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ 
      user, 
      effectiveUser, 
      loading, 
      signIn, 
      signOut, 
      completeRegistration, 
      updateProfile,
      adminViewRole,
      setAdminViewRole,
      garantias_disponibles: garantiasDisponibles
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
