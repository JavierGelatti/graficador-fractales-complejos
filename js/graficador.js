var canvasMandelbrot = document.getElementById("canvasMandelbrot");
var canvasJulia      = document.getElementById("canvasJulia");

var ancho = canvasMandelbrot.width;
var alto  = canvasMandelbrot.height;

var planoMandelbrot = new graficador.PlanoComplejo(ancho, alto);
var planoJulia      = new graficador.PlanoComplejo(ancho, alto);

var g = new dominio.NumeroComplejo(.2, .5);

var f = function(z, c) {
    return z.multiplicar(z).sumar(c);
};
var nroIteraciones = 100;

var conjuntoJulia = new dominio.ConjuntoJulia(f, nroIteraciones, g);
planoJulia.graficar(conjuntoJulia);

var conjuntoMandelbrot = new dominio.ConjuntoMandelbrot(f, nroIteraciones);
planoMandelbrot.graficar(conjuntoMandelbrot);

canvasJulia.getContext("2d").drawImage(planoJulia._capaFractal, 0, 0);
canvasMandelbrot.getContext("2d").drawImage(planoMandelbrot._capaFractal, 0, 0);
