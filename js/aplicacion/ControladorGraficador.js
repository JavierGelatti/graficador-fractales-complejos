var aplicacion = (function(aplicacion) {

    var canvasMandelbrot,
        planoMandelbrot,
        canvasJulia,
        planoJulia;

    var ancho,
        alto;

    var conjuntoJulia,
        conjuntoMandelbrot;

    var txtRe, txtIm;

    var nroIteracionesMandelbrot,
        nroIteracionesJulia,
        f;

    var puntoVisible = false;

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
    };

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
                canvasJulia.limpiar();
                canvasJulia.dibujar(planoJulia.canvas);
                canvasJulia.mostrarUbicacion(conjuntoJulia.c);
            }
        },
        mostrarUbicacionPunto : {
            value : function(p) {
                var c = this._getComplejoMandelbrot(p);
                this.redibujarMandelbrot();
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
            value : function(p) {
                var c = this._getComplejoJulia(p);
                var trayectoria = conjuntoJulia.getTrayectoria(c);
                this.redibujarJulia();
                canvasJulia.dibujar(planoJulia.getCanvasTrayectoria(trayectoria));
            }
        },
        _getComplejoJulia : {
            value : function(p) {
                return planoJulia.getComplejo(p.x, p.y);
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
                var c = this._getComplejoJulia(p);
                planoJulia.hacerZoomEn(c);
                planoJulia.graficar(conjuntoJulia);
                this.redibujarJulia();
            }
        },
        reiniciarZoomJulia : {
            value : function() {
                planoJulia.reiniciarZoom();
                planoJulia.graficar(conjuntoJulia);
                this.redibujarJulia();
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
                nroIteracionesJulia = n;
                conjuntoJulia.nroIteraciones = n;
                planoJulia.graficar(conjuntoJulia);
                this.redibujarJulia();
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
