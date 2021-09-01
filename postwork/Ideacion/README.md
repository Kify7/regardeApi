# 💡 Ideación
### Equipo 13

***

### 🎯  ¿Qué esperamos que haga el proyecto?

Compartir información sobre las películas existentes en el mercado y las de nuevo estreno para que los usuarios puedan encontrar nuevas películas y comentar las ya vistas.

### 👨‍👩‍👦  ¿Qué tipos de usuario tendrá nuestro sistema?

* Cliente/usuario
* Administradores

### ¿Qué acciones puede realizar cada usuario?

* Usuario:
    * Buscar películas por nombre, categoría, más populares y más recientes.
    * Consultar comentarios de películas.
    * Escribir comentarios en las películas que ya vió.
    * Editar su comentario.
    * Eliminar sus comentarios.
    * Agregar películas a su lista de favoritos.
    * Eliminar películas de su lista.

* Administrador:
    * Agregar películas a la base de datos.
    * Eliminar películas de la base de datos.
    * Buscar películas por nombre, categoría, más populares y más recientes.
    * Ver los comentarios de las películas.
    * Encontrar usuarios.
    * Eliminar comentarios.
    * Eliminar usuarios.

### ¿Qué información se necesita?

Películas ( título, año, director, reparto, trailer, categoría)

### ¿Cuáles son las principales entidades?

* Usuario
* Administrador
* Película
* Comentario

### ¿Qué características tiene cada entidad?

* Usuario(Cliente):  
    * ID
    * Perfil:
        * Nombre
        * Apellido
        * Imagen o Foto
    * Nombre de usuario 
    * Contraseña
    * Lista de favoritos:
    * Colección de películas elegidas
    * Comentarios

* Administrador:
    * ID
    * Nombre de usuario base de datos
    * Contraseña de base de datos

* Película:
    * ID
    * Título 
    * Año
    * Director
    * Reparto
    * Imagen 
    * Descripción 
    * Puntaje
    * Comentarios

* Comentario:
    * ID
    * Formulario

### ¿Qué funcionalidades tiene cada entidad?

