import contenedorMensajesMongoDb from "../contenedores/contenedorMensajesMongoDb.js";

class mensajesDaoMongoDb extends contenedorMensajesMongoDb {

    constructor() {
        super('mensajes', {
            email: { type: String, required: true },
            fecha: { type: String, required: true},
            contenido: { type: String, required: true}
        })
    }
}

export default mensajesDaoMongoDb;