import express from 'express';
import { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import controladorComplejo from '../controladores/controladorComplejo.js';
import { passportMiddleware } from '../passport/passport.js';
import { passportSessionHandler } from '../passport/passport.js';
import controladorFail from '../controladores/controladorFail.js';
import {configuracion, loggerWarning} from '../log4js/log4.js';
import {puerto} from '../minimist/minimist.js';
import compression from 'compression';
configuracion();


const mainRouter = new Router();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mainRouter.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://root:1234@cluster0.5xw3itz.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    secret: '123456789',
    resave: true,
    saveUninitialized: true
}));
mainRouter.use(passportMiddleware);
mainRouter.use(passportSessionHandler);
mainRouter.use(express.json());
mainRouter.use(express.urlencoded({ extended: true }));
mainRouter.get('/registro', controladorComplejo.getRegistro);
mainRouter.post('/login', controladorComplejo.postLogin);
mainRouter.get('/productos', controladorComplejo.getInicio);
mainRouter.post('/productos', passport.authenticate('login', { failureRedirect: '/fail-login', failureFlash: true}), controladorComplejo.postInicio);
mainRouter.get('/fail-registro', controladorFail.getFailRegistro);
mainRouter.get('/fail-login', controladorFail.getFailLogin);
mainRouter.get('/logout', controladorComplejo.getLogout);
mainRouter.get('/info', compression(), controladorComplejo.getInfo);
mainRouter.post('/carrito', controladorComplejo.postCarrito);
mainRouter.get('/carrito', controladorComplejo.getCarrito);
mainRouter.post('/carritoDone', controladorComplejo.postCarritoDone);
mainRouter.get('/carritoDone', controladorComplejo.getCarritoDone);
mainRouter.post('/createProduct', controladorComplejo.postProduct);
mainRouter.get('/getProductByName', controladorComplejo.getProductByName);
mainRouter.get('/getAllProducts', controladorComplejo.getAllProducts);
mainRouter.put('/updateCarrito', controladorComplejo.updateCarritoCantidad);
mainRouter.put('/updateProduct', controladorComplejo.updateProduct);
mainRouter.get('/', controladorComplejo.getLogin);
mainRouter.delete('/deleteProduct', controladorComplejo.deleteProduct);
mainRouter.get('/productos/:category', controladorComplejo.productsForCategory);
mainRouter.get('/chat', controladorComplejo.getGeneralChat);
mainRouter.get('*', (req, res)=>{
    loggerWarning.warn(`localhost:${puerto}${req.params[0]}`);
    loggerWarning.warn(`Metodo: GET`);
    res.send('Ruta inexistente');
})

export default mainRouter;
