# Turn it Up (Back)

Api para leer, crear, modificar y borrar proyectos de una base de datos de proyectos musicales. Todos los endpoints estan protegidos para usuarios no registrados.

## Endpoints de la API.

### Usuarios

- `Iniciar sesion`  
  (POST) /user/login
- `Registrar usuario`  
  (POST) /user/register

### Proyectos

- `Información de todos los proyectos`  
  (GET) /projects
- `Eliminar un proyecto`  
  (DELETE) /projects/project/:id
- `Informacion de un projecto`  
  (GET) /projects/project/:id
- `Proyectos relacionados a un usuario`  
  (GET) /projects/user/:id
- `Crear un projecto`  
  (POST) /projects
- `Modificar un proyecto`  
  (PUT) /projects/update/:id
