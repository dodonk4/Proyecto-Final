import { usuariosDao } from '../persistencia/daos/index.js';
import { productosDao } from '../persistencia/daos/index.js';
import { ordenesDao } from '../persistencia/daos/index.js';
import path from 'path';
import os from 'os';
import {configuracion, loggerConsola, loggerError} from '../log4js/log4.js';
import {puerto} from '../minimist/minimist.js';
import { sender2 } from '../nodemailer/send.mjs';
configuracion();
import {fileURLToPath} from 'url';
import { carritosDao } from '../persistencia/daos/index.js';
import { mensajesDao } from '../persistencia/daos/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let a = 0; //Esta variable es una ayuda bastante simplificada para reconocer el nombre del usuario que se loguea.

const controladorComplejo = {

    //Hay dos secciones de sub-controladores, uno para las rutas del frontend y otro para las rutas de ThunderClient.
    //Esto debido a que se puede utilziar el "let a" en ambos casos.
    
    //SUB-CONTROLADOR DE FRONTEND
    getInicio: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/inicio`)
        loggerConsola.info(`Metodo: GET`);
        if (req.session.passport) {
            let usuario = await usuariosDao.getByName(req.session.passport.user.nombre)
            let productos = await productosDao.getAll();
            res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, nombre: req.session.passport.user.nombre, foto: usuario[0].foto, edad: usuario[0].edad, email: usuario[0].email, direccion: usuario[0].direccion, telefono: usuario[0].telefono});
        } else {
            res.render('redireccion');
        }
    },
    getGeneralChat: async (req, res)=>{
        if (req.session.passport) {
            let mensajes = await mensajesDao.getAll();
            let usuario = await usuariosDao.getByName(req.session.passport.user.nombre)
            let correo = usuario[0].email;
            let nombre = usuario[0].nombre;
            res.render('chat', { mensajes, correo, nombre } );
        } else {
            res.render('redireccion');
        }
    },
    productsForCategory: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/inicio`)
        loggerConsola.info(`Metodo: GET`);
        if (req.session.passport) {
            let productos = await productosDao.getByCategory(req.params.category);
            res.render('productosPorCategoria', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos });
        } else {
            res.render('redireccion');
        }
    },
    postInicio: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/inicio`);
        loggerConsola.info(`Metodo: POST`);
        req.session.user = req.body.nombre;
        a = req.body.nombre;
        req.session.password = req.body.contraseña;
        req.session.cookie.maxAge = 6000000;
        let productos = await productosDao.getAll();
        let usuario = await usuariosDao.getByName(req.session.passport.user.nombre)
        res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, nombre: req.session.passport.user.nombre, foto: usuario[0].foto, edad: usuario[0].edad, email: usuario[0].email, direccion: usuario[0].direccion, telefono: usuario[0].telefono});
    },
    getInfo: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/info`)
        loggerConsola.info(`Metodo: GET`);
        let cosa = Object.entries(process.memoryUsage());
        let cosa2 = JSON.stringify(cosa[0]);
        let newCosa = cosa2.replace('"rss",', '').replace('[', '').replace(']', '');
        res.send(`Path de ejecución: ${path.join(__dirname, '/server.js')}<br>
        Carpeta del proyecto: ${process.cwd()}<br>
        Process ID: ${process.pid}<br>
        Version de Node.js: ${process.version}<br>
        Título del proceso: ${process.title}<br>
        Sistema operativo: ${process.platform}<br>
        Memoria reservada: ${newCosa}<br>
        Argumentos de Entrada: ${process.argv.slice(2)}<br>
        Numero de procesadores: ${os.cpus().length}`);
        
    },
    postCarrito: async (req, res)=>{
        if (req.session.passport) {
            a = req.session.passport.user.nombre;        
            let arrayCantidad = req.body.cantidad;
            await carritosDao.updateCantidad(a, arrayCantidad)
            let productos = await productosDao.getAll();
            for (let i = 0; i < productos.length; i++) {
                productos[i].cantidad = arrayCantidad[i];
            }
            res.render('carrito', { layout: 'otro', nombre: req.session.passport.user.nombre, productos});
        } else {
            res.render('redireccion');
        }
    },
    postCarritoDone: async (req, res)=>{
        let productos = await productosDao.getAll();
        await carritosDao.updateCantidad(a, req.body.cantidad)
        let usuario = await usuariosDao.getByName(a);
        let email = usuario[0].email;
        await ordenesDao.createOrden(productos, req.body.cantidad, email);
        await sender2(a);
        res.render('carritoDone');
    },
    getCarritoDone: async (req, res)=>{
        if (a != 0){
            res.render('carritoDone');
        }else{
            res.render('redireccion');
        }
    },
    getCarrito: async (req, res) => {
        if(a != 0){
            let cantidades = await carritosDao.obtenerCantidades(a);
            let productos = await productosDao.getAll();
            for (let i = 0; i < productos.length; i++) {
                productos[i].cantidad = cantidades[i];
            }
            res.render('carrito', { layout: 'otro', nombre: a, productos});
        }else{
            res.render('registrado');
        }
    },
    getLogout: async (req,res)=>{
        a = 0;
        loggerConsola.info(`localhost:${puerto}/logout`);
        loggerConsola.info(`Metodo: GET`);
            req.session.destroy(err => {
                if (err) {
                res.json({ status: 'Logout ERROR', body: err })
                } else {
                res.render('logout')
                }
            })
        },
    getProductByName: async (req, res)=>{
        try {
                let producto = await productosDao.getByName(req.body.title);
                res.send(await producto);
        } catch (error) {
            loggerError.error(error);
            loggerConsola.info('Hubo un error');
            res.send("No se encontró dicho producto");
        }
    },
    updateCarritoCantidad: async (req, res)=>{
        try {
            if(req.session.passport){
                let bodier = req.body;
                let nombres = Object.keys(bodier);
                let values = Object.values(bodier);
                let nuevoArray = [];
                let nuevoArrayCantidad = [];
                let productosDeCarrito = await carritosDao.obtenerProductos();
                for (let i = 0; i < productosDeCarrito.length; i++) {
                    for (let i2 = 0; i2 < nombres.length; i2++) { 
                        if(nombres[i2] === productosDeCarrito[i]) {
                            nuevoArray.push(nombres[i2]);
                            nuevoArrayCantidad.push(values[i2]);
                        }
                    } 
                }
                await carritosDao.updateCantidad(nuevoArrayCantidad);
                await usuariosDao.changeCantidad(nuevoArrayCantidad, req.session.passport.user.nombre);
                res.send('Se actualizó exitosamente');
            }else{
                res.send('Nesecitas loguearte');
            }
        } catch (error) {
            loggerError.error(error);
            loggerConsola.info('Hubo un error');
        }
    },
    getCarritoThunder: async (req, res) => {
        if(a != 0){
            let cantidades = await usuariosDao.getCantidad(a);
            let productos = await carritosDao.obtenerProductos();
            let resultado = [];
            for (let i = 0; i < productos.length; i++) {
                let productoCompleto = productos[i] + ": " + cantidades[i];
                resultado.push(productoCompleto);
            }
            res.send(resultado)
        }else{
            res.send('Necesitas loguearte');
        }
    },
    getAllProducts: async (req, res) => {
        let productos = await productosDao.getAll();
        res.send(productos);
        
    },
    getRegistro: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/registro`);
        loggerConsola.info(`Metodo: GET`);
        res.render('inicio');
    },
    postLogin: async(req,res)=>{
        loggerConsola.info(`localhost:${puerto}/login`);
        loggerConsola.info(`Metodo: POST`);
        if(req.body.nombre === "Ismael"){
          res.send('No puedes registarte con ese nombre de usuario, debido a que es el nombre de usuario del Admin');
        }
        else if(req.body.nombre){
          res.render('registrado', {nombre: req.body.nombre} ); 
          await usuariosDao.save(req.body);
          let productosPuros = await productosDao.getAll();
          let nombresDeProductos = [];
          for (let i = 0; i < productosPuros.length; i++) {
            nombresDeProductos.push(productosPuros[i].title);
          }
          await carritosDao.createCarrito(nombresDeProductos, req.body.nombre)
        }
        else{
          res.send('Registro Fallido')
        }
    },
    getLogin: async (req,res)=>{
        loggerConsola.info(`localhost:${puerto}/login`);
        loggerConsola.info(`Metodo: GET`);
        if(a != 0){
            res.redirect('/productos')
        }
        res.render('registrado');
    },
    //SUB-CONTROLADOR DE THUNDERCLIENT
    postProduct: async (req, res)=>{
        try {
            if(a === 'Ismael'){
                await productosDao.saveProduct(req.body);
                res.send(`${req.body.title} ha sido registrado`)
            }else{
                res.send("Usted no está registrado como el administrador designado para realizar está función")
            }
            
        } catch (error) {
            loggerError.error(error);
            loggerConsola.info('Hubo un error');
        }
        
    },
    deleteProduct: async (req, res) => {
        if(a === "Ismael"){
            await productosDao.deleteByName(req.body.title);
            res.send(req.body.title + " ha sido eliminado")
        }else{
            res.send("Usted no está registrado como el administrador designado para realizar está función")
        }
    },
    updateProduct: async (req, res) => {
        if(a === "Ismael"){
            await productosDao.updateProduct(req.body.Nombre, req.body.Title, req.body.Codigo, req.body.Stock, req.body.Foto, req.body.Precio, req.body.Categoria)
            res.send(req.body.Nombre + " ha sido actualizado")
        }else{
            res.send("Usted no está registrado como el administrador designado para realizar está función")
        }
    },
    getOrdenes: async (req, res) => {   
        if(a === "Ismael"){
            let ordenes = await ordenesDao.obtenerOrdenes();
            res.send(ordenes);
        }else{
            res.send("Usted no está registrado como el administrador designado para realizar está función")
        }
    }

}
    


export default controladorComplejo;