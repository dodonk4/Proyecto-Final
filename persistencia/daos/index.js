import config from '../../config.js'
let usuariosDao
let productosDao
let carritosDao
let ordenesDao
let mensajesDao
switch (config.MODO_PERSISTENCIA) {
    case 'mongodb':
        const { default: CommonUser } = await import('./daoMongoDb.js')
        const { default: ProductosDaoMongoDb } = await import('./daoProductosMongoDb.js')
        const { default: carritoDaoMongoDb } = await import('./daoCarritoMongoDb.js')
        const { default: ordenesDaoMongoDb } = await import('./daoOrdenesMongoDb.js')
        const { default: mensajesDaoMongoDb } = await import('./daoMensajesMongoDb.js')
        usuariosDao = new CommonUser()
        productosDao = new ProductosDaoMongoDb()
        carritosDao = new carritoDaoMongoDb();
        ordenesDao = new ordenesDaoMongoDb();
        mensajesDao = new mensajesDaoMongoDb();
        break
        
}
export { usuariosDao, productosDao, carritosDao, ordenesDao, mensajesDao }