var canvasMandelbrot = new graficador.CanvasGraficador(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasGraficador(document.getElementById("canvasJulia"));

var coloreadorAzul  = new coloreadores.ColoreadorAzul();
var coloreadorRojo  = new coloreadores.ColoreadorRojo();

var checkMostrarPunto       = document.getElementById("mostrarPunto");
var checkMostrarTrayectoria = document.getElementById("mostrarTrayectoria");

var btnZoomMandel  = document.querySelector("#wrapper > section.mandelbrot > h2 > span.zoom");
var btnResetMandel = document.querySelector("#wrapper > section.mandelbrot > h2 > span.reiniciar");
var btnZoomJulia   = document.querySelector("#wrapper > section.julia > h2 > span.zoom");
var btnResetJulia  = document.querySelector("#wrapper > section.julia > h2 > span.reiniciar");

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
controlador.iniciarGraficador();

var obtenerPunto = function(evt) {
    var canvas = evt.target;
    var rect = canvas.getBoundingClientRect();
    return {
        x : evt.clientX - rect.left -3,
        y : evt.clientY - rect.top
    };
};

var seleccionarC = function(evt) {
    controlador.seleccionarC(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("click", seleccionarC);

var mostrarC  = function(evt) {
    controlador.mostrarUbicacionPunto(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("mousemove", mostrarC);

var redibujarMandel = function() {
    controlador.redibujarMandelbrot();
};
canvasMandelbrot.addEventListener("mouseleave", redibujarMandel);

var cambiarEstadoMostrarPuntoSeleccionado = function(evt) {
    if (evt.target.checked) {
        controlador.mostrarPuntoSeleccionado();
    } else {
        controlador.ocultarPuntoSeleccionado();
    }
};
checkMostrarPunto.addEventListener("change", cambiarEstadoMostrarPuntoSeleccionado);

var mostrarTrayectoria = function(evt) {
    controlador.mostrarTrayectoria(obtenerPunto(evt));
};
var cambiarEstadoMostrarTrayectoria = function(evt) {
    if (evt.target.checked) {
        canvasJulia.addEventListener("mousemove", mostrarTrayectoria);
    } else {
        canvasJulia.removeEventListener("mousemove", mostrarTrayectoria);
        controlador.redibujarJulia();
    }
};
checkMostrarTrayectoria.addEventListener("change", cambiarEstadoMostrarTrayectoria);

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
frmC.addEventListener("submit", seleccionarCManual, true);

var cambiarVisibilidadPanelIngresoC = function() {
    panelC.classList.toggle("activado");
};
btnC.addEventListener("click", cambiarVisibilidadPanelIngresoC, true);

var comando = function(fn, args) {
    return function() {
        fn.apply(this, args);
    };
};
var activarZoom = function(canvas, btnZoom, fnAntes, fnZoom) {
    canvas.removeEventListener("click", fnAntes, true);
    canvas.addEventListener("click", fnZoom, true);
    canvas.classList.add("zoomActivado");

    btnZoom.onclick = comando(desactivarZoom, arguments);
    btnZoom.classList.add("activado");
};
var desactivarZoom = function(canvas, btnZoom, fnAntes, fnZoom) {
    canvas.addEventListener("click", fnAntes, true);
    canvas.removeEventListener("click", fnZoom, true);
    canvas.classList.remove("zoomActivado");

    btnZoom.onclick = comando(activarZoom, arguments);
    btnZoom.classList.remove("activado");
};

var zoomMandel = function(evt) {
    controlador.zoomMandelbrot(obtenerPunto(evt));
};
var activarZoomMandel = function() {
    activarZoom(canvasMandelbrot.canvas, btnZoomMandel, seleccionarC, zoomMandel);
};
btnZoomMandel.onclick = activarZoomMandel;

var reiniciarZoomMandel = function() {
    controlador.reiniciarZoomMandelbrot();
};
btnResetMandel.addEventListener("click", reiniciarZoomMandel, true);

var zoomJulia = function(evt) {
    controlador.zoomJulia(obtenerPunto(evt));
};
var activarZoomJulia = function() {
    activarZoom(canvasJulia.canvas, btnZoomJulia, undefined, zoomJulia);
};
btnZoomJulia.onclick = activarZoomJulia;

var reiniciarZoomJulia = function() {
    controlador.reiniciarZoomJulia();
};
btnResetJulia.addEventListener("click", reiniciarZoomJulia, true);
