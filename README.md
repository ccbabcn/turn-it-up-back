# Turn it Up (Back)

Api MERN con CRUD para leer, crear, modificar y borrar proyectos de una base de datos de proyectos musicales. Todos los endpoints estan protegidos para usuarios no registrados.

## Endpoints de la API.

### Usuarios

- `Iniciar sesion`  
  (POST) /user/login

- `Registrar usuario`  
  (POST) /user/register

### Proyectos

- `Información de todos los proyectos paginados`  
  (GET) /projects, acepta querys genre= / role= / user=userID

- `Informacion de un projecto`  
  (GET) /projects/:id

- `Proyectos relacionados a un usuario`  
  (GET) /projects/user

- `Crear un projecto`  
  (POST) /projects/create

- `Modificar un proyecto`  
  (PUT) /projects/:id

- `Eliminar un proyecto`  
  (DELETE) /projects/project/:id
