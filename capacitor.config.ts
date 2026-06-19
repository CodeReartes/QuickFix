import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quickfix.app',
  appName: 'QuickFix',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
