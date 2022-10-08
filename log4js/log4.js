import log4js from 'log4js';

const configuracion = ()=>{
    log4js.configure({
    appenders: {
        miLoggerConsole: { type: 'console'},
        warnFile: { type: 'file', filename: 'warn.log'},
        errorFile: { type: 'file', filename: 'error.log'}
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'trace'},
        consola: { appenders: ['miLoggerConsole'], level: 'debug'},
        archivoWarn: { appenders: ['miLoggerConsole', 'warnFile'], level: 'warn'},
        archivoError: { appenders: ['miLoggerConsole','errorFile'], level: 'error'},
        consolaInfo: { appenders: ['miLoggerConsole'], level: 'info'},
    }
})
} 

const loggerConsola = log4js.getLogger('consola');
const loggerArchivo = log4js.getLogger('consolaInfo');
const loggerWarning = log4js.getLogger('archivoWarn');
const loggerError = log4js.getLogger('archivoError');

export {configuracion, loggerConsola, loggerArchivo, loggerWarning, loggerError};