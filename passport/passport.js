import passport from 'passport';
import { Strategy } from 'passport-local';
import { usuariosDao } from '../persistencia/daos/index.js';

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use('login', new Strategy({ 
    usernameField: 'nombre',
    passwordField: 'contrasena',
},
    async (username, password, done) => {
        let usuarioEncontrado = 0;
        const obj = await usuariosDao.getAll();
        for (let index = 0; index < obj.length; index++) {
            const usuario = await obj[index];
            if(await usuario.nombre == username){
                usuarioEncontrado++;
                if(await usuario.contrasena == password){
                    usuarioEncontrado++;
                }
            }
        }
        if(usuarioEncontrado == 2){
            done(null, { id: 1, nombre: username, contrasena: password})
        }else{
            done(null, false)
        }
    }))

    

export const passportMiddleware = passport.initialize();
export const passportSessionHandler = passport.session();