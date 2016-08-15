var aplicacion = (function(aplicacion) {

    var canvasMandelbrot,
        planoMandelbrot,
        canvasJulia,
        planoJulia,
        planoVistaPJulia;

    var ancho,
        alto;

    var conjuntoJulia,
        conjuntoMandelbrot;

    var txtRe, txtIm;

    var nroIteracionesMandelbrot,
        nroIteracionesJulia,
        f;

    var iteracionesVPJulia = 40;

    var puntoVisible = false;
    var vistaPreviaJuliaVisible = false;

    var graficadorJulia;

    aplicacion.ControladorGraficador = function(cnvsMandel, colorMandel, cnvsJulia, colorJulia, nroIter, fn, _txtRe, _txtIm) {
        canvasMandelbrot = cnvsMandel;
        canvasJulia = cnvsJulia;

        nroIteracionesMandelbrot = nroIteracionesJulia = nroIter;
        f = fn;

        ancho = canvasMandelbrot.ancho;
        alto  = canvasMandelbrot.alto;

        txtRe = _txtRe;
        txtIm = _txtIm;

        planoMandelbrot = new graficador.PlanoComplejo(ancho, alto, colorMandel);
        planoJulia      = new graficador.PlanoComplejo(ancho, alto, colorJulia);
        planoVistaPJulia= new graficador.PlanoComplejo(130, 100, colorJulia);

        graficadorJulia = new aplicacion.GraficadorJulia(canvasJulia, planoJulia);
    };

    aplicacion.GraficadorJulia = function(canvas, plano) {
        this._canvas = canvas;
        this._plano = plano;
    };
    Object.defineProperties(aplicacion.GraficadorJulia.prototype, {
        redibujar : {
            value : function() {
                this._canvas.limpiar();
                this._canvas.dibujar(this._plano.canvas);
                this._canvas.mostrarUbicacion(conjuntoJulia.c);
            }
        },
        getComplejoPara : {
            value : function(unPuntoEnElCanvas) {
                return this._plano.getComplejo(unPuntoEnElCanvas.x, unPuntoEnElCanvas.y);
            }
        },
        mostrarTrayectoria : {
            value : function(unPuntoEnElCanvas) {
                var c = this.getComplejoPara(unPuntoEnElCanvas);
                var trayectoria = conjuntoJulia.getTrayectoria(c);
                this.redibujar();
                this._canvas.dibujar(this._plano.getCanvasTrayectoria(trayectoria));
            }
        },
        hacerZoomEn : {
            value : function(unPuntoEnElCanvas) {
                var c = this.getComplejoPara(unPuntoEnElCanvas);
                this._plano.hacerZoomEn(c);
                this._plano.graficar(conjuntoJulia);
                this.redibujar();
            }
        },
        reiniciarZoom : {
            value : function() {
                this._plano.reiniciarZoom();
                this._plano.graficar(conjuntoJulia);
                this.redibujar();
            }
        },
        iteraciones : {
            set : function(n) {
                nroIteracionesJulia = n;
                conjuntoJulia.nroIteraciones = n;
                this._plano.graficar(conjuntoJulia);
                this.redibujar();
            }
        }
    });

    Object.defineProperties(aplicacion.ControladorGraficador.prototype, {
        iniciarGraficador : {
            value : function() {
                conjuntoMandelbrot = new dominio.ConjuntoMandelbrot(f, nroIteracionesMandelbrot);
                planoMandelbrot.graficar(conjuntoMandelbrot);

                var o = new dominio.NumeroComplejo(0, 0);
                this.seleccionarC(o);
            }
        },
        seleccionarC : {
            value : function(c) {
                if (!(c instanceof dominio.NumeroComplejo)) {
                    c = this._getComplejoMandelbrot(c);
                }

                conjuntoJulia = new dominio.ConjuntoJulia(f, nroIteracionesJulia, c);
                this.redibujarMandelbrot();
                txtIm.value = c.im;
                txtRe.value = c.re;
                planoJulia.graficar(conjuntoJulia);

                this.redibujarJulia();
            }
        },
        _getComplejoMandelbrot : {
            value : function(p) {
                return planoMandelbrot.getComplejo(p.x, p.y);
            }
        },
        redibujarMandelbrot : {
            value : function() {
                canvasMandelbrot.limpiar();
                canvasMandelbrot.dibujar(planoMandelbrot.canvas);
                this._mostrarCSeleccionado();
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
        redibujarJulia : {
            value : function() {
                graficadorJulia.redibujar();
            }
        },
        mostrarUbicacionPunto : {
            value : function(p) {
                var c = this._getComplejoMandelbrot(p);
                this.redibujarMandelbrot();
                if (vistaPreviaJuliaVisible) {
                    var conjuntoJulia = new dominio.ConjuntoJulia(f, iteracionesVPJulia, c);
                    planoVistaPJulia.graficar(conjuntoJulia);
                    canvasMandelbrot.dibujar(planoVistaPJulia.canvas);
                }
                canvasMandelbrot.mostrarUbicacion(c);
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
                var c = this._getComplejoMandelbrot(p);
                planoMandelbrot.hacerZoomEn(c);
                planoMandelbrot.graficar(conjuntoMandelbrot);
                this.redibujarMandelbrot();
            }
        },
        reiniciarZoomMandelbrot : {
            value : function() {
                planoMandelbrot.reiniciarZoom();
                planoMandelbrot.graficar(conjuntoMandelbrot);
                this.redibujarMandelbrot();
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
                nroIteracionesMandelbrot = n;
                conjuntoMandelbrot.nroIteraciones = n;
                planoMandelbrot.graficar(conjuntoMandelbrot);
                this.redibujarMandelbrot();
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
