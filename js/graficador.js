var canvasMandelbrot = new graficador.CanvasPlanoComplejo(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasPlanoComplejo(document.getElementById("canvasJulia"));

var coloreadorAzul  = new coloreadores.ColoreadorAzul();
var coloreadorRojo  = new coloreadores.ColoreadorRojo();

var nroIteraciones = 100;
var f = function(z, c) {
    return z.multiplicar(z).sumar(c);
};

var controlador = new aplicacion.ControladorGraficador(
    canvasMandelbrot, coloreadorRojo,
    canvasJulia     , coloreadorAzul,
    nroIteraciones  , f
);

controlador.graficarMandelbrot();

var obtenerPunto = function(evt) {
    var canvas = evt.target;
    var rect = canvas.getBoundingClientRect();
    return controlador.getPuntoMandelbrot(evt.clientX - rect.left, evt.clientY - rect.top);
};


var mostrarC  = function(evt) {
    controlador.mostrarC(obtenerPunto(evt));
};

var seleccionarC = function(evt) {
    controlador.seleccionarC(obtenerPunto(evt));
};

canvasMandelbrot.addEventListener("click", seleccionarC);
canvasMandelbrot.addEventListener("mousemove", mostrarC);