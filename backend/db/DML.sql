-- Para la tabla usuarios
INSERT INTO users (email, pass, is_admin)
VALUES
    ('usuario2@example.com', 'contraseña123', false);

-- Insertar algunos datos en la tabla pedidos
INSERT INTO orders (user_id, status, shipping_address)
VALUES
    ('fa65c69d-f5b7-4f03-b188-a12b006c0bf7', 'Pendiente', '123 Calle Principal');

-- Para la tabla inventario

INSERT INTO inventory (name, category, shipping, price, stock, user_id, order_id)
VALUES
    ('Producto 1', 'Electrónico', 'Express', 500, 10, 'fa65c69d-f5b7-4f03-b188-a12b006c0bf7', 2);

-- Insertar registros en la tabla de favorites

INSERT INTO favorites (user_id, inventory_id)
VALUES
    ('fa65c69d-f5b7-4f03-b188-a12b006c0bf7', 4);

--Insertar url de imagenes

INSERT INTO image_product (inventory_id, url)
VALUES
    (4, '/src/assets/img');

