import { modo } from "./minimist/minimist.js";
import {crearServidor} from './servidores/server.js';
import {puerto} from './minimist/minimist.js';
import http from 'http';
import cluster from 'cluster'
import os from 'os'
import { crearServidorCluster } from './servidores/server.js';
import { setupMaster } from '@socket.io/sticky';
import { setupPrimary } from '@socket.io/cluster-adapter';
import express from 'express';

const app = express();
const httpServer = new http.Server(app);


const numCPUs = os.cpus().length
cluster.schedulingPolicy = cluster.SCHED_RR;

const clustero = ()=>{
    console.log("cluster started");
    if (cluster.isPrimary) {
        console.log(`PID PRIMARIO ${process.pid}`)

        setupMaster(httpServer, {
            loadBalancingMethod: "least-connection",
        });
        console.log('llego a 26')
        setupPrimary();

        cluster.setupPrimary({
            serialization: "advanced",
        })
        console.log('llego a 32')
        httpServer.listen(puerto)
        console.log('llego a 34')
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        console.log('llego a 38')
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork()
        });
        console.log('llego a 43')
    } else {
        console.log('llego a 45')
        crearServidorCluster(puerto)
    }
}


if(modo === 'cluster'){
    console.log('se eligió ' + modo);
    clustero();
}else{
    crearServidor(puerto);
    console.log('se eligió servidor comun')
}

