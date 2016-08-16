var aplicacion = (function(aplicacion) {

    var txtRe, txtIm;
    var f;
    var cSeleccionado;
    var puntoVisibleEnMandelbrot = false;

    var graficadorJulia, graficadorMandelbrot;

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

        aplicacion.hacerDecorable(graficadorMandelbrot);
        graficadorMandelbrot.activarVistaPreviaJulia = function() {
            var planoVistaPJulia= new graficador.PlanoComplejo(130, 100, colorJulia);
            var idDecoracion = this.decorar('cursorSobrePunto', function(p, metodoOriginal) {
                metodoOriginal(p);
                var c = this.getComplejoPara(p);
                var conjuntoJulia = new dominio.ConjuntoJulia(f, 40, c);
                planoVistaPJulia.graficar(conjuntoJulia);
                canvasMandelbrot.dibujar(planoVistaPJulia.canvas);
            });

            this.desactivarVistaPreviaJulia = function() {
                this.eliminarDecoracion(idDecoracion);
                this.desactivarVistaPreviaJulia = function() {};
            };
        };
        graficadorMandelbrot.desactivarVistaPreviaJulia = function() {};
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
        cursorSobrePunto : {
            value : function(p) {
                graficadorMandelbrot.cursorSobrePunto(p);
                this._mostrarCSeleccionado();
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
        mostrarTrayectoria : {
            value : function(unPuntoEnElCanvas) {
                graficadorJulia.mostrarTrayectoria(unPuntoEnElCanvas);
                graficadorMandelbrot.mostrarTrayectoria(unPuntoEnElCanvas);
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
                graficadorMandelbrot.activarVistaPreviaJulia();
            }
        },
        ocultarVistaPreviaJulia : {
            value : function() {
                graficadorMandelbrot.desactivarVistaPreviaJulia();
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
