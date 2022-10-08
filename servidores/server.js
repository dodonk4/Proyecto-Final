import express from 'express';

import http from 'http';

import { Server as serverIO} from 'socket.io';

import bodyParser from 'body-parser';

import { engine } from 'express-handlebars';

import flash from 'connect-flash';

import mainRouter from '../routers/routerGeneral.js';

import dotenv from 'dotenv';

import {puerto} from '../minimist/minimist.js'

import {setupWorker} from '@socket.io/sticky';

import { createAdapter } from '@socket.io/cluster-adapter';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import Handlebars from 'handlebars';

import { mensajesDao } from '../persistencia/daos/index.js';

dotenv.config({
    path: './.env'
      
  })

const app = express()

app.engine('handlebars', engine({defaultLayout: "index", handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');
app.set("views", "./public/views");
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded());
app.use(flash());
app.use(mainRouter);

const httpServer = new http.Server(app);
const io = new serverIO(httpServer);

function crearServidor(port) {
    httpServer.listen((process.env.PORT || puerto), () => {
        console.log(`escuchando en puerto ${puerto}`);
    })
    io.on('connection', async (socket)=>{
        console.log('Usuario conectado: ' + socket.id);
        socket.on('mensaje', async(data)=>{
            await mensajesDao.save(data);
            io.sockets.emit('mensaje', data);
        })
    })
}

function crearServidorCluster(port) {
    console.log(`Worker ${process.pid} started`)
    io.adapter(createAdapter());
    setupWorker(io);
    io.on('connection', async (socket)=>{  
        console.log('Usuario conectado: ' + socket.id);
        socket.on('mensaje', async(data)=>{
            await mensajesDao.save(data);
            io.sockets.emit('mensaje', data);
        })
    })
}



export {crearServidor, crearServidorCluster};