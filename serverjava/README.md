# Servidor con Java

En esta carpeta se encuentran todos los archivos para el funcionamiento del servidor de la aplicación pero la version Java.

## Tecnologías

- **Lenguajes**: Java
- **Librerías y frameworks**: Spring, Spring security, Lombock, io.jsonwebtoken / jjwt-root, JPA.
- **JDK**: OpenJDK21
- **Base de dats**: Postgresql

## Instalacion

Clone o descarge todos los archivos.

Antes de ejecutar el código, asegurese que existan las tablas y en la tabla `roles` contenga las filas con nombre `ROLE_USER` y `ROLE_ADMIN` para que se puedan generar los usuarios.