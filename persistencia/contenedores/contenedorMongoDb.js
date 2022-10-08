import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose';
import config from '../../config.js';
import {configuracion, loggerError} from '../../log4js/log4.js';
configuracion();
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class contenedorMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async save(objeto){
            try {
                const user = {nombre: objeto.nombre, contrasena: objeto.contrasena, telefono: objeto.telefono, email: objeto.email, direccion: objeto.direccion, edad: objeto.edad, foto: objeto.foto};
                const userSaveModel = new this.coleccion(user);
                await userSaveModel.save();
            } catch (error) {
                loggerError.error(`Error de lectura: ${error}`);
            }
        
    }

    async getAll(){
        try{
                let usuarios = await this.coleccion.find({});
                return usuarios;
        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

    async changeCantidad(nuevaCantidad, name){
        try {
            let usuarios = await this.coleccion.find({});
            for (let usuario of usuarios){
                if (usuario.nombre === name){
                    await this.coleccion.updateOne({nombre: name}, {$set: {cantidad: nuevaCantidad}});
                }
            }

        } catch (error) {
            loggerError.error(`Error de lectura: ${error}`);
        }
    }
    
    async getCantidad(name){
        try {
            let usuario = await this.coleccion.find({nombre: name});
            return usuario[0].cantidad;

        } catch (error) {
            loggerError.error(`Error de lectura: ${error}`);
        }
    }

    async getPhone(name){
        try {
            let usuario = await this.coleccion.find({nombre: name});
            return usuario[0].telefono;

        } catch (error) {
            loggerError.error(`Error de lectura: ${error}`);
        }
    }

    async getByName(name){
        try {
            let usuario = await this.coleccion.find({nombre: name});
            return usuario;

        } catch (error) {
            loggerError.error(`Error de lectura: ${error}`);
        }
    }


}

export default contenedorMongoDb;