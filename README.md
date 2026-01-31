# 📝 To-Do App – Gestor de Tareas

**To-Do App** es una aplicación fullstack de gestión de tareas que permite crear, actualizar, eliminar, buscar y organizar tareas, con persistencia en base de datos y una interfaz visual amigable y responsive.

---

## Funcionalidades

### Gestión de tareas
- Crear tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas
- Buscar tareas en tiempo real (no sensible a mayúsculas)
- Limpiar tareas completadas

### Visualización y UX
- Listado automático al iniciar la aplicación
- Tarjetas organizadas en formato **grid horizontal** (responsive)
- Colores según el estado de la tarea:
  - 🟢 Completada
  - 🔴 Vencida
  - 🔵 Activa
- Contador de tareas (totales y pendientes)
- Ordenar tareas por:
  - Fecha de creación
  - Fecha límite

---

## ✅ Validaciones y Reglas
- El título es obligatorio
- El título debe tener **más de 3 caracteres**
- No se permite actualizar o eliminar tareas inexistentes
- Manejo correcto de códigos HTTP en la API

---

## 🛠 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- SQLite
- Arquitectura por capas (routes, controllers)

### Frontend
- HTML5
- CSS3 (Grid, diseño responsive)
- JavaScript Vanilla
- Fetch API

---
## Instrucciones para ejecutar el proyecto

### Backend 
- Ejecutamos estos comandos en la terminal dentro de la carpeta del proyecto en orden:
- cd Backend
- npm install
- node app.js
  
### Frontend
- Iniciamos el index.html, dentro de la carpeta de Frontend, en el navegador o con Open With Live Server.

---
## 🗂 Modelo de Datos

```json
{
  "id": number,
  "title": string,
  "description": string,
  "isCompleted": boolean,
  "createdAt": datetime,
  "dueDate": datetime,
  "completedAt": datetime | null
} 
