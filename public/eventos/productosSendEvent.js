const socket = io();
const eventoDeProductosSend = ()=>{
const title = document.getElementById('title').value;
const price = document.getElementById('price').value;
const thumbnail = document.getElementById('thumbnail').value;
let numbers = /^[0-9]+$/;
let verificador = 0;

if(title.match(numbers) || (title == "") ){
    alert('Ingrese unicamente letras en el campo de Productos');
    verificador = 0;
}else{
    verificador += 1;
}

if(price.match(numbers)){
    verificador += 1;
}else{
    alert('Ingrese unicamente numeros en el campo de Precios');
    verificador = 0;
}

if(thumbnail.match(numbers) || (thumbnail == "")){
    alert('Ingrese unicamente letras en el campo de Thumbnail');
    verificador = 0;
}else{
    verificador += 1;
}

if(verificador === 3){
    socket.emit('prod', {title, price, thumbnail});
    console.log('socket enviado')
}
    
    
}

export default eventoDeProductosSend;