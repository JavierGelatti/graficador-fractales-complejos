var canvasMandelbrot = new graficador.CanvasGraficador(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasGraficador(document.getElementById("canvasJulia"));

var coloreadorAzul  = new coloreadores.ColoreadorAzul();
var coloreadorRojo  = new coloreadores.ColoreadorRojo();

var checkMostrarPunto = document.getElementById("mostrarPunto");
var checkMostrarTrayectoria = document.getElementById("mostrarTrayectoria");

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
    }
};

canvasMandelbrot.addEventListener("click", seleccionarC);
canvasMandelbrot.addEventListener("mousemove", mostrarC);
canvasMandelbrot.addEventListener("mouseleave", redibujarMandel);

checkMostrarPunto.addEventListener("change", cambiarEstadoPunto);
checkMostrarTrayectoria.addEventListener("change", cambiarEstadoTrayectoria);
