var aplicacion = (function(aplicacion) {

    var txtRe, txtIm;
    var f;
    var cSeleccionado;
    var puntoVisibleEnMandelbrot = false;

    var graficadorJulia, graficadorMandelbrot;

    var mostrarVistaPreviaJulia,
        mostrarTrayectoria;

    aplicacion.ControladorGraficador = function(canvasMandelbrot, colorMandel, canvasJulia, colorJulia, nroIter, fn, _txtRe, _txtIm) {
        txtRe = _txtRe;
        txtIm = _txtIm;
        f = fn;

        var ancho = canvasMandelbrot.ancho;
        var alto  = canvasMandelbrot.alto;

        var planoJulia  = new graficador.PlanoComplejo(ancho, alto, colorJulia);
        graficadorJulia = new aplicacion.GraficadorJulia(canvasJulia, planoJulia, nroIter);

        var planoMandelbrot  = new graficador.PlanoComplejo(ancho, alto, colorMandel);
        planoMandelbrot.colorTrayectoria = 'red';
        graficadorMandelbrot = new aplicacion.GraficadorMandelbrot(canvasMandelbrot, planoMandelbrot, nroIter);

        var planoVistaPJulia= new graficador.PlanoComplejo(130, 100, colorJulia);
        mostrarVistaPreviaJulia = function(p, graficador) {
            var c = graficador.getComplejoPara(p);
            var conjuntoJulia = new dominio.ConjuntoJulia(f, 40, c);
            planoVistaPJulia.graficar(conjuntoJulia);
            graficador._canvas.dibujar(planoVistaPJulia.canvas);
        };

        mostrarTrayectoria = function(p, graficador) {
            graficador.mostrarTrayectoria(p);
        }
    };


    Object.defineProperties(aplicacion.ControladorGraficador.prototype, {
        iniciarGraficador : {
            value : function() {
                graficadorMandelbrot.conjunto = new dominio.ConjuntoMandelbrot(f, graficadorMandelbrot.iteraciones);

                var o = new dominio.NumeroComplejo(0, 0);
                this.seleccionarC(o);
            }
        },
        seleccionarC : {
            value : function(c) {
                this._actualizarCSeleccionado(c);

                graficadorJulia.conjunto = new dominio.ConjuntoJulia(f, graficadorJulia.iteraciones, cSeleccionado);
                txtIm.value = cSeleccionado.im;
                txtRe.value = cSeleccionado.re;

                this.redibujarMandelbrot();
                this.redibujarJulia();
            }
        },
        _actualizarCSeleccionado : {
            value : function(c) {
                cSeleccionado = !(c instanceof dominio.NumeroComplejo) ? this._getComplejoMandelbrot(c) : c;
            }
        },
        _getComplejoMandelbrot : {
            value : function(p) {
                return graficadorMandelbrot.getComplejoPara(p);
            }
        },
        redibujarMandelbrot : {
            value : function() {
                graficadorMandelbrot.redibujar();
                this._mostrarCSeleccionado();
            }
        },
        _mostrarCSeleccionado : {
            value : function() {
                if (puntoVisibleEnMandelbrot) {
                    graficadorMandelbrot.mostrarPunto(cSeleccionado);
                }
            }
        },
        redibujarJulia : {
            value : function() {
                graficadorJulia.redibujar();
            }
        },
        cursorSobreMandelbrot : {
            value : function(p) {
                graficadorMandelbrot.cursorSobrePunto(p);
                this._mostrarCSeleccionado();
            }
        },
        cursorSobreJulia : {
            value : function(p) {
                graficadorJulia.cursorSobrePunto(p);
            }
        },
        mostrarPuntoSeleccionado : {
            value : function() {
                puntoVisibleEnMandelbrot = true;
                this._mostrarCSeleccionado();
            }
        },
        ocultarPuntoSeleccionado : {
            value : function() {
                puntoVisibleEnMandelbrot = false;
                this.redibujarMandelbrot();
            }
        },
        mostrarTrayectoriaJulia : {
            value : function() {
                graficadorJulia.agregarEscuchadorCursorSobrePunto(
                    mostrarTrayectoria
                );
            }
        },
        ocultarTrayectoriaJulia : {
            value : function() {
                graficadorJulia.eliminarEscuchadorCursorSobrePunto(
                    mostrarTrayectoria
                );
                this.redibujarJulia();
            }
        },
        mostrarTrayectoriaMandelbrot : {
            value : function() {
                graficadorMandelbrot.agregarEscuchadorCursorSobrePunto(
                    mostrarTrayectoria
                );
            }
        },
        ocultarTrayectoriaMandelbrot : {
            value : function() {
                graficadorMandelbrot.eliminarEscuchadorCursorSobrePunto(
                    mostrarTrayectoria
                );
                this.redibujarMandelbrot();
            }
        },
        zoomMandelbrot : {
            value : function(p) {
                graficadorMandelbrot.hacerZoomEn(p);
            }
        },
        reiniciarZoomMandelbrot : {
            value : function() {
                graficadorMandelbrot.reiniciarZoom();
                this._mostrarCSeleccionado();
            }
        },
        zoomJulia : {
            value : function(p) {
                graficadorJulia.hacerZoomEn(p);
            }
        },
        reiniciarZoomJulia : {
            value : function() {
                graficadorJulia.reiniciarZoom();
            }
        },
        definirIteracionesMandelbrot : {
            value : function(n) {
                graficadorMandelbrot.iteraciones = n;
            }
        },
        definirIteracionesJulia : {
            value : function(n) {
                graficadorJulia.iteraciones = n;
            }
        },
        mostrarVistaPreviaJulia : {
            value : function() {
                graficadorMandelbrot.agregarEscuchadorCursorSobrePunto(
                    mostrarVistaPreviaJulia
                );
            }
        },
        ocultarVistaPreviaJulia : {
            value : function() {
                graficadorMandelbrot.eliminarEscuchadorCursorSobrePunto(
                    mostrarVistaPreviaJulia
                );
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
