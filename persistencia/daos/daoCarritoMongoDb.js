import carritoMongoDb from "../contenedores/carritoMongoDb.js";

class carritoDaoMongoDb extends carritoMongoDb {

    constructor() {
        super('carritos', {
            nombre: { type: String, required: true },
            productos: { type: Array, required: true},
            cantidad: { type: Array, required: true}
        })
    }
}

export default carritoDaoMongoDb;