const socket = io();
const barraDeMensaje = document.getElementById('barraDeMensaje');

const eventoDeSend = (Email)=>{
    if(barraDeMensaje.value != ""){
        console.log(barraDeMensaje.value);
        let date1 = new Date();
        let date = date1.toISOString().split('T')[0];
        const email = Email;
        const contenido = barraDeMensaje.value;
        const today = new Date();
        const fecha = today.toLocaleDateString("es-ES");
        barraDeMensaje.value = "";
        socket.emit('mensaje', {email, fecha, contenido});
        console.log('socket enviado');
    }
}

export default eventoDeSend;