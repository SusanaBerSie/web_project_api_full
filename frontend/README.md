# Around The U.S. - Frontend

Cliente React para la aplicación Around The U.S., una red social para compartir fotografías.

## 🛠 Tecnologías

- **React 19.1.0** - Librería de UI
- **React Router DOM 7.9.1** - Enrutamiento y navegación
- **Vite 6.3.5** - Build tool y dev server
- **Helmet 8.1.0** - Seguridad de headers HTTP
- **CSS3** - Estilos con metodología BEM

### Herramientas de Desarrollo

- **ESLint** - Linter para mantener código limpio
- **Jest** - Framework de testing
- **Vite** - Hot Module Replacement para desarrollo rápido

## 📁 Estructura de Carpetassrc/

├── components/ # Componentes reutilizables de React
│ ├── App.jsx
│ ├── Header.jsx
│ ├── Main.jsx
│ ├── Footer.jsx
│ ├── Card.jsx
│ ├── ImagePopup.jsx
│ └── ...
├── contexts/ # Context API de React
├── utils/ # Utilidades y helpers
│ └── api.js # Llamadas a la API
├── images/ # Recursos estáticos
├── blocks/ # Estilos CSS organizados por bloques BEM
└── index.jsx # Punto de entrada de la aplicación

## 🚀 Instalación

### Prerrequisitos

- Node.js 14 o superior
- npm o yarn

### Pasos

1. **Navegar a la carpeta del frontend**

```bash
cd frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno (opcional)**

Crea un archivo `.env` en la raíz del frontend si necesitas configurar la URL de la API:

```env
VITE_API_URL=http://localhost:3000
```

## 💻 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo con Vite en `http://localhost:5173` (o el siguiente puerto disponible). Se abrirá automáticamente en el navegador con hot-reload activado.

### Build de Producción

```bash
npm run build
```

Genera los archivos optimizados para producción en la carpeta `dist/`.

### Preview de Producción

```bash
npm run preview
```

Previsualiza la build de producción localmente antes de desplegar.

### Linting

```bash
npm run lint
```

Ejecuta ESLint para detectar problemas en el código.

### Testing

```bash
npm test
```

Ejecuta los tests con Jest.

## 🔗 Conexión con el Backend

El frontend se comunica con el backend a través de peticiones HTTP usando Fetch API. La configuración de la URL base de la API se encuentra en:

```javascript
// src/utils/api.js
const BASE_URL = "http://localhost:3000";
```

**Importante:** Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

## 🎨 Características de la UI

### Componentes Principales

- **App** - Componente raíz que maneja el estado global
- **Header** - Barra de navegación con logo y datos del usuario
- **Main** - Vista principal con tarjetas y perfil
- **Card** - Componente de tarjeta individual con imagen, título y likes
- **ImagePopup** - Modal para visualizar imágenes en tamaño completo
- **PopupWithForm** - Componente reutilizable para formularios modales
- **EditProfilePopup** - Modal para editar información del perfil
- **EditAvatarPopup** - Modal para cambiar la foto de perfil
- **AddPlacePopup** - Modal para agregar nuevas tarjetas

### Rutas Principales

- `/` - Página principal con galería de tarjetas (protegida)
- `/signin` - Inicio de sesión
- `/signup` - Registro de nuevos usuarios

### Funcionalidades

- ✅ Registro e inicio de sesión con validación
- ✅ Persistencia de sesión con JWT en localStorage
- ✅ Protección de rutas (redirección si no autenticado)
- ✅ Galería de tarjetas con lazy loading
- ✅ Sistema de likes con actualización en tiempo real
- ✅ Modales para editar perfil y agregar tarjetas
- ✅ Validación de formularios en tiempo real
- ✅ Manejo de estados de carga
- ✅ Mensajes de error informativos
- ✅ Diseño responsive (mobile-first)

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

### Despliegue en Google Cloud

1. Realiza el build de producción
2. Sube los archivos de `dist/` al servidor
3. Configura un servidor web (Nginx o Apache) para servir los archivos estáticos
4. Asegúrate de configurar las variables de entorno de producción

**Ejemplo de configuración Nginx:**

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /path/to/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 Configuración de Vite

El proyecto usa Vite como herramienta de build. La configuración se encuentra en `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

## 🔗 Enlaces

- [README Principal](../README.md)
- [README del Backend](../backend/README.md)
