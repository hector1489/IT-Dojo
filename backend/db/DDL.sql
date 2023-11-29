CREATE DATABASE electrobase;
\c electrobase;

CREATE TABLE users (
    id       UUID DEFAULT uuid_generate_v4() NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    pass          VARCHAR(255) NOT NULL,
    is_admin      BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
);

/* Table for orders */
CREATE TABLE orders (
    id               SERIAL,
    user_id          UUID REFERENCES users(id),
    date             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status           VARCHAR(50),
    shipping_address VARCHAR(255),
    PRIMARY KEY(id)
);

/* Inventory table */
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

/* Table for favorites */
CREATE TABLE favorites (
    id              SERIAL,
    user_id    UUID REFERENCES users(id),
    inventory_id    SERIAL REFERENCES inventory(id),
    added_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

/* Table for storing image URLs */
CREATE TABLE image_product (
    id            SERIAL,
    inventory_id SERIAL REFERENCES inventory(id),
    url           VARCHAR(255),
    PRIMARY KEY(id)
);
