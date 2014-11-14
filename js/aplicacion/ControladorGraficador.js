var aplicacion = (function(aplicacion) {

    var canvasMandelbrot,
        planoMandelbrot,
        canvasJulia,
        planoJulia;

    var ancho,
        alto;

    var conjuntoJulia,
        conjuntoMandelbrot;

    var nroIteraciones, f;

    aplicacion.ControladorGraficador = function(cnvsMandel, colorMandel, cnvsJulia, colorJulia, nroIter, fn) {
        canvasMandelbrot = cnvsMandel;
        canvasJulia = cnvsJulia;

        nroIteraciones = nroIter;
        f = fn;

        ancho = canvasMandelbrot.ancho;
        alto  = canvasMandelbrot.alto;

        planoMandelbrot = new graficador.PlanoComplejo(ancho, alto, colorMandel);
        planoJulia      = new graficador.PlanoComplejo(ancho, alto, colorJulia);
    };

    Object.defineProperties(aplicacion.ControladorGraficador.prototype, {
        seleccionarC : {
            value : function(c) {
                conjuntoJulia = new dominio.ConjuntoJulia(f, nroIteraciones, c);

                planoJulia.graficar(conjuntoJulia);
                canvasJulia.limpiar();
                canvasJulia.dibujar(planoJulia.canvas);
                canvasJulia.mostrarUbicacion(c);
            }
        },
        mostrarC : {
            value : function(c) {
                canvasMandelbrot.limpiar();
                canvasMandelbrot.dibujar(planoMandelbrot.canvas);
                canvasMandelbrot.mostrarUbicacion(c);
            }
        },
        graficarMandelbrot : {
            value : function() {
                conjuntoMandelbrot = new dominio.ConjuntoMandelbrot(f, nroIteraciones);
                planoMandelbrot.graficar(conjuntoMandelbrot);
                canvasMandelbrot.dibujar(planoMandelbrot.canvas);
            }
        },
        getPuntoMandelbrot : {
            value : function(x, y) {
                return planoMandelbrot.getPunto(x, y);
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
