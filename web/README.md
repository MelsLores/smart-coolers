# Smart Coolers - Sistema de Tickets

Este proyecto contiene:
- **Frontend Angular**: en `web/frontend` para la gestión visual de tickets.
- **Backend Node.js/Express**: en `web/api` para la API REST conectada a MongoDB.

## Primeros pasos

### Backend
1. Instala las dependencias:
   ```bash
   cd web/api
   npm install
   ```
2. Asegúrate de tener MongoDB corriendo localmente en el puerto 27017.
3. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Frontend
1. Instala las dependencias:
   ```bash
   cd web/frontend
   npm install
   ```
2. Inicia la aplicación Angular:
   ```bash
   npm start
   ```

## Notas
- El frontend consumirá la API del backend para mostrar, crear y actualizar tickets.
- Puedes personalizar los modelos y rutas según tus necesidades.
