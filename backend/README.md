# API ITDojo

# Author

    HECTOR GONZALEZ.

## Descripción

Este es el repositorio de la API para el proyecto ITDojo para Desafios Latam, G-32 (2023). La API está construida con Node.js, Express y TypeScript. Ademas de realizar pruebas con Jest.

## Instalación

1. Clona este repositorio: `git clone https://github.com/tu-usuario/api_itdojo.git`
2. Instala las dependencias: `npm install`

## Configuración

Crea un archivo `.env` en el directorio raíz del proyecto y configura las variables de entorno necesarias. Puedes encontrar un ejemplo en el archivo `.env.example`.

## Uso

### Desarrollo

Para ejecutar la aplicación en modo de desarrollo con reinicio automático, utiliza el siguiente comando:

```bash
npm run dev

```

### Producción

Para ejecutar la aplicación en modo de producción, primero compila TypeScript y luego inicia el servidor:

```bash
npm run tsc
npm start

```

### Test

Para ejecutar la aplicación en modo de test utiliza el siguiente comando:

```bash
npm test

```

Scripts:

-npm run dev : Inicia el servidor en modo de desarrollo con reinicio automático.
-npm run lint : Ejecuta el linter para mantener un código consistente.
-npm start : Inicia el servidor en modo de producción.
-npm run tsc : Compila el código TypeScript a JavaScript.
-npm test : Ejecuta las pruebas.
-npm run test : watch: Ejecuta las pruebas en modo de observación.


Tecnologías Principales:

-Node.js.
-Express.
-TypeScript.
-PostgreSQL (pg).
-JSON Web Token (jsonwebtoken).
-Bcrypt.

Contribuir:

-¡Contribuciones son bienvenidas! Por favor, sigue las mejores prácticas de desarrollo y crea un Pull Request.

Licencia:

-Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.