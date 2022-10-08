const socket = io();

const butto = document.getElementById('btn');
const divo = document.getElementById('ulo');

import eventoDeProductosSend from '../eventos/productosSendEvent.js'

butto.addEventListener('click', eventoDeProductosSend);

socket.on('prod', function(data){
    console.log("socket de logica");
    const newProduct = document.createElement('li');
    newProduct.innerHTML = `${data.title} $${data.price} <img src=${data.thumbnail} width="70" height="70">`;
    divo.append(newProduct);
})