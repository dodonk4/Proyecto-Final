const socket = io();
const botonDeEnviar = document.getElementById('botonDeEnviar');
const contenedorDeMensajes = document.getElementById('contenedorDeMensajes');
const email = document.getElementById('emailParaSend').textContent;
console.log(email);

import eventoDeSend from '../eventos/chatSendEvent.js';

botonDeEnviar.addEventListener('click', event=>{eventoDeSend(email)});

socket.on('mensaje', function(data){
    const msj = document.createElement('li');
    msj.innerHTML = `<p style ="color: blue; font-weight: bold; display: inline-block;">${data.email}</p> <p style ="color: brown; display: inline-block;">${data.fecha}</p> <p style ="color: green; font-style: italic; display: inline-block;">${data.contenido}</p>`;
    contenedorDeMensajes.append(msj);
})