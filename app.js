const d = document;
const textArea = d.querySelector(".form__input");
const mensajeAlerta = d.querySelector(".alert__msj");
const imagenEsperar = d.querySelector(".result__img");
const loaderPuntos = d.querySelector(".loader");
const tituloResultado = d.querySelector(".result__title");
const textoResultado = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelector(".form__btn--secundary");
const botonCopiar = d.querySelector(".result__btn");

const letrasEncriptadas = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Funcion para encriptar texto ingresado.
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    // Recorre cada letra del mensaje.
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let palabraEncriptada = letra;
        // Reemplaza la letra por su equivalente encriptada si existe.
        for (let j = 0; j < letrasEncriptadas.length; j++) {
            if (letra === letrasEncriptadas[j][0]) {
                palabraEncriptada = letrasEncriptadas[j][1];
                break;
            }
        }
        mensajeEncriptado += palabraEncriptada;
    }
    return mensajeEncriptado;
};

// Funcion para desencriptar el texto ingresado. 
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    // Recorre cada par de letras encriptadas y su equivalente normal.
    for (let i = 0; i < letrasEncriptadas.length; i++) {
        //* Utiliza una expresión regular para reemplazar las palabras encriptadas por sus letras originales.
        let regex = new RegExp(letrasEncriptadas[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, letrasEncriptadas[i][0]);
    }
    return mensajeDesencriptado;
};

// Funcion para validar el texto ingresado.
function validarTexto(texto) {
    const regex = /^[a-zñ\s]*$/; // Solo permite letras minúsculas y espacios.
    return regex.test(texto); // Devuelve true si el texto es válido.
};

// Funcion para manejar la validación del texto ingresado.
function manejarValidacion() {
    const texto = textArea.value;
    // Si el texto es válido, habilida los botones Encriptar y Desencriptar.
    if (validarTexto(texto)) {
        mensajeAlerta.classList.remove("highlight");
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    }
    // Si el texto no es válido, cambia el color del mensaje de aviso y deshabilita los botones.
    else {
        mensajeAlerta.classList.add("highlight");
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
    }
};

// Funciones para cambiar la imagen de espera
function mostrarImagenBotones() {
    imagenEsperar.style.display = "block";
    imagenEsperar.src = "assets/img/perrito-botones.png";
};

function mostrarImagenCopiar() {
    imagenEsperar.style.display ="block";
    imagenEsperar.src = "assets/img/perrito-copiar.png";
};

// Evento que se activa cuando se escribe en el área de texto.
textArea.addEventListener("input", (e) => {
    imagenEsperar.style.display = "none";
    loaderPuntos.classList.remove("hidden");
    tituloResultado.textContent = "Esperando mensaje...";
    textoResultado.textContent = "";
});

// Evento que se activa al clickear el boton Encriptar.
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    textoResultado.textContent = mensajeEncriptado;
    mostrarImagenBotones();
    loaderPuntos.classList.add("hidden");
    botonCopiar.classList.remove("hidden");
    tituloResultado.textContent = "Texto encriptado:";
});

// Evento que se activa al clickear el boton Desencriptar
botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    textoResultado.textContent = mensajeDesencriptado;
    mostrarImagenBotones();
    loaderPuntos.classList.add("hidden");
    botonCopiar.classList.remove("hidden");
    tituloResultado.textContent = "Texto desencriptado:";
});

// Evento que se activa al clickear el boton Copiar.
botonCopiar.addEventListener("click", (e) => {
    let textoCopiado = textoResultado.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        mostrarImagenCopiar();
        imagenEsperar.style.display = "block";
        loaderPuntos.classList.add("hidden");
        tituloResultado.textContent = "El texto fue copiado";
        botonCopiar.classList.add("hidden");
        textoResultado.textContent = "";
    })
});

// Agrega el evento de validación al área de texto.
textArea.addEventListener("input", manejarValidacion);
// Ejecuta la función de validación al cargar la página.
manejarValidacion();