import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose';
import config from '../../config.js';
import {configuracion, loggerError} from '../../log4js/log4.js';
configuracion();
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class carritoMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async createCarrito(arrayDeProductos, nombre){
            try {             
                let arrayCantidades = [];
                for (let i = 0; i < arrayDeProductos.length; i++) {
                    arrayCantidades.push(0);
                }
                const carrito = {nombre: nombre, productos: arrayDeProductos, cantidad: arrayCantidades};
                const carritoSaveModel = new this.coleccion(carrito);
                await carritoSaveModel.save();
            } catch (error) {
                loggerError.error(`Error de lectura: ${error}`);
            }
        
    }

    async obtenerCantidades(nombre){
        try {
            let carritos = await this.coleccion.find({nombre: nombre});
            return carritos[0].cantidad;
        } catch (error) {
            loggerError.error(`Error de lectura: ${error}`);
        }
    }

    async updateCantidad(nombre, cantidadDeUsuario){
        try{
            await this.coleccion.updateOne({nombre: nombre}, {$set: {cantidad: cantidadDeUsuario}});
        }
        catch(error){
            loggerError.error(`Error de lectura: ${error}`);
        }
    }

}

export default carritoMongoDb;