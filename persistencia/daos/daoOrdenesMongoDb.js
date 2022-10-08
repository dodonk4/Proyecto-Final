import contenedorOrdenesMongoDb from "../contenedores/contenedorOrdenesMongoDb.js";

class ordenesDaoMongoDb extends contenedorOrdenesMongoDb {

    constructor() {
        super('ordenes', {
            items: { type: Array, required: true },
            numeroDeOrden: { type: Number, required: true},
            fechaHora: { type: Date, required: true},
            estado: { type: String, required: true },
            emailDelEmisor: { type: String, required: true }
        })
    }
}

export default ordenesDaoMongoDb;