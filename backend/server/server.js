const express = require('express');
const server = express();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Console } = require('console');
const db = require('./configuracion.js');
const sequelize = new Sequelize('mysql://' + db.user + ':@' + db.url + ':' + db.port + '/' + db.name);
const bodyparser = require('body-parser');
server.use(bodyparser.json());
const semilla = 'JaviDWFS';

//USUARIOS
server.get('/api/usuarios', (req, res) => {
    const query = 'SELECT * FROM USUARIOS';
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.json(response);
            console.log(response);
        }).catch((e) => console.log(e));
});

server.post('/api/usuarios',  (req, res) => {
    const query = 'INSERT INTO USUARIOS VALUES (NULL,?, ?, ?, ?,?,?,?)';
    const { nombre_usuario, nombre_apellido, email, telefono, direccion, password, es_admin } = req.body;
    console.log(req.body.nombre_usuario);
    sequelize.query(query, { replacements: [nombre_usuario, nombre_apellido, email, telefono, direccion, password, es_admin] })
        .then((response) => {
            res.json({ status: 'Usuario insertado correctamente', usuarios: req.body });
        }).catch((e) => console.log(e));
});

server.get('/api/usuarios/:id_usuario',  (req, res) => {
    const id = req.params.id_usuario;
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.json(data);
        }).catch(e => {
            return res.status(404).json({ error: 'Algo salió mal..' })
        })
});

server.delete('/api/usuarios/:id_usuario', (req, res) => {
    const id = req.params.id_usuario;
    const query = 'DELETE FROM usuarios WHERE ID_usuario = ?';
    sequelize.query(query, { replacements: [id] })
        .then((data) => {
            res.json({ status: 'Usuario borrado correctamente' });
        }).catch(e => console.error('Algo salio mal', e));
});

server.put('/api/usuarios/:id_usuario',  (req, res) => {
    const id = req.params.id_usuario;
    const nombre_usuario = req.body.nombre_usuario;
    const nombre_apellido = req.body.nombre_apellido;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const password = req.body.password;
    const es_admin = req.body.es_admin;
    const query = 'UPDATE usuarios SET nombre_usuario = ?, nombre_apellido = ?, email = ?, telefono = ?, direccion = ?, password=?, es_admin=? WHERE id_usuario = ?';
    sequelize.query(query, { replacements: [nombre_usuario, nombre_apellido, email, telefono, direccion, password, es_admin, id] })
        .then((data) => {
            res.json({ status: 'Usuario modificado correctamente' });
        }).catch(e => console.error('No se modifico el producto', e));
});

//PRODUCTOS
server.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM PRODUCTOS';
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
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
            res.json({ status: 'Producto insertado correctamente', productos: req.body });
        }).catch((e) => console.log(e));
});

server.get('/api/productos/:id_producto',  (req, res) => {
    const id = req.params.id_producto;
    const query = 'SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = ?';
    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.json(data);
        }).catch(e => {
            return res.status(404).json({ error: 'Algo salió mal..' })
        })
});

server.delete('/api/productos/:id_producto',  (req, res) => {
    const id = req.params.id_producto;
    const query = 'DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = ?';
    sequelize.query(query, { replacements: [id] })
        .then((data) => {
            res.json({ status: 'Producto borrado correctamente' });
        }).catch(e => console.error('Algo salio mal', e));
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
            res.json({ status: 'Producto modificado correctamente' });
        }).catch(e => console.error('No se modifico el producto', e));
});

//PEDIDOS
server.get('/api/pedidos', (req, res) => {
    const query = 'SELECT * FROM PEDIDOS';
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.json(response);
            console.log(response);
        }).catch((e) => console.log(e));
});

server.post('/api/pedidos',  (req, res) => {
    const query = 'INSERT INTO pedidos VALUES (NULL,?, ?, ?, ?,?, ?)';
    const { estado, hora, descripcion, metodo_pago, id_usuario, total } = req.body;
    sequelize.query(query, { replacements: [estado, hora, descripcion, metodo_pago, id_usuario, total] })
        .then((response) => {
            res.json({ status: 'Pedido insertado correctamente', productos: req.body });
        }).catch((e) => console.log(e));
});

server.get('/api/pedidos/:id_pedido',comprobarAdmin,(req, res) => {
    const id = req.params.id_pedido;
    const query = 'SELECT * FROM pedidos WHERE id_pedido = ?';
    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then(data => {
            res.json(data);
        }).catch(e => {
            return res.status(404).json({ error: 'Algo salió mal..' })
        })
});

server.delete('/api/pedidos/:id_pedido',comprobarAdmin,  (req, res) => {
    const id = req.params.id_pedido;
    const query = 'DELETE FROM pedidos WHERE id_pedido = ?';
    sequelize.query(query, { replacements: [id] })
        .then((data) => {
            res.json({ status: 'Pedido borrado correctamente' });
        }).catch(e => console.error('Algo salio mal', e), res.status(404).json({ error: 'Algo salió mal.., no se puede borrar' }));
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
            res.json({ status: 'Pedido modificado correctamente' });
        }).catch(e => console.error('No se modifico el pedido', e));
});

server.post("/api/usuarios/login", async (req, res) => {
    const { usuario, contrasenia } = req.body;
    await sequelize
      .query("SELECT * FROM usuarios WHERE nombre_usuario = ? ", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [usuario],
      })
      .then(async (user) => {
        let usuruario = user[0]
        if (usuruario === undefined) {
          res.status(409).send("Usuario o contraseña erradas");
        } else {
            const token = jwt.sign(usuruario, semilla)
            res.status(200).json({token: token});
        }
      });
  });

function comprobarExistenciaDeUsuario(req, res, next) {
    const { usuario } = req.body;
    sequelize
      .query("SELECT * FROM `Usuarios` WHERE nombre_usuario = ? ", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [usuario],
      })
      .then((user) => {
        if (user.nombre_usuario !== usuario) {
          next();
        } else {
          res.status(409).send("Usuario ya existe");
        }
      });
  }
  
  function comprobarAdmin(req, res, next) {
    const autorizacion  = req.headers['authorization'];
    const token = autorizacion && autorizacion.split(' ')[1];
    if(token == null) return res.SendStatus(401);
    jwt.verify(token, semilla, (err, usuario) =>{
      if(err){
        return res.sendStatus(403);
      } 
      console.log(usuario)
      sequelize
      .query("SELECT * FROM usuarios WHERE id_usuario = ? ", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [usuario.id_usuario],
      })
      .then((user) => {
        if (user[0].es_admin === 1) {
          next();
        } else {
          res.status(403).send("No permitido");
        }
      });
    })
  }

server.listen(4005, () => console.log("server running... port:4005"));