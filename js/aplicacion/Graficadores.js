var aplicacion = (function(aplicacion) {

    var Graficador = function(canvas, plano, nroIteraciones) {
        this._canvas = canvas;
        this._plano = plano;
        this._nroIteraciones = nroIteraciones;
    };
    Object.defineProperties(Graficador.prototype, {
        getComplejoPara : {
            value : function(unPuntoEnElCanvas) {
                return this._plano.getComplejo(unPuntoEnElCanvas.x, unPuntoEnElCanvas.y);
            }
        },
        redibujar : {
            value : function() {
                this._canvas.limpiar();
                this._canvas.dibujar(this._plano.canvas);
            }
        },
        hacerZoomEn : {
            value : function(unPuntoEnElCanvas) {
                var c = this.getComplejoPara(unPuntoEnElCanvas);
                this._plano.hacerZoomEn(c);
                this._plano.graficar(this._conjunto);
                this.redibujar();
            }
        },
        reiniciarZoom : {
            value : function() {
                this._plano.reiniciarZoom();
                this._plano.graficar(this._conjunto);
                this.redibujar();
            }
        },
        conjunto : {
            set : function(c) {
                this._conjunto = c;
                this._plano.graficar(this._conjunto);
            }
        },
        iteraciones : {
            get : function() {
                return this._nroIteraciones;
            },
            set : function(n) {
                this._nroIteraciones = n;
                this._conjunto.nroIteraciones = n;
                this._plano.graficar(this._conjunto);
                this.redibujar();
            }
        }
    });

    aplicacion.GraficadorJulia = function(canvas, plano, nroIteraciones) {
        Graficador.call(this, canvas, plano, nroIteraciones);
    };
    aplicacion.GraficadorJulia.prototype = Object.create(Graficador.prototype, {
        redibujar : {
            value : function() {
                Graficador.prototype.redibujar.call(this);
                this._canvas.mostrarUbicacion(this._conjunto.c);
            }
        },
        mostrarTrayectoria : {
            value : function(unPuntoDelCanvas) {
                var c = this.getComplejoPara(unPuntoDelCanvas);
                var trayectoria = this._conjunto.getTrayectoria(c);
                this.redibujar();
                this._canvas.dibujar(this._plano.getCanvasTrayectoria(trayectoria));
            }
        }
    });

    aplicacion.GraficadorMandelbrot = function(canvas, plano, nroIteraciones) {
        Graficador.call(this, canvas, plano, nroIteraciones);
    };
    aplicacion.GraficadorMandelbrot.prototype = Object.create(Graficador.prototype, {
        cursorSobrePunto : {
            value : function(unPuntoDelCanvas) {
                var c = this.getComplejoPara(unPuntoDelCanvas);
                this.redibujar();
                this._canvas.mostrarUbicacion(c);
            }
        },
        mostrarPunto : {
            value : function(c) {
                var p = this._plano.getPunto(c);
                this._canvas.mostrarPunto(p);
            }
        }
    });

    return aplicacion;
})(aplicacion || {});
