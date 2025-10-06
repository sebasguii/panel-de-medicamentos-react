# Backend Panel de Medicamentos

Backend Node.js + Express + MongoDB para gestión de pacientes, medicamentos, administración, signos vitales e histórico, con autenticación JWT y roles (administrador, auxiliar, cuidador).

## Estructura
- `/src/models`: Modelos de Mongoose
- `/src/controllers`: Lógica de negocio
- `/src/routes`: Endpoints REST
- `/src/middleware`: Autenticación y autorización
- `/src/config`: Configuración y conexión MongoDB

## Scripts
- `npm start`: Inicia el servidor
- `npm run dev`: Inicia el servidor con nodemon

## Variables de entorno
Ver `.env.example`
