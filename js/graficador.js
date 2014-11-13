var canvasMandelbrot = new graficador.CanvasPlanoComplejo(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasPlanoComplejo(document.getElementById("canvasJulia"));

var ancho = canvasMandelbrot.ancho;
var alto  = canvasMandelbrot.alto;

var planoMandelbrot = new graficador.PlanoComplejo(ancho, alto);
var planoJulia      = new graficador.PlanoComplejo(ancho, alto);

var nroIteraciones = 100;
var f = function(z, c) {
    return z.multiplicar(z).sumar(c);
};

var conjuntoMandelbrot = new dominio.ConjuntoMandelbrot(f, nroIteraciones);
planoMandelbrot.graficar(conjuntoMandelbrot);
canvasMandelbrot.dibujar(planoMandelbrot.canvas);

var obtenerPunto = function(evt) {
    var canvas = evt.target;
    var rect = canvas.getBoundingClientRect();
    return planoMandelbrot.getPunto(evt.clientX - rect.left, evt.clientY - rect.top);
};

function graficarConjuntoJulia(c) {
    var conjuntoJulia = new dominio.ConjuntoJulia(f, nroIteraciones, c);

    planoJulia.graficar(conjuntoJulia);
    canvasJulia.limpiar();
    canvasJulia.dibujar(planoJulia.canvas);
    canvasJulia.mostrarUbicacion(c);
}

var actualizarC  = function(evt) {
    var c = obtenerPunto(evt);
    canvasMandelbrot.limpiar();
    canvasMandelbrot.dibujar(planoMandelbrot.canvas);
    canvasMandelbrot.mostrarUbicacion(c);
};

var seleccionarC = function(evt) {
    graficarConjuntoJulia(obtenerPunto(evt));
};

canvasMandelbrot.addEventListener("click", seleccionarC);
canvasMandelbrot.addEventListener("mousemove", actualizarC);