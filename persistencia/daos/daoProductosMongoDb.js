import contenedorProductosMongoDb from "../contenedores/contenedorProductosMongoDb.js";

class DaoProductosMongoDb extends contenedorProductosMongoDb {

    constructor() {
        super('productos', {
            id: { type: Number, required: true },
            title: { type: String, required: true },
            codigo: { type: Number, required: true},
            foto: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
            timestap: { type: Number, required: true },
            categoria: { type: String, required: true }
        })
    }

}

export default DaoProductosMongoDb;