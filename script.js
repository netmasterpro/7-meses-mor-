var musica = new Audio('music.mp3');
musica.loop = true;
musica.volume = 0.5;

var piezas = [];
var ordenCorrecto = [];
var seleccionada = null;
var filas = 5;
var columnas = 5;

// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos el botón
    var boton = document.querySelector("#menu button");
    boton.addEventListener("click", function() {
        // Reproducir música al primer click
        musica.play().catch(function(e){
            console.log("Audio bloqueado: " + e);
        });

        // Abrir puzzle
        abrirPuzzle();
    });
});

function abrirPuzzle() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("puzzle").style.display = "block";
    document.getElementById("felicitacion").innerHTML = "";

    crearPuzzle();
}

function volverInicio() {
    document.getElementById("puzzle").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function crearPuzzle() {
    var tablero = document.getElementById("tablero");
    tablero.innerHTML = "";

    piezas = [];
    ordenCorrecto = [];

    var total = filas * columnas;

    for (var i = 0; i < total; i++) {
        piezas.push(i);
        ordenCorrecto.push(i);
    }

    piezas.sort(function () {
        return Math.random() - 0.5;
    });

    var tamaño = tablero.offsetWidth / columnas;

    for (var j = 0; j < piezas.length; j++) {
        var div = document.createElement("div");

        div.style.width = tamaño + "px";
        div.style.height = tamaño + "px";

        div.style.backgroundImage = "url('anuel.jpg')";
        div.style.backgroundSize =
            (tamaño * columnas) + "px " + (tamaño * filas) + "px";

        var x = piezas[j] % columnas;
        var y = Math.floor(piezas[j] / columnas);

        div.style.backgroundPosition =
            (-x * tamaño) + "px " + (-y * tamaño) + "px";

        div.onclick = function () {
            seleccionar(this);
        };

        tablero.appendChild(div);
    }
}

function seleccionar(pieza) {
    if (seleccionada === null) {
        seleccionada = pieza;
        pieza.style.opacity = "0.6";
    } else {
        var temp = seleccionada.style.backgroundPosition;
        seleccionada.style.backgroundPosition = pieza.style.backgroundPosition;
        pieza.style.backgroundPosition = temp;

        seleccionada.style.opacity = "1";
        seleccionada = null;

        comprobarSiGano();
    }
}

function comprobarSiGano() {
    var tablero = document.getElementById("tablero");
    var hijos = tablero.children;
    var tamaño = tablero.offsetWidth / columnas;

    for (var i = 0; i < hijos.length; i++) {
        var x = i % columnas;
        var y = Math.floor(i / columnas);

        var correcta = (-x * tamaño) + "px " + (-y * tamaño) + "px";

        if (hijos[i].style.backgroundPosition !== correcta) {
            return;
        }
    }

    document.getElementById("felicitacion").innerHTML =
        "💖 Bien hecho mor, lo lograste 💖";

    musica.volume = 0.8;
           }
