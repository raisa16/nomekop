let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none';
    
    let sectionSeleccionarReiniciar = document.getElementById('reiniciar');
    sectionSeleccionarReiniciar.style.display = 'none';

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciar)

    let botonFuego = document.getElementById('boton-fuego')
    let botonAgua = document.getElementById('boton-agua')
    let botonTierra = document.getElementById('boton-tierra')
    
    

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
}
function reiniciar(){
    location.reload();
}
function seleccionarMascotaJugador(){
    let sectionSeleccionarMascota = document.getElementById('Seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block';
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigeya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    if(inputHipodoge.checked == true)
        spanMascotaJugador.innerHTML = 'Hipodoge';
    else if(inputCapipepo.checked == true)
        spanMascotaJugador.innerHTML = 'Capipepo';
    else if(inputRatigeya.checked == true)
        spanMascotaJugador.innerHTML = 'Ratigueya'
    else {
        alert('Selecciona una mascota')
    }

    seleccionarMascotaEnemigo();
    }
    function ataqueFuego() {
        ataqueJugador = 'FUEGO'
        ataqueAleatorioEnemigo()
    }
    function ataqueAgua() {
        ataqueJugador = 'AGUA'
        ataqueAleatorioEnemigo()
    }
    function ataqueTierra() {
        ataqueJugador = 'TIERRA'
        ataqueAleatorioEnemigo()
    }
    function ataqueAleatorioEnemigo(){
        ataqueAleatorio=aleatorio(1,3)
        if(ataqueAleatorio == 1){
            ataqueEnemigo = 'FUEGO';
        } else if(ataqueAleatorio == 2){
            ataqueEnemigo = 'AGUA';
        }
        else if(ataqueAleatorio == 3){
            ataqueEnemigo = 'TIERRA';
        }
        combate();
    }
    function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
  }
  
  function seleccionarMascotaEnemigo(){
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    let mascotaAleatorio = aleatorio(1,3)
    if(mascotaAleatorio == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge';
    } else if(mascotaAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    }
    else if(mascotaAleatorio == 3){
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
  }

  function combate() {
    
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        crearMensaje("GANASTE")
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
        crearMensaje("GANASTE")
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        vidasEnemigo--
        spanVidasEnemigo.innerHTML=vidasEnemigo
        crearMensaje("GANASTE")
    } else {
        vidasJugador--
        spanVidasJugador.innerHTML=vidasJugador
        crearMensaje("PERDISTE")
    }

    revisarVidas()
  }
  function revisarVidas() {
    
    if(vidasEnemigo == 0) {
        crearMensajeFinal("Ganaste 🎉")
    } else if (vidasJugador == 0){
                crearMensajeFinal("Perdiste 💀")
    }
  }

  function crearMensaje(resultado) {
    let parrafo = document.createElement('p');
    let mensaje = document.getElementById('mensajes')
    parrafo.innerHTML = 'Tu mascota atacó con '+ ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultado;
    mensaje.appendChild(parrafo);
}
function crearMensajeFinal(resultadoFinal) {
    let parrafo = document.createElement('p');
    let mensaje = document.getElementById('mensajes')
    parrafo.innerHTML = resultadoFinal;
    mensaje.appendChild(parrafo);

    let botonFuego = document.getElementById('boton-fuego')
    let botonAgua = document.getElementById('boton-agua')
    let botonTierra = document.getElementById('boton-tierra')

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    let sectionSeleccionarReiniciar = document.getElementById('reiniciar');
    sectionSeleccionarReiniciar.style.display = 'block';
}


window.addEventListener('load', iniciarJuego)