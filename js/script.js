const URLCOMBATE = "data/UfcEvents.json";
const DIVCONTENEDOR = document.getElementById("contenedor");

const btnAnterior = document.getElementById("prev");
const btnSiguiente = document.getElementById("next");

let elementosPorPagina = 50;
let paginaActual = 1;
let combates = [];  


function avanzarPagina() {
    paginaActual++;
    actualizarVista();
}

function retrocederPagina() {
    paginaActual--;
    actualizarVista();
}

function mostrarPagina() {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const final = inicio + elementosPorPagina;
    return combates.slice(inicio, final);
}

function mostrarCombates(datosCombates) {
    DIVCONTENEDOR.innerHTML = ""; 

    let divCombates = document.createElement("div");
    divCombates.classList.add("combates-container");

    datosCombates.forEach(combate => {
        crearCombate(combate, divCombates); 
    });

    DIVCONTENEDOR.appendChild(divCombates); 
}

function crearCombate(combate, contenedor) {
    let divItem = document.createElement("div");
    divItem.classList.add("combate");

    let nombreEvento = document.createElement("h3");
    nombreEvento.textContent = combate.event;
    divItem.appendChild(nombreEvento);
    
    let nombresLuchadores = document.createElement("h4");
    
    let iconoRojo = document.createElement("i");
    iconoRojo.classList.add("fa-solid", "fa-user", "icono-rojo"); 
    nombresLuchadores.appendChild(iconoRojo);

    let nombreLuchador1 = document.createElement("span");
    nombreLuchador1.textContent = ` ${combate.fighter_1} VS`;
    nombresLuchadores.appendChild(nombreLuchador1);

    let iconoAzul = document.createElement("i");
    iconoAzul.classList.add("fa-solid", "fa-user", "icono-azul"); 
    nombresLuchadores.appendChild(iconoAzul);

    let nombreLuchador2 = document.createElement("span");
    nombreLuchador2.textContent = ` ${combate.fighter_2}`;
    nombresLuchadores.appendChild(nombreLuchador2);
 
    divItem.appendChild(nombresLuchadores);

    let resultado = document.createElement("p");
    resultado.textContent = `Resultado: ${combate.result}`;
    divItem.appendChild(resultado);

    let method = document.createElement("p");
    method.textContent = `Método de finalización: ${combate.method}`;
    divItem.appendChild(method);

    let round = document.createElement("p");
    round.textContent = `Round: ${combate.round}`;
    divItem.appendChild(round);

    let time = document.createElement("p");
    time.textContent = `Tiempo: ${combate.time}`;
    divItem.appendChild(time);

    
    contenedor.appendChild(divItem);
}



function actualizarVista() {
    const datosPagina = mostrarPagina(); 
    mostrarCombates(datosPagina);
    actualizarBotones();
}

function actualizarBotones() {
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = paginaActual * elementosPorPagina >= combates.length;
}

fetch(URLCOMBATE)
    .then(response => response.json())   
    .then(datosCombates => {
        combates = datosCombates;        
        actualizarVista();                
    })

btnAnterior.addEventListener("click", retrocederPagina);
btnSiguiente.addEventListener("click", avanzarPagina);
