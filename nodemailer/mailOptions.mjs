import dotenv from 'dotenv';
import { carritosDao } from '../persistencia/daos/index.js';
import { productosDao } from '../persistencia/daos/index.js';

dotenv.config({
    path: './.env'
      
})

const options2 = async (nombre)=> {
    const cantidad = await carritosDao.obtenerCantidades(nombre);
    let productos = await productosDao.getAll();
    for (let i = 0; i < productos.length; i++) {
        productos[i].cantidad = cantidad[i];
    }
    const mailOptions2 = {
        from: 'Servidor Node.js',
        to: process.env.TEST_MAIL,
        subject: 'Pedido de prueba',
        template: 'mail',
        context: {
            titulo: 'Orden confirmada',
            productos: productos
        }
    }
    return mailOptions2
}

const mailOptions = {
    from: 'Servidor Node.js',
    to: process.env.TEST_MAIL,
    subject: 'Se ha registrado un usuario',
    html: '<h1 style="color: blue;">Se ha registrado un usuario<span style="color: green;">Node.js</span></h1>'
}

export {mailOptions, options2}

