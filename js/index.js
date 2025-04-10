function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota-jugador')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}
function seleccionarMascotaJugador(){
    alert("Hola");
}



window.addEventListener('load', iniciarJuego)