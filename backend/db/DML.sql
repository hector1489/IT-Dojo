-- Para la tabla usuarios
INSERT INTO users (email, pass, is_admin)
VALUES
    ('usuario1@example.com', '$2b$10$k/YpDNzbPQwVUZNqxxiAKOL77RiMInjB3Zrp566g7nfdFT1zk537e ', true)
    ('usuario4@example.com', '$2b$10$DRfE5eCbQuJ2ETlXizkIquk.ANtJbgNh0iKy4kPF08/S2lqq5htvG', false);

-- Insertar algunos datos en la tabla pedidos
INSERT INTO orders (user_id, status, shipping_address)
VALUES
    ('7e4bfb11-9a62-4404-aef5-dc9a007f0497', 'Pendiente', '123 Calle Principal'),
    ('c66a87c1-942c-42c8-bbf6-1d0624284b47', 'Pendiente', '789 Calle 13'),
    ('7e4bfb11-9a62-4404-aef5-dc9a007f0497', 'Pendiente', '456 Calle 15');

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
    ('7e4bfb11-9a62-4404-aef5-dc9a007f0497', 23),
    ('7e4bfb11-9a62-4404-aef5-dc9a007f0497', 24);



