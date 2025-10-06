# API Backend Panel de Medicamentos

## Instalación y configuración

1. **Instala Node.js** (si no lo tienes): https://nodejs.org/
2. Abre una terminal en la carpeta `backend`.
3. Ejecuta:
   ```
npm install
   ```
4. Copia el archivo `.env.example` a `.env` y ajusta los valores si es necesario (puerto, URI de MongoDB, JWT_SECRET).
5. Inicia MongoDB localmente o usa un servicio en la nube (por ejemplo, MongoDB Atlas).
6. Inicia el servidor:
   ```
npm run dev
   ```
   o
   ```
npm start
   ```

## Endpoints principales

- **Usuarios**
  - `POST /api/usuarios/registrar` (solo admin)
  - `POST /api/usuarios/login`
  - `GET /api/usuarios` (protegido)
  - `POST /api/usuarios/asignar-paciente` (solo admin)
- **Pacientes**
  - `POST /api/pacientes` (solo admin)
  - `GET /api/pacientes` (protegido)
  - `GET /api/pacientes/:id` (protegido)
  - `PUT /api/pacientes/:id` (solo admin)
  - `DELETE /api/pacientes/:id` (solo admin)
- **Medicamentos**
  - `POST /api/medicamentos` (solo admin)
  - `GET /api/medicamentos` (protegido)
  - `GET /api/medicamentos/:id` (protegido)
  - `PUT /api/medicamentos/:id` (solo admin)
  - `DELETE /api/medicamentos/:id` (solo admin)
- **Administraciones**
  - `POST /api/administraciones` (admin y auxiliar)
  - `GET /api/administraciones` (protegido)
- **Signos vitales**
  - `POST /api/signos-vitales` (admin y auxiliar)
  - `GET /api/signos-vitales` (protegido)
- **Histórico**
  - `POST /api/historico` (admin y auxiliar)
  - `GET /api/historico` (protegido)

## Roles y permisos
- **Administrador:** puede hacer todo
- **Auxiliar:** puede registrar signos y administrar medicamentos
- **Cuidador:** solo puede ver el histórico

## Unir con el frontend
1. Asegúrate de que el backend esté corriendo (por defecto en `http://localhost:4000`).
2. En el frontend (React), usa `axios` o `fetch` para consumir los endpoints del backend.
3. Configura las URLs de las peticiones en el frontend para que apunten al backend (`http://localhost:4000/api/...`).
4. Implementa el login en el frontend y guarda el token JWT en localStorage o context.
5. Envía el token en el header `Authorization: Bearer <token>` en cada petición protegida.

## Ejemplo de login con axios en React
```js
axios.post('http://localhost:4000/api/usuarios/login', { email, password })
  .then(res => {
    localStorage.setItem('token', res.data.token);
  });
```

## Ejemplo de petición protegida
```js
axios.get('http://localhost:4000/api/pacientes', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
```

---

¿Listo para instalar y conectar? Sigue los pasos de arriba y dime si necesitas ayuda con la integración React.