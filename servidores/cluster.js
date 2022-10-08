import http from 'http';
import cluster from 'cluster'
import os from 'os'
import { crearServidorCluster } from './server.js';
import { setupMaster } from '@socket.io/sticky';
import { setupPrimary } from '@socket.io/cluster-adapter';
import express from 'express';
import { puerto } from '../minimist/minimist.js';
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
        setupPrimary();

        cluster.setupPrimary({
            serialization: "advanced",
        })
        httpServer.listen(puerto)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork()
        });
    } else {
        crearServidorCluster(puerto)
    }
}
clustero();