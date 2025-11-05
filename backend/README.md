# Around The U.S. - Backend API

API REST para la aplicación Around The U.S., proporcionando autenticación, gestión de usuarios y tarjetas de fotografías.

## 🛠 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express 5.1.0** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose 8.18.1** - ODM para MongoDB
- **JWT (jsonwebtoken 9.0.2)** - Autenticación basada en tokens
- **bcryptjs 3.0.2** - Encriptación de contraseñas
- **validator 13.15.15** - Validación de datos

### Herramientas de Desarrollo

- **Nodemon** - Auto-restart del servidor durante desarrollo
- **ESLint** - Linter con configuración Airbnb

## 📁 Estructura de Carpetas

```
backend/
├── controllers/      # Lógica de negocio
│   ├── users.js     # Controladores de usuarios
│   └── cards.js     # Controladores de tarjetas
├── models/          # Esquemas de Mongoose
│   ├── user.js      # Modelo de Usuario
│   └── card.js      # Modelo de Tarjeta
├── routes/          # Definición de rutas
│   ├── users.js     # Rutas de usuarios
│   ├── cards.js     # Rutas de tarjetas
│   └── index.js     # Router principal
├── middlewares/     # Middlewares personalizados
│   ├── auth.js      # Verificación de JWT
│   └── validation.js # Validaciones
├── errors/          # Clases de errores personalizadas
├── utils/           # Utilidades y helpers
├── app.js           # Configuración de Express
└── package.json     # Dependencias
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 14 o superior
- MongoDB 4.4 o superior instalado y ejecutándose
- npm o yarn

### Pasos

1. **Navegar a la carpeta del backend**

```bash
cd backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del backend:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aroundb
JWT_SECRET=tu-clave-secreta-super-segura
```

4. **Iniciar MongoDB**

Asegúrate de que MongoDB esté corriendo:

```bash
# En Linux/Mac
sudo systemctl start mongod

# O simplemente
mongod
```

## 💻 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor con Nodemon en modo desarrollo en `http://localhost:3000`. Se reinicia automáticamente al detectar cambios.

### Producción

```bash
npm start
```

Inicia el servidor en modo producción con Node.js.

### Linting

```bash
npm run lint
```

Ejecuta ESLint para detectar problemas en el código siguiendo la guía de estilo Airbnb.

## 🔐 Autenticación y Seguridad

### JWT (JSON Web Tokens)

El sistema de autenticación funciona mediante JWT:

1. Usuario se registra o inicia sesión
2. El servidor genera un token JWT
3. El cliente guarda el token
4. En cada petición, el cliente envía el token en el header `Authorization`
5. El middleware `auth.js` verifica la validez del token

### Encriptación de Contraseñas

Las contraseñas se encriptan usando `bcryptjs` antes de guardarse en la base de datos:

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

## 🐛 Manejo de Errores

El backend implementa clases de error personalizadas:

- **400 Bad Request** - Datos inválidos
- **401 Unauthorized** - Token inválido o ausente
- **403 Forbidden** - Sin permisos para la acción
- **404 Not Found** - Recurso no encontrado
- **409 Conflict** - Email ya registrado
- **500 Internal Server Error** - Error del servidor

## 🚀 Despliegue en Google Cloud

### Preparación del Servidor

1. **Conectar a la VM**

```bash
ssh usuario@IP-EXTERNA
```

2. **Instalar Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Instalar MongoDB**

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/web_project_api_full.git
cd web_project_api_full/backend
```

5. **Instalar dependencias y configurar**

```bash
npm install
# Crear y configurar .env con variables de producción
```

6. **Instalar PM2 para gestión de procesos**

```bash
sudo npm install -g pm2
pm2 start app.js --name around-api
pm2 startup
pm2 save
```

7. **Configurar firewall**

```bash
sudo ufw allow 3000/tcp
sudo ufw enable
```

### Variables de Entorno de Producción

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aroundb
JWT_SECRET=clave-super-segura-para-produccion-con-caracteres-aleatorios
```

## 🔧 CORS

El backend tiene CORS configurado para aceptar peticiones del frontend:

```javascript
app.use(
  cors({
    origin: "https://tu-frontend.com",
    credentials: true,
  })
);
```

**Importante:** Ajusta la URL del frontend en producción.

## 🔗 Enlaces

- [README Principal](../README.md)
- [README del Frontend](../frontend/README.md)
