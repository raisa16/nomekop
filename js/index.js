
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
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa =  document.getElementById('mapa')

let ataquesJugador
let ataquesMokeponEnemigo =[]

let mokepones = [];
let ataqueJugador = []
let ataqueEnemigo = [] 
let opcionDeMokepones;
let inputHipodoge
let inputCapipepo
let inputRatigeya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = [];
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo
let mapaBackground = new Image();
mapaBackground.src ='./assets/mokemap.png'

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 0) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
           this.x,
           this.y,
           this.ancho,
           this.alto
        )
    }
}
let hipodoge = new Mokepon('Hipodoge','"./assets/mokepons_mokepon_hipodoge_attack.webp"', 5,'./assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', '"./assets/mokepons_mokepon_capipepo_attack.webp"', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', '"./assets/mokepons_mokepon_ratigueya_attack.webp"', 5, './assets/ratigueya.png');

let hipodogeEnemigo= new Mokepon('Hipodoge','"./assets/mokepons_mokepon_hipodoge_attack.webp"', 5,'./assets/hipodoge.png', 80,120);
let capipepoEnemigo= new Mokepon('Capipepo', '"./assets/mokepons_mokepon_capipepo_attack.webp"', 5, './assets/capipepo.png', 150, 95);
let ratigueyEnemigo = new Mokepon('Ratigueya', '"./assets/mokepons_mokepon_ratigueya_attack.webp"', 5, './assets/ratigueya.png', 200, 190);


hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-agua' },
)
capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-agua' },
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-agua' },
)
mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';

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


}
function reiniciar(){
    location.reload();
}
function seleccionarMascotaJugador(){

    sectionSeleccionarMascota.style.display = 'none';

    //sectionSeleccionarAtaque.style.display = 'flex';
    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    }
    else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    }
    else if (inputRatigeya.checked) {
        spanMascotaJugador.innerHTML = inputRatigeya.id;
        mascotaJugador = inputRatigeya.id;
    }
    else {
        alert('Selecciona una mascota')
    }
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
    seleccionarMascotaEnemigo();
}
function extraerAtaques(mascotaJugador) {
    
    let ataques
    for (let i = 0; i < mokepones.length; i++) {

        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    

    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}
    function secuenciaAtaque() {
        botones.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                if (e.target.textContent === '🔥') {
                    ataqueJugador.push('FUEGO')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
                    boton.disabled = true;
                } else if (e.target.textContent === '🌱') {
                    ataqueJugador.push('TIERRA')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
                    boton.disabled = true;
                } else if (e.target.textContent === '💧') {
                    ataqueJugador.push('AGUA')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
                    boton.disabled = true;
                }
                ataqueAleatorioEnemigo()
        })
        })
    
    
}

function seleccionarMascotaEnemigo() {

    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA');
    }
    else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
    function iniciarPelea() {
        if (ataqueJugador.length === 5){
            combate();
        }
    }

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }
        else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') {
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador            
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
        } else if (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
            victoriasJugador++
            indexAmbosOponentes(index, index)            
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML = victoriasJugador
        }
        else if (ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
            victoriasJugador++            
            spanVidasJugador.innerHTML = victoriasJugador
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
    }
    else {
        victoriasEnemigo++        
        spanVidasEnemigo.innerHTML = victoriasEnemigo
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE")
    }
    } 
    

    revisarVidas()
}
function revisarVidas() {
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("esto fue un empate!!!")
    } else if (victoriasJugador>victoriasEnemigo ) {
        crearMensajeFinal("Ganaste 🎉")
    } else  {
        crearMensajeFinal("Perdiste 💀")
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    mensaje.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;


    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal) {

    mensaje.innerHTML = resultadoFinal;

    sectionSeleccionarReiniciar.style.display = 'flex';
}

function pintarCanvas() {
    mascotaJugadorObjeto.x +=  mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y +=  mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0,0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyEnemigo.pintarMokepon()
    if(mascotaJugadorObjeto.velocidadX !=0 || 
        mascotaJugadorObjeto.velocidadY !=0){
            revisarColision(hipodogeEnemigo)
            revisarColision(capipepoEnemigo)
            revisarColision(ratigueyEnemigo)
        }

}
function moverCapipepoDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}
function moverCapipepoIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}
function moverCapipepoArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}
function moverCapipepoAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverCapipepoArriba();
            break;
        case 'ArrowDown':
            moverCapipepoAbajo();
            break;
        case 'ArrowLeft':
            moverCapipepoIzquierda();
            break;
        case 'ArrowRight':
            moverCapipepoDerecha();
            break;
        default:
            break;
    }
}
function iniciarMapa() {
    sectionVerMapa.style.display = 'flex';
    mascotaJugadorObjeto =obtenerObjetoMascota(mascotaJugador)
    mapa.width = 320;
    mapa.height = 240;
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}
function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {

        if (mascotaJugador === mokepones[i].nombre) {
            if(mokepones[i].nombre === "Hipodoge")
                mokepones[i].foto = "./assets/mokepons_mokepon_hipodoge_attack.webp";
            else if(mokepones[i].nombre === "Capipepo")
                mokepones[i].foto ="./assets/mokepons_mokepon_capipepo_attack.webp"
            else {
               mokepones[i].foto = './assets/mokepons_mokepon_ratigueya_attack.webp'
            }
            return mokepones[i];
        }
    }
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota= mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    
    if(abajoMascota < arribaEnemigo ||
       arribaMascota > abajoEnemigo ||
       derechaMascota < izquierdaEnemigo || 
       izquierdaMascota > derechaEnemigo)
       {
        return
       }
       detenerMovimiento()
       alert("Hay colision"+ enemigo.nombre)
}

window.addEventListener('load', iniciarJuego)