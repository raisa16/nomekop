const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionSeleccionarReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('Seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const mensaje = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionDeMokepones;

let inputHipodoge
let inputCapipepo
let inputRatigeya


class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
    }
}
let mokepones=[];
let hipodoge = new Mokepon('Hipodoge','"./assets/mokepons_mokepon_hipodoge_attack.webp"',5);
let capipepo = new Mokepon('Capipepo', '"./assets/mokepons_mokepon_capipepo_attack.webp"', 5);
let ratigueya = new Mokepon('Ratigueya', '"./assets/mokepons_mokepon_ratigueya_attack.webp"', 5);

mokepones.push(hipodoge,capipepo,ratigueya);
hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-agua'},
)
capipepo.ataques.push(    
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-agua'},
)
ratigueya.ataques.push(    
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-agua'},
)

console.log(mokepones)

function iniciarJuego() {    
    sectionSeleccionarAtaque.style.display = 'none';
    sectionSeleccionarReiniciar.style.display = 'none';
    
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto}alt=${mokepon.nombre}>
            </label>
           `
           contenedorTarjetas.innerHTML += opcionDeMokepones;
           
           inputHipodoge = document.getElementById('Hipodoge');
           inputCapipepo = document.getElementById('Capipepo');
           inputRatigeya = document.getElementById('Ratigueya');
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)    
    botonReiniciar.addEventListener('click', reiniciar)  

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
}
function reiniciar(){
    location.reload();
}
function seleccionarMascotaJugador(){
    
    sectionSeleccionarMascota.style.display = 'none';
    
    sectionSeleccionarAtaque.style.display = 'flex';
    
    
    if(inputHipodoge.checked == true)
        spanMascotaJugador.innerHTML = inputHipodoge.id;
    else if(inputCapipepo.checked == true)
        spanMascotaJugador.innerHTML = inputCapipepo.id;
    else if(inputRatigeya.checked == true)
        spanMascotaJugador.innerHTML = inputRatigeya.id;
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
    let mascotaAleatorio = aleatorio(0,mokepones.length-1)

        spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
  }

  function combate() {
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
    
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    mensaje.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
    
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);    
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);  
}
function crearMensajeFinal(resultadoFinal) {
    
    mensaje.innerHTML = resultadoFinal;
    
    

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionSeleccionarReiniciar.style.display = 'flex';
}


window.addEventListener('load', iniciarJuego)