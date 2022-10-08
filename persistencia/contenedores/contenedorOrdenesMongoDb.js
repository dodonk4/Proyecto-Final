import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose';
import config from '../../config.js';
import {configuracion, loggerError} from '../../log4js/log4.js';
configuracion();
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class contenedorOrdenesMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async createOrden(productos, cantidad, email){
            try {
                let ordenes = await this.obtenerOrdenes();
                let productosConCantidad = [];
                for (let i = 0; i < productos.length; i++) {
                    productosConCantidad.push(`${productos[i].title}: ${cantidad[i]}`);
                }
                let today = new Date();
                let now = today.toLocaleString();
                const orden = {items: productosConCantidad, numeroDeOrden: ordenes.length, fechaHora: now, estado: "confirmado", emailDelEmisor: email};
                const ordenSaveModel = new this.coleccion(orden);
                await ordenSaveModel.save();
            } catch (error) {
                loggerError.error(`Error de lectura: ${error}`);
            }
        
    }
    
    async obtenerOrdenes(){
        try {
            let ordenes = await this.coleccion.find({});
            return ordenes;
        } catch (error) {
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

}

export default contenedorOrdenesMongoDb;