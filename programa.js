/**
 * Función que elige un numero entre min y max.
 */
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

/**
 * Función que muestra un mensaje y el dado de un resultado.
 */
function tirardaResultadoJugador(resultado) {
    mostrarDado(resultado)
    mensaje("Has sacado " + resultado)
}

var puntosJugador = 0
var puntosMaquina = 0
var maxPuntos = 20

/**
 * Función que se ejecuta cuando pinchas en el botón TIRAR.
 */
function tirarJugador() {
    aleatorio = random(1, 6)
    tirardaResultadoJugador(aleatorio)
    puntosJugador = puntosJugador + aleatorio
    escribirPuntos("jugador", puntosJugador)
    registro("jugador", "El jugador ha sacado: " + aleatorio + ", tiene un total de: " + puntosJugador)
    if (puntosJugador > maxPuntos) {
        gameOver("jugador")
    }

    tirarMaquina()
}

/**
 * Función que se ejecuta cuando el jugador le da al botón PASAR.
 */
function pasarJugador() {
    aleatorio = random(1, 6)
    if (puntosMaquina <= maxPuntos - 6) {
        tirarMaquina()
    } else if (aleatorio == 1) {
        tirarMaquina()
    } else {
        if (puntosJugador==puntosMaquina){
          gameOver("empate")  
        } else if (puntosJugador > puntosMaquina){       
            gameOver("maquina")
        } else {
            gameOver("jugador")
        }
    } 
}

/**
 * Función que finaliza la partida y oculta algunos botones.
 */
function gameOver(quien) {
    if (quien=="empate"){
        mensaje("Habeis perdidos los 2 ")
    } else if (quien == "jugador") {
        mensaje("Jugador has perdido")
    } else {
        mensaje("La maquina ha perdido")
    }
    var botonVolverJugar = document.getElementById("botonVolverJugar")
    botonVolverJugar.classList.remove("d-none")

    var botonTirar = document.getElementById("botonTirar")
    botonTirar.classList.add("d-none")

    var botonPasar = document.getElementById("botonPasar")
    botonPasar.classList.add("d-none")

    mostrarDado("0")
}

/**
 * Función que se ejecuta pulsando el botón VOLVER A JUGAR y restablece a 0.
 */
function volverAJugar() {
    var botonVolverJugar = document.getElementById("botonVolverJugar")
    botonVolverJugar.classList.add("d-none")

    var botonTirar = document.getElementById("botonTirar")
    botonTirar.classList.remove("d-none")

    var botonPasar = document.getElementById("botonPasar")
    botonPasar.classList.remove("d-none")

    mensaje("")

    puntosJugador = 0
    puntosMaquina = 0
    escribirPuntos("jugador", puntosJugador)
    escribirPuntos("maquina", puntosMaquina)
    borrarRegistro("maquina")
    borrarRegistro("jugador")
}

/**
 * Función que oculta todos los dados y solo muestra el dado elegido.
 */
function mostrarDado(dado) {
    var dado1 = document.getElementById("dado1")
    var dado2 = document.getElementById("dado2")
    var dado3 = document.getElementById("dado3")
    var dado4 = document.getElementById("dado4")
    var dado5 = document.getElementById("dado5")
    var dado6 = document.getElementById("dado6")

    dado1.classList.add("d-none")
    dado2.classList.add("d-none")
    dado3.classList.add("d-none")
    dado4.classList.add("d-none")
    dado5.classList.add("d-none")
    dado6.classList.add("d-none")

    if (dado == "1") {
        dado1.classList.remove("d-none")
    }
    else if (dado == "2") {
        dado2.classList.remove("d-none")
    }
    else if (dado == "3") {
        dado3.classList.remove("d-none")
    }
    else if (dado == "4") {
        dado4.classList.remove("d-none")
    }
    else if (dado == "5") {
        dado5.classList.remove("d-none")
    }
    else if (dado == "6") {
        dado6.classList.remove("d-none")
    }
}

/**
 * Función que muestra el mensaje en mitad de la pantalla.
 */
function mensaje(texto) {
    var divmensaje = document.getElementById("mensaje")
    divmensaje.innerText = texto
}

/**
 * Función que se ejecuta para que la máquina tire los dados.
 */
function tirarMaquina() {
    aleatorio = random(1, 6)
    puntosMaquina = puntosMaquina + aleatorio
    escribirPuntos("maquina", puntosMaquina)
    registro("maquina", "La maquina ha sacado: " + aleatorio + ", tiene un total de: " + puntosMaquina)
    if (puntosMaquina > maxPuntos) {
        gameOver("maquina")
    }
}

/**
 * Función que borra la tabla de registro de alguien.
 */
function borrarRegistro(quien) {
    if (quien == "maquina") {
        var table = document.getElementById("registroMaquina")
        var filas = table.rows.length -1
        for (contador = 0; contador < filas; contador = contador + 1) {
            table.deleteRow(1)
        }
    } else {
        var table = document.getElementById("registroJugador")
        var filas = table.rows.length -1
        for (contador = 0; contador < filas; contador = contador + 1) {
            table.deleteRow(1)
        }
    }
}

/**
 * Función que muestra los puntos de alguien.
 */
function escribirPuntos(quien, puntos) {
    var identificador
    if (quien == "maquina") {
        identificador = "PuntosMaquina"
    } else {
        identificador = "PuntosJugador"
    }
    var divPuntos = document.getElementById(identificador)
    divPuntos.innerText = "Puntos: " + puntos
}

/**
 * Función que añade un registro en la tabla de registros de alguien.
 */
function registro(quien, mensaje) {
    if (quien == "maquina") {
        var table = document.getElementById("registroMaquina")
        var row = table.insertRow(-1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        cell1.innerHTML = table.rows.length -1
        cell2.innerHTML = mensaje
    } else {
        var table = document.getElementById("registroJugador")
        var row = table.insertRow(-1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        cell1.innerHTML = table.rows.length -1
        cell2.innerHTML = mensaje
    }
}

function mostrarInfo(){
    alert("1. Este juego consiste en evitar superar los 20 puntos que es el máximo.\n2. Empieza el jugador.\n3. Hay difirentes botones los cuales hay 1 para TIRAR y otro para PASAR.\n4. Si el jugador y la máquina deciden pasar ambos ganará el que no supere 20 y más cerca esté.\n5. Al finalizar la partida se mostrará un botón para poder volver a jugar otra ronda.\n6. En los laterales se irá mostrando los registros de cada turno del jugador y la máquina.")
}