const barraDeMensaje = document.getElementById('barraDeMensaje');
const botonDeEnviar = document.getElementById('botonDeEnviar');
const mail = document.getElementById('mail');

barraDeMensaje.disabled = true;
botonDeEnviar.disabled = true;
let email = "";

const eventoDeLog = ()=>{
    let contadorDeLogueo = 0;

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
        
        console.log('Email Valido');
        contadorDeLogueo++;

    }else{
        console.log('Email invalido');
    }
    if (nombreDeUsuario.value.length === 0 || apellidoDeUsuario.value.length === 0 || aliasDeUsuario.value.length === 0 || edadDeUsuario.value.length === 0 || avatarDeUsuario.value.length === 0) {
        console.log('Escribe un nombre');
    } else {
        console.log('Nombre bien escrito')
        contadorDeLogueo++
    }
    if (contadorDeLogueo == 2) {
        barraDeMensaje.disabled = false;
        botonDeEnviar.disabled = false;
        let cosa = mail.value;
        email = cosa;
        return email;
    } else {
        condole.log('No cumples con los requisitos para ingresar');
    }
}

export default eventoDeLog;