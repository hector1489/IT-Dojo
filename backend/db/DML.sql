-- Para la tabla usuarios
INSERT INTO users (email, pass, is_admin)
VALUES
    ('usuario1@example.com', '$2b$10$k/YpDNzbPQwVUZNqxxiAKOL77RiMInjB3Zrp566g7nfdFT1zk537e ', true),
    ('usuario4@example.com', '$2b$10$DRfE5eCbQuJ2ETlXizkIquk.ANtJbgNh0iKy4kPF08/S2lqq5htvG', false);

-- Insertar algunos datos en la tabla pedidos
INSERT INTO orders (user_id, status, shipping_address)
VALUES
    ('46b7b5cb-4213-4f0f-bc41-ee4e3c284ddc', 'Pendiente', '123 Calle Principal'),
    ('46b7b5cb-4213-4f0f-bc41-ee4e3c284ddc', 'Pendiente', '789 Calle 13'),
    ('f7aee082-0e46-4a3a-b629-6fa763b57759', 'Pendiente', '456 Calle 15');

-- Para la tabla inventario

INSERT INTO inventory (name, category, shipping, price, stock, url)
VALUES
    ('silla', 'silla', 'Express', 50000, 10, '/src/assets/img/Silla.jpg'),
    ('Escritotio', 'Escritotio', 'Express', 6000, 5, '/src/assets/img/mesa1.png'),
    ('Lampara', 'Lampara', 'Express', 10000, 12, '/src/assets/img/lampara.jpg');

INSERT INTO inventory (name, category, shipping, price, stock, url)
VALUES
    ('silla-2', 'silla', 'Express', 4000, 5, '/src/assets/img/silla2.jpg'),
    ('Escritotio-2', 'Escritotio', 'Express', 70000, 10, '/src/assets/img/mesa2.png'),
    ('Lampara-2', 'Lampara', 'Express', 12000, 15, '/src/assets/img/lampara2.jpg');

-- Insertar registros en la tabla de favorites

INSERT INTO favorites (user_id, inventory_id)
VALUES
    ('46b7b5cb-4213-4f0f-bc41-ee4e3c284ddc', 8),
    ('46b7b5cb-4213-4f0f-bc41-ee4e3c284ddc', 7);



