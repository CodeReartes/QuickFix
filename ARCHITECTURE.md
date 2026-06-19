# Arquitectura QuickFix

## 1. Esquemas de Datos (Firestore)

### Colección: `users`
- `uid`: string (ID del documento)
- `email`: string
- `role`: 'client' | 'professional'
- `displayName`: string
- `phoneNumber`: string
- `profession`: string (Solo si es 'professional')
- `rating`: number
- `location`: Map { lat, lng, address }

### Colección: `jobs`
- `id`: string
- `clientId`: string (Referencia a users)
- `professionalId`: string (Referencia a users)
- `status`: 'pending' | 'accepted' | 'in_progress' | 'completed'
- `category`: string
- `description`: string
- `photoBefore`: string (URL)
- `photoAfter`: string (URL)
- `location`: Map { lat, lng, address }
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Colección: `messages` (Subcolección de jobs)
- `senderId`: string
- `text`: string
- `createdAt`: timestamp

### Colección: `reviews`
- `jobId`: string
- `fromId`: string
- `toId`: string
- `rating`: number
- `comment`: string
- `createdAt`: timestamp

---

## 2. Endpoints RESTful Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Registro de usuario (Client/Professional) |
| **POST** | `/api/jobs` | Cliente crea una nueva solicitud con foto |
| **GET** | `/api/jobs/nearby` | Profesional busca trabajos en su radio de acción |
| **PATCH** | `/api/jobs/:id/status` | Actualizar estado (Aceptar, Iniciar, Finalizar) |
| **GET** | `/api/jobs/:id/messages` | Obtener historial de chat |
| **POST** | `/api/jobs/:id/messages` | Enviar mensaje |
| **POST** | `/api/jobs/:id/review` | Calificar el servicio finalizado |

---

## 3. Sub-prompt para Gemini Vision

Cuando el cliente sube la foto, usa este prompt:

> "Analiza esta imagen de un problema del hogar. Identifica: 
> 1. El oficio o especialidad requerida (ej. Electricista, Plomero, Cerrajero, Carpintero).
> 2. Una descripción breve y técnica del daño observado.
> 
> Responde estrictamente en formato JSON:
> {
>   \"category\": \"Nombre del Oficio\",
>   \"description\": \"Descripción detallada del daño\"
> }"
