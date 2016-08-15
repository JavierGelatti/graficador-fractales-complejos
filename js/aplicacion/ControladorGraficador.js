var aplicacion = (function(aplicacion) {

    var canvasMandelbrot,
        planoMandelbrot,
        canvasJulia,
        planoJulia,
        planoVistaPJulia;

    var ancho,
        alto;


    var cSeleccionado;
    var txtRe, txtIm;

    var f;

    var iteracionesVPJulia = 40;

    var puntoVisible = false;
    var vistaPreviaJuliaVisible = false;

    var graficadorJulia, graficadorMandelbrot;

    var DecoradorVistaPreviaJulia = function() {

    };
    Object.defineProperties(DecoradorVistaPreviaJulia.prototype, {

    });

    aplicacion.ControladorGraficador = function(cnvsMandel, colorMandel, cnvsJulia, colorJulia, nroIter, fn, _txtRe, _txtIm) {
        canvasMandelbrot = cnvsMandel;
        canvasJulia = cnvsJulia;

        f = fn;

        ancho = canvasMandelbrot.ancho;
        alto  = canvasMandelbrot.alto;

        txtRe = _txtRe;
        txtIm = _txtIm;

        planoMandelbrot = new graficador.PlanoComplejo(ancho, alto, colorMandel);
        planoJulia      = new graficador.PlanoComplejo(ancho, alto, colorJulia);
        planoVistaPJulia= new graficador.PlanoComplejo(130, 100, colorJulia);

        graficadorJulia = new aplicacion.GraficadorJulia(canvasJulia, planoJulia, nroIter);
        graficadorMandelbrot = new aplicacion.GraficadorMandelbrot(canvasMandelbrot, planoMandelbrot, nroIter);
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
                if (!(c instanceof dominio.NumeroComplejo)) {
                    c = this._getComplejoMandelbrot(c);
                }

                cSeleccionado = c;

                // TODO
                graficadorJulia.conjunto = new dominio.ConjuntoJulia(f, graficadorJulia.iteraciones, c);

                this.redibujarMandelbrot();
                txtIm.value = c.im;
                txtRe.value = c.re;

                this.redibujarJulia();
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
                if (puntoVisible) {
                    var p = planoMandelbrot.getPunto(cSeleccionado);

                    canvasMandelbrot.mostrarPunto(p);
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
                //this.redibujarMandelbrot();
                //canvasMandelbrot.mostrarUbicacion(c);
                this._mostrarCSeleccionado();
                if (vistaPreviaJuliaVisible) {
                    var c = graficadorMandelbrot.getComplejoPara(p);
                    var conjuntoJulia = new dominio.ConjuntoJulia(f, iteracionesVPJulia, c);
                    planoVistaPJulia.graficar(conjuntoJulia);
                    canvasMandelbrot.dibujar(planoVistaPJulia.canvas);
                }
            }
        },
        mostrarPuntoSeleccionado : {
            value : function() {
                puntoVisible = true;
                this._mostrarCSeleccionado();
            }
        },
        ocultarPuntoSeleccionado : {
            value : function() {
                puntoVisible = false;
                this.redibujarMandelbrot();
            }
        },
        mostrarTrayectoria : {
            value : function(unPuntoEnElCanvas) {
                graficadorJulia.mostrarTrayectoria(unPuntoEnElCanvas);
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
                vistaPreviaJuliaVisible = true;
            }
        },
        ocultarVistaPreviaJulia : {
            value : function() {
                vistaPreviaJuliaVisible = false;
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
