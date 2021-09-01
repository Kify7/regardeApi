# 💡 Ideación
### Equipo 13


#### ¿Qué esperamos que haga el proyecto?

Compartir información sobre las películas existentes en el mercado y las de nuevo estreno para que los usuarios puedan encontrar nuevas películas y comentar las ya vistas.

#### ¿Qué tipos de usuario tendrá nuestro sistema?

-Cliente/usuario
-Administradores

#### ¿Qué acciones puede realizar cada usuario?

-Usuario:
    1.Buscar películas por nombre, categoría, más populares y más recientes.
    2.Consultar comentarios de películas.
    3.Escribir comentarios en las películas que ya vió.
    4.Editar su comentario.
    5.Eliminar sus comentarios.
    6.Agregar películas a su lista de favoritos.
    7.Eliminar películas de su lista.

-Administrador:
    1.Agregar películas a la base de datos.
    2.Eliminar películas de la base de datos.
    3.Buscar películas por nombre, categoría, más populares y más recientes.
    4.Ver los comentarios de las películas.
    5.Encontrar usuarios.
    6.Eliminar comentarios.
    7.Eliminar usuarios.

#### ¿Qué información se necesita?

Películas ( título, año, director, reparto, trailer, categoría)

#### ¿Cuáles son las principales entidades?

1.Usuario
2.Administrador
3.Película
4.Comentario

#### ¿Qué características tiene cada entidad?
1.Usuario(Cliente):  
    -ID
    -Perfil:
        *Nombre
        *Apellido
        *Imagen o Foto
    -Nombre de usuario 
    -Contraseña
    -Lista de favoritos:
    -Colección de películas elegidas
    -Comentarios

2.Administrador:
    -ID
    -Nombre de usuario base de datos
    -Contraseña de base de datos
3.Película:
    -ID
    -Título 
    -Año
    -Director
    -Reparto
    -Imagen 
    -Descripción 
    -Puntaje
    -Comentarios
4.Comentario:
    -ID
    -Formulario

#### ¿Qué funcionalidades tiene cada entidad?

