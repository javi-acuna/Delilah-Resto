CREATE DATABASE delilah_resto;

CREATE TABLE pedidos(
id_pedido INT PRIMARY KEY AUTO_INCREMENT,
estado VARCHAR(20) NOT NULL,
hora DATETIME NOT NULL,
descripcion VARCHAR(150) NOT NULL,
metodo_pago VARCHAR(20) NOT NULL,
id_usuario INT NOT NULL,
total FLOAT NOT NULL);

CREATE TABLE usuarios (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nombre_usuario VARCHAR(50) NOT NULL,
nombre_apellido VARCHAR(60) NOT NULL,
email VARCHAR(60) NOT NULL,
telefono INT NOT NULL,
direccion VARCHAR(60) NOT NULL,
password VARCHAR(20) NOT NULL,
es_admin BOOLEAN DEFAULT FALSE);

CREATE TABLE productos (
id_producto INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(20) NOT NULL,
precio_unitario FLOAT NOT NULL,
url_imagen VARCHAR(60) NOT NULL,
descripcion VARCHAR(150) NOT NULL);

CREATE TABLE detalle_pedido(
id_producto INT,
id_pedido INT,
CANTIDAD_PRODUCTO INT NOT NULL DEFAULT 1,
PRIMARY KEY(id_producto, id_pedido));

ALTER TABLE pedidos ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);
ALTER TABLE detalle_pedido ADD FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
ALTER TABLE detalle_pedido ADD FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido); 

INSERT INTO usuarios VALUES (NULL, 'javi', 'javier acuna', 'javi@gmail.com', 4533291, 'celestino 23', 'javi123', true);
INSERT INTO usuarios VALUES (NULL, 'eze', 'ezequiel dominguez', 'eze.domi@gmail.com', 4523231, 'av. colon 2', 'ezequ1el', false);
INSERT INTO usuarios VALUES (NULL, 'pablo', 'pablo lopez', 'lopezpablo@gmail.com', 4522134, 'felix frias 89', 'L0p3z', false);

INSERT INTO productos VALUES(NULL,'HAMBURGUESA', 200,'https://via.placeholder.com/200','HAMBURGUESA CON PAPAS FRITAS');
INSERT INTO productos VALUES(NULL,'PIZZA', 280,'https://via.placeholder.com/250','PIZZA NAPOLITANA');
INSERT INTO productos VALUES(NULL,'LOMO', 350,'https://via.placeholder.com/300','LOMO COMPLETO');

INSERT INTO pedidos VALUES (NULL, 'ENVIADO', NOW(), 'PIZZA','EFECTIVO', 1, 300);
INSERT INTO pedidos VALUES (NULL, 'NUEVO', NOW(), 'HAMBURGUESA x2', 'PAGO ONLINE', 2, 300);
INSERT INTO pedidos VALUES (NULL, 'NUEVO', NOW(), 'LOMO x4', 'EFECTIVO', 2, 800);

INSERT INTO detalle_pedido VALUES(1, 1, 1);
INSERT INTO detalle_pedido VALUES(2, 2, 2);
INSERT INTO detalle_pedido VALUES(3, 3, 4);