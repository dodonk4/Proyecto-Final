import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose';
import config from '../../config.js';
import {configuracion, loggerConsola, loggerError} from '../../log4js/log4.js';
configuracion();
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class contenedorProductosMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async saveProduct(objeto){
        try {
            let timestamp = Date.now();
            const prods = await this.getAll();
            let maxId = 1;
            for (let i = 0; i < await prods.length; i++) {
                maxId += 1;
            }
            const product = {title: objeto.title, codigo: objeto.codigo, precio: objeto.precio, foto: objeto.foto, stock: objeto.stock, timestap: timestamp, id: maxId, categoria: objeto.categoria};
            const productSaveModel = new this.coleccion(product);
            let productSave = await productSaveModel.save();
            loggerConsola.info(productSave);
        } catch (error) {
            loggerError.error(`Error de lectura: ${err}`);
        }
    
}

    async getAll(){
        try{
            let productos = await this.coleccion.find({}).lean();             
            return productos;
        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

    async getByName(name){
        try{
            let producto = await this.coleccion.find({title: name});
            return producto;
        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

    async getByCategory(category){
        try {
            let productos = await this.coleccion.find({categoria: category});
            return productos;
        } catch (error) {
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

    async deleteByName(name){
        try{
            await this.coleccion.deleteOne({ title: name });

        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

    async updateProduct(name, title, codigo, stock, foto, precio, categoria){
        try{
                title === "" ? loggerConsola.info("title no se definió") : await this.coleccion.updateOne({title: name}, {$set: {title: title}});
                codigo === "" ? loggerConsola.info("codigo no se definió") : await this.coleccion.updateOne({title: name}, {$set: {codigo: codigo}});
                stock === "" ? loggerConsola.info("stock no se definió") : await this.coleccion.updateOne({title: name}, {$set: {stock: stock}});
                foto === "" ? loggerConsola.info("foto no se definió") : await this.coleccion.updateOne({title: name}, {$set: {foto: foto}});
                precio === "" ? loggerConsola.info("precio no se definió") : await this.coleccion.updateOne({title: name}, {$set: {precio: precio}});
                categoria === "" ? loggerConsola.info("categoria no se definió") : await this.coleccion.updateOne({title: name}, {$set: {categoria: categoria}});
        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }


}

export default contenedorProductosMongoDb;