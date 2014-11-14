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

    var puntoVisible = false;

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
                this.redibujarMandelbrot();
                planoJulia.graficar(conjuntoJulia);

                this.redibujarJulia(c);
            }
        },
        _mostrarCSeleccionado : {
            value : function() {
                if (puntoVisible) {
                    var c = conjuntoJulia.c;
                    var p = planoMandelbrot.getPunto(c);

                    canvasMandelbrot.mostrarPunto(p);
                }
            }
        },
        mostrarC : {
            value : function(c) {
                this.redibujarMandelbrot();
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
            value : function(p) {
                return planoMandelbrot.getComplejo(p.x, p.y);
            }
        },
        getPuntoJulia : {
            value : function(p) {
                return planoJulia.getComplejo(p.x, p.y);
            }
        },
        mostrarPuntoSeleccionado : {
            value : function() {
                puntoVisible = true;
                var c = conjuntoJulia.c;
                var p = planoMandelbrot.getPunto(c);

                canvasMandelbrot.mostrarPunto(p);
            }
        },
        ocultarPuntoSeleccionado : {
            value : function() {
                puntoVisible = false;
                this.redibujarMandelbrot();
            }
        },
        redibujarMandelbrot : {
            value : function() {
                canvasMandelbrot.limpiar();
                canvasMandelbrot.dibujar(planoMandelbrot.canvas);
                this._mostrarCSeleccionado();
            }
        },
        redibujarJulia : {
            value : function(c) {
                canvasJulia.limpiar();
                canvasJulia.dibujar(planoJulia.canvas);
                canvasJulia.mostrarUbicacion(c);
            }
        },
        mostrarTrayectoria : {
            value : function(c) {
                this.redibujarJulia(conjuntoJulia.c);
                var trayectoria = conjuntoJulia.getTrayectoria(c);
                canvasJulia.dibujar(planoJulia.getCanvasTrayectoria(trayectoria));
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
