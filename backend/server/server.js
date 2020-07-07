const express = require('express');
const server = express();

const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');
const { Console } = require('console');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilah_resto')

const bodyparser = require('body-parser');
server.use(bodyparser.json());

//USUARIOS
server.get('/api/usuarios', (req, res) => {
    const query = 'SELECT * FROM USUARIOS';
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT} )
        .then((response) => {
            res.json(response);
            console.log(response);
        }).catch((e) => console.log(e));
});

server.post('/api/usuarios', (req, res) => {
    const query = 'INSERT INTO USUARIOS VALUES (NULL,?, ?, ?, ?,?,?,?)';
    const { nombre_usuario, nombre_apellido, email, telefono, direccion, password, es_admin } = req.body;

    sequelize.query(query, { replacements: [nombre_usuario, nombre_apellido, email, telefono, direccion, password, es_admin] })
        .then((response) => {
            res.json({ status: 'Usuario insertado', usuarios: req.body });
        }).catch((e) => console.log(e));
});

server.get('/api/usuarios/:id_usuario', (req, res) => {
    const id = req.params.id_usuario;
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';

    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.json(data);
        }).catch(e => {
            return res.status(404).json({ error: 'Algo salió mal..' })
        })
});

server.delete('/api/usuarios/:id_usuario',(req, res) =>{
    const id = req.params.id_usuario;
    const query='DELETE FROM usuarios WHERE ID_usuario = ?';

    sequelize.query(query, {replacements: [id]})
        .then((data)=> {
            res.json({status:'Usuario borrado'});
        }).catch(e=> console.error('Algo salio mal',e));
});

server.put('/api/usuarios/:id_usuario', (req, res) => {

    const id = req.params.id_usuario;
    const nombre_usuario = req.body.nombre_usuario;
    const nombre_apellido = req.body.nombre_apellido;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const password = req.body.password;
    const es_admin = req.body.es_admin;
    const query = 'UPDATE usuarios SET nombre_usuario = ?, nombre_apellido = ?, email = ?, telefono = ?, direccion = ?, password=?, es_admin=? WHERE id_usuario = ?';

    sequelize.query(query, { replacements: [nombre_usuario, nombre_apellido, email, telefono,direccion,password,es_admin, id] })
        .then((data) => {
            res.json({ status: 'Usuario modificado' });
        }).catch(e => console.error('No se modifico el producto', e));
});

//PRODUCTOS
server.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM PRODUCTOS';
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT} )
        .then((response) => {
            res.json(response);
            console.log(response);
        }).catch((e) => console.log(e));
});

server.post('/api/productos', (req, res) => {
    const query = 'INSERT INTO PRODUCTOS VALUES (NULL,?, ?, ?, ?)';
    const { nombre, precio_unitario, url_imagen, descripcion } = req.body;

    sequelize.query(query, { replacements: [nombre, precio_unitario, url_imagen, descripcion] })
        .then((response) => {
            res.json({ status: 'Producto insertado', productos: req.body });
        }).catch((e) => console.log(e));
});

server.get('/api/productos/:id_producto', (req, res) => {
    const id = req.params.id_producto;
    const query = 'SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = ?';

    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.json(data);
        }).catch(e => {
            return res.status(404).json({ error: 'Algo salió mal..' })
        })
});

server.delete('/api/productos/:id_producto',(req, res) =>{
    const id = req.params.id_producto;
    const query='DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = ?';

    sequelize.query(query, {replacements: [id]})
        .then((data)=> {
            res.json({status:'Producto borrado'});
        }).catch(e=> console.error('Algo salio mal',e));
});

server.put('/api/productos/:id_producto', (req, res) => {

    const id = req.params.id_producto;
    const descripcion = req.body.descripcion;
    const precio_unitario = req.body.precio_unitario;
    const url_imagen = req.body.url_imagen;
    const nombre = req.body.nombre;
    const query = 'UPDATE productos SET descripcion = ?, precio_unitario = ?, url_imagen = ?, nombre = ? WHERE id_producto = ?';

    sequelize.query(query, { replacements: [descripcion, precio_unitario, url_imagen, nombre, id] })
        .then((data) => {
            res.json({ status: 'producto modificado' });
        }).catch(e => console.error('No se modifico el producto', e));
});

//PEDIDOS
server.get('/api/pedidos', (req, res) => {
    const query = 'SELECT * FROM PEDIDOS';
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT} )
        .then((response) => {
            res.json(response);
            console.log(response);
        }).catch((e) => console.log(e));
});

server.post('/api/pedidos', (req, res) => {
    const query = 'INSERT INTO pedidos VALUES (NULL,?, ?, ?, ?,?, ?)';
    const { estado, hora, descripcion, metodo_pago, id_usuario, total } = req.body;

    sequelize.query(query, { replacements: [estado, hora, descripcion, metodo_pago, id_usuario, total] })
        .then((response) => {
            res.json({ status: 'Pedido insertado', productos: req.body });
        }).catch((e) => console.log(e));
});

server.get('/api/pedidos/:id_pedido', (req, res) => {
    const id = req.params.id_pedido;
    const query = 'SELECT * FROM pedidos WHERE id_pedido = ?';

    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.json(data);
        }).catch(e => {
            return res.status(404).json({ error: 'Algo salió mal..' })
        })
});

server.delete('/api/pedidos/:id_pedido',(req, res) =>{
    const id = req.params.id_pedido;
    const query='DELETE FROM pedidos WHERE id_pedido = ?';

    sequelize.query(query, {replacements: [id]})
        .then((data)=> {
            res.json({status:'Pedido borrado'});
        }).catch(e=> console.error('Algo salio mal',e));
});

server.put('/api/pedidos/:id_pedido', (req, res) => {

    const id = req.params.id_pedido;
    const estado = req.body.estado;
    const hora = req.body.hora;
    const descripcion = req.body.descripcion;
    const metodo_pago = req.body.metodo_pago;
    const id_usuario = req.body.id_usuario;
    const total = req.body.total;
    const query = 'UPDATE pedidos SET estado = ?, hora = ?, descripcion = ?, metodo_pago = ?, id_usuario = ?, total = ? WHERE id_pedido = ?';

    sequelize.query(query, { replacements: [estado, hora, descripcion, metodo_pago, id_usuario, total, id] })
        .then((data) => {
            res.json({ status: 'Pedido modificado' });
        }).catch(e => console.error('No se modifico el pedido', e));
});

server.post('/api/usuarios/login', (req, res) => {
    const { usuario, password } = req.body;

    if (usuario != undefined && password != undefined) {

        sequelize.query('SELECT * FROM usuarios WHERE (nombre_usuario = "' + usuario + '" AND password = "' + password + '") OR (email = "' + usuario + '" AND password = "' + password + '")', { type: sequelize.QueryTypes.SELECT })
            .then((user) => {
            if (user.length == 0) {
                res.status(404).json({ error: 'El usuario o la contraseña son incorrectas' })
            } else {
                let token = jwt.sign({ nombre_usuario: user.nombre_usuario, fecha: +new Date() }, 'secret_key');
                 res.status(200).json({ msg: 'Bienvenido a Delilah Resto', token: token })
            }
        })
    } else(
        res.status(404).json({
            error: 'Los datos del usuario son incorrectos'
        })
    )
});

server.listen(4005, () => console.log("server running..."));