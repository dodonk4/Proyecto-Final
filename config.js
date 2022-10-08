import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
      
  })

const modo = process.env.MODO_PERSISTENCIA;
const conexion = process.env.CONEXION;


export default {
    mongodb: {
        cnxStr: conexion,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    MODO_PERSISTENCIA: modo
}