var canvasMandelbrot = new graficador.CanvasGraficador(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasGraficador(document.getElementById("canvasJulia"));

var coloreadorAzul  = new coloreadores.ColoreadorAzul();
var coloreadorRojo  = new coloreadores.ColoreadorRojo();

var checkMostrarPunto = document.getElementById("mostrarPunto");

var nroIteraciones = 100;
var f = function(z, c) {
    return z.multiplicar(z).sumar(c);
};

var controlador = new aplicacion.ControladorGraficador(
    canvasMandelbrot, coloreadorRojo,
    canvasJulia     , coloreadorAzul,
    nroIteraciones  , f
);

var o = new dominio.NumeroComplejo(0, 0);
controlador.graficarMandelbrot();
controlador.mostrarC(o);
controlador.seleccionarC(o);

var obtenerPunto = function(evt) {
    var canvas = evt.target;
    var rect = canvas.getBoundingClientRect();
    return controlador.getPuntoMandelbrot(evt.clientX - rect.left -3, evt.clientY - rect.top);
};

var seleccionarC = function(evt) {
    controlador.seleccionarC(obtenerPunto(evt));
};

var mostrarC  = function(evt) {
    controlador.mostrarC(obtenerPunto(evt));
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

canvasMandelbrot.addEventListener("click", seleccionarC);
canvasMandelbrot.addEventListener("mousemove", mostrarC);
canvasMandelbrot.addEventListener("mouseleave", redibujarMandel);

checkMostrarPunto.addEventListener("change", cambiarEstadoPunto);
