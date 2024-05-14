# Servidor con Typescript

En esta carpeta se encuentran todos los archivos para el funcionamiento del servidor de la aplicación.

## Tecnologías

- **Lenguajes**: Typescript, Javascript.
- **Librerias y frameworks**: Express, TypeOrm, @Hapi/boom, Joi, BCrypt, Jsonwebtoken.
- **Base de datos**: Postgresql
- **Entornos**: NodeJs

## Instalación

Clone o descarge todos los archivos y abra esta seccion en su consola. Para instalar las librerias ejecute el comando `npm install`.

Los scrips para ejecutar el modo desarrollador o generar los archivos javascript para pordución son los siguientes:

```JSON
"scripts": {
    "dev": "ts-node-dev --files src/index.ts",
    "build": "tsc",
    "start": "tsc && node dist/index.js",
    "typeorm": "typeorm-ts-node-commonjs"
  }
```

### Migraciones

Tiene generada una migración para generar los roles, ya que sin estos no se podran registrar usuarios e interaccionar con el servidor.

Para ejecutar la migracion primero asegurese que las tablas hayan sido creada en la base de datos y ejecute el siguiente comando:

`npm run typeorm migration:run -- -d src/db/migrationconfig.ts`

