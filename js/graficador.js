var canvasMandelbrot = new graficador.CanvasGraficador(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasGraficador(document.getElementById("canvasJulia"));

var coloreadorAzul  = new coloreadores.ColoreadorAzul();
var coloreadorRojo  = new coloreadores.ColoreadorRojo();

var checkMostrarPunto = document.getElementById("mostrarPunto");
var checkMostrarTrayectoria = document.getElementById("mostrarTrayectoria");

var txtRe = document.getElementById("re");
var txtIm = document.getElementById("im");
var frmC  = document.getElementById("cManual");
var btnC  = document.querySelector(".complejo > span");
var panelC= document.querySelector(".complejo");

var nroIteraciones = 100;
var f = function(z, c) {
    return z.multiplicar(z).sumar(c);
};

var controlador = new aplicacion.ControladorGraficador(
    canvasMandelbrot, coloreadorRojo,
    canvasJulia     , coloreadorAzul,
    nroIteraciones  , f,
    txtRe           , txtIm
);

var o = new dominio.NumeroComplejo(0, 0);
controlador.graficarMandelbrot();
controlador.mostrarC(o);
controlador.seleccionarC(o);

var obtenerPunto = function(evt) {
    var canvas = evt.target;
    var rect = canvas.getBoundingClientRect();
    return {
        x : evt.clientX - rect.left -3,
        y : evt.clientY - rect.top
    };
};

var obtenerPuntoMandel = function(evt) {
    return controlador.getPuntoMandelbrot(obtenerPunto(evt));
};

var obtenerPuntoJulia = function(evt) {
    return controlador.getPuntoJulia(obtenerPunto(evt));
};

var seleccionarC = function(evt) {
    controlador.seleccionarC(obtenerPuntoMandel(evt));
};

var mostrarC  = function(evt) {
    controlador.mostrarC(obtenerPuntoMandel(evt));
};

var redibujarMandel = function() {
    controlador.redibujarMandelbrot();
};

var cambiarEstadoPunto = function(evt) {
    if (evt.target.checked) {
        controlador.mostrarPuntoSeleccionado();
    } else {
        controlador.ocultarPuntoSeleccionado();
    }
};

var mostrarT = function(evt) {
    controlador.mostrarTrayectoria(obtenerPuntoJulia(evt));
};

var cambiarEstadoTrayectoria = function(evt) {
    if (evt.target.checked) {
        canvasJulia.addEventListener("mousemove", mostrarT);
    } else {
        canvasJulia.removeEventListener("mousemove", mostrarT);
        controlador.redibujarJulia();
    }
};

var seleccionarCManual = function(evt) {
    evt.preventDefault();
    if (!txtRe.checkValidity() || !txtIm.checkValidity()) {
        alert("Por favor, ingrese solo números");
        return false;
    }
    var re = parseFloat(txtRe.value);
    var im = parseFloat(txtIm.value);

    controlador.seleccionarC(new dominio.NumeroComplejo(re, im));
    return false;
};

var cambiarVisibilidadC = function() {
    panelC.classList.toggle("activado");
};

canvasMandelbrot.addEventListener("click", seleccionarC);
canvasMandelbrot.addEventListener("mousemove", mostrarC);
canvasMandelbrot.addEventListener("mouseleave", redibujarMandel);

checkMostrarPunto.addEventListener("change", cambiarEstadoPunto);
checkMostrarTrayectoria.addEventListener("change", cambiarEstadoTrayectoria);

frmC.addEventListener("submit", seleccionarCManual, true);
btnC.addEventListener("click", cambiarVisibilidadC, true);