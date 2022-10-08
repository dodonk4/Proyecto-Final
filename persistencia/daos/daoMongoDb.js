import contenedorMongoDb from "../contenedores/contenedorMongoDb.js";

class DaoMongoDb extends contenedorMongoDb {

    constructor() {
        super('usuariosRegistrados', {
            nombre: { type: String, required: true },
            contrasena: { type: String, required: true },
            telefono: { type: Number, required: true},
            email: { type: String, required: true},
            direccion: { type: String, required: true},
            edad: { type: Number, required: true},
            foto: { type: String, required: true}
        })
        
    }

}


export default DaoMongoDb;