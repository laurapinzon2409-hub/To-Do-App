To-Do App – Gestor de Tareas
To-Do App es una aplicación de gestión de tareas que permite crear, actualizar, eliminar, buscar y organizar tareas, con persistencia en base de datos y una interfaz visual amigable y responsive. 
  1.	Funcionalidades:
    a.	Crear tareas.
    b.	Editar tareas existentes.
    c.	Eliminar tareas.
    d.	Marcar tareas como completadas.
    e.	Buscar tareas en tiempo real (no sensible a mayúsculas).
    f.	Limpiar tareas completadas.
  2.	Visualización y UX
    a.	Listado automático al iniciar la aplicación.
    b.	Tarjetas organizadas en formato grid (responsive).
    c.	Colores según el estado de la tarea:
      i.	Completada 
      ii.	Vencida
      iii.	Activa
    d.	Contador de tareas (totales y pendientes).
    e.	Ordenar tareas por:
      i.	Fecha de creación.
      ii.	Fecha límite.
  3.	Validaciones:
    a.	El título es obligatorio.
    b.	El titulo debe de tener más de 3 caracteres.
  4. Tecnologías Utilizadas:
    •	Backend:
      o	Node.js
      o	Express.js
      o	SQLite
      o	Arquitectura por capas (routes, controllers)
    •	Frontend
      o	HTML5
      o	CSS
      o	JavaScript Vanilla
      o	Fetch API
    •	Modelo de Datos:
    json
    {
    "id": number,
    "title": string,
    "description": string,
    "isCompleted": boolean,
    "createdAt": datetime,
    "dueDate": datetime,
    "completedAt": datetime | null
    } 
  5. Instrucciones para ejecutar el proyecto:
    •	Backend:
      o	Ejecutamos estos comandos en la terminal dentro de la carpeta del proyecto en orden:
        	1.cd Backend
        	2.npm install
        	3.node app.js
      o	El servidor se ejecutará en:
        	http://localhost:3000
    •	Frontend:
      o	Iniciamos el index.html, dentro de la carpeta de Frontend, en el navegador o con Open With Live Server.
