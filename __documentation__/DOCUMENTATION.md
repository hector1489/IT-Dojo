# Proyecto Final - IT DOJO

## DOCUMENTACIÓN

Proyecto Final para Desafíos Latam. Página web de e-commerce para la venta de productos de oficina.
Diseño y prototipo.

## Autor

Hector Gonzalez P.

## License

MIT.

# Stack Tecnológico y Setup

## Stack Tecnológico

### Frontend (Proyecto Final)

#### Tecnologías Principales:

- React v18.2.0
- TypeScript v4.9.5
- Vite v5.0.3

#### Dependencias Principales:

- `@types/react` v18.2.15
- `@types/react-dom` v18.2.7
- `@vitejs/plugin-react` v4.2.0
- eslint v8.54.0
- eslint-plugin-react v7.33.2
- eslint-plugin-react-hooks v4.6.0
- eslint-plugin-react-refresh v0.4.3

### Backend

#### Tecnologías Principales:

- Node.js v18.16.1
- TypeScript v5.2.2
- Express v4.18.2

#### Dependencias Principales:

- bcrypt v5.1.1
- cors v2.8.5
- dotenv v16.3.1
- jsonwebtoken v9.0.2
- pg v8.11.3

## Setup de la Aplicación

### Frontend (Proyecto Final)

1. **Instalación de Dependencias:**

    ```bash
    npm install
    ```

2. **Desarrollo:**

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo de Vite para el frontend.

3. **Producción:**

    ```bash
    npm run build
    ```

    Esto construirá la aplicación para producción.

### Backend

1. **Instalación de Dependencias:**

    ```bash
    npm install
    ```

2. **Desarrollo con Nodemon:**

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor backend con Nodemon para desarrollo.

3. **Iniciar en Producción:**

    ```bash
    npm start
    ```

    Esto iniciará el servidor en un entorno de producción.

4. **Linter:**

    ```bash
    npm run lint
    ```

    Esto ejecutará el linter para el backend.

> **Nota:** Asegúrate de tener Node.js y npm instalados en tu sistema antes de ejecutar estos comandos.

Con estos pasos, deberías poder configurar y ejecutar tanto el frontend como el backend de tu aplicación de e-commerce.


# REQUERIMIENTOS LATAM :

1. Diseñar un boceto de las vistas del proyecto.

VISITAR :

/__documentation__

    └──  diagrams/
         ├── diagrama_routes1.1.png
         ├── diagramaDB1.png
         ├── flujo_1.png
         ├── flujo_2.png
         ├── flujo_3.png
         └── flujo_login1.png

    └── screenshots/
         ├── pantalla_principal.png
         ├── pantalla_principal2.png
         ├── pantalla_principal3.png
         ├── pantalla_principal4.png
         ├── productos.png
         ├── contacto.png
         ├── Detalle.png
         ├── acceder_registrarse.png
         ├── acceder_user1.png
         ├── acceder_admin1.png
         └── pedidos_admin1.png

2. Definir la navegación entre vistas marcando las públicas y las privadas.

VISITAR :

__documentation__/diagrams/diagrama_routes1.png

diagrama:

/__publicas__

    └──  home/
         ├── products─products
         ├── contact─contact
         ├── cart─cart
         └── login─sugnup.

/__privadas__

    └──  user/
         ├── favorites
         └── orders



    └──  admin/
         ├── users.
         ├── orders.
         └── inventory.

3. Enlistar las dependencias a utilizar en el proyecto.

## Dependencias Front end

Description :

    name : proyecto-final,
    private : true,
    version : 1.0.0,
    type : module.


Dependencies :

    axios                       : 1.6.2,
    bootstrap                   : 5.3.2,
    react                       : 18.2.0,
    react-bootstrap             : 2.9.1,
    react-dom                   : 18.2.0,
    react-responsive-carousel   : 3.2.23,
    react-router-dom            : 6.20.1.

Dev-Dependencies :

    @testing-library/jest-dom           : 6.1.4,
    @testing-library/react              : 14.1.2,
    @types/react                        : 18.2.39,
    @types/react-dom                    : 18.2.17,
    @typescript-eslint/eslint-plugin    : 6.13.1,
    @typescript-eslint/parser           : 6.13.1,
    @vitejs/plugin-react                : 4.2.0,
    @vitejs/plugin-react-swc            : 3.5.0",
    eslint                              : 8.54.0,
    eslint-config-airbnb                : 19.0.4,
    eslint-config-airbnb-typescript     : 17.1.0,
    eslint-config-prettier              : 9.0.0,
    eslint-plugin-import                : 2.29.0,
    eslint-plugin-jsx-a11y              : 6.8.0,
    eslint-plugin-prettier              : 5.0.1,
    eslint-plugin-react                 : 7.33.2,
    eslint-plugin-react-hooks           : 4.6.0,
    jsdom                               : 23.0.0,
    msw                                 : 2.0.9,
    prettier                            : 3.1.0,
    typescript                          : 4.9.5,
    vite                                : 5.0.3,
    vitest                              : 0.34.6.




## Dependencias Backend

Description :

    name : backend,
    version : 1.0.0,
    description : backend,
    main : index.ts.

Dev-Dependencies :

    @types/bcrypt: 5.0.2,
    @types/express: 4.17.17,
    @types/jest: 29.5.11,
    @types/jsonwebtoken: 9.0.5,
    @types/supertest: 2.0.16,
    jest: 29.7.0,
    ts-jest: 29.1.1,
    ts-node-dev: 2.0.0,
    ts-standard: 12.0.2,
    typescript: 5.2.2.

Dependencies :

    @types/pg    : 8.10.9,
    bcrypt       : 5.1.1,
    body-parser  : 1.20.2,
    dotenv       : 16.3.1,
    express      : 4.18.2,
    jsonwebtoken : 9.0.2,
    pg           : 8.11.3.



4. Diseñar las tablas de la base de datos y sus relaciones.

##  Base de Datos :

CREATE DATABASE itDojo;

## Tablas :

VISITAR:

/__documentation__

    └──  diagrams/
         └── diagramaDB1.png


# Ejecutable :

CREATE DATABASE electrobase;
\c electrobase;

## tabla para los usuarios

CREATE TABLE users (
    id       UUID DEFAULT uuid_generate_v4() NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    pass          VARCHAR(255) NOT NULL,
    is_admin      BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
);

## Tabla para las pedidos

CREATE TABLE orders (
    id               SERIAL,
    user_id          UUID REFERENCES users(id),
    date             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status           VARCHAR(50),
    shipping_address VARCHAR(255),
    PRIMARY KEY(id)
);

## Tabla de inventario

CREATE TABLE inventory (
    id        SERIAL,
    name      VARCHAR(100),
    category  VARCHAR(100),
    shipping  VARCHAR(150),
    price     INT,
    stock     INT,
    user_id   UUID REFERENCES users(id),
    order_id  SERIAL REFERENCES orders(id),
    PRIMARY KEY(id)
);

## Tabla para los favoritos

CREATE TABLE favorites (
    id              SERIAL,
    user_id    UUID REFERENCES users(id),
    inventory_id    SERIAL REFERENCES inventory(id),
    added_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

## Tabla para guardar la url de las imagenes

CREATE TABLE image_product (
    id            SERIAL,
    inventory_id SERIAL REFERENCES inventory(id),
    url           VARCHAR(255),
    PRIMARY KEY(id)
);


5. Diseñar el contrato de datos de la API REST.

URL postman :

https://documenter.getpostman.com/view/30714067/2s9Ye8fuRx

