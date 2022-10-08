import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose';
import config from '../../config.js';
import {configuracion, loggerError} from '../../log4js/log4.js';
configuracion();
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class contenedorMensajesMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async save(objeto){
            try {
                const mensaje = {email: objeto.email, fecha: objeto.fecha, contenido: objeto.contenido};
                const mensajeSaveModel = new this.coleccion(mensaje);
                await mensajeSaveModel.save();
            } catch (error) {
                loggerError.error(`Error de lectura: ${error}`);
            }
        
    }
    async getAll(){
        try{
                let mensajes = await this.coleccion.find({});
                return mensajes;
        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }


}

export default contenedorMensajesMongoDb;