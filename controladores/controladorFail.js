import flash from 'connect-flash';
import {configuracion, loggerConsola} from '../log4js/log4.js';
import {puerto} from '../minimist/minimist.js'
configuracion();


const controladorFail = {
    getFailRegistro: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/fail-registro`);
        loggerConsola.info(`Metodo: GET`);
        console.log(req.flash('error'));
        res.redirect('/');
    },
    getFailLogin: async (req, res)=>{
        loggerConsola.info(`localhost:${puerto}/fail-login`);
        loggerConsola.info(`Metodo: GET`);
        console.log(req.flash('error'));
        res.send('Fallaste el login');
    }

}

export default controladorFail;