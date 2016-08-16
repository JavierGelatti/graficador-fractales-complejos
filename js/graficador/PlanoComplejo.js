var graficador = (function(graficador) {

    graficador.PlanoComplejo = function(ancho, alto, coloreador) {
        this._capa = new utilidades.Canvas(document.createElement("canvas"));
        this._capaTrayectoria = new utilidades.Canvas(document.createElement("canvas"));
        this._capa.ancho = this._capaTrayectoria.ancho = ancho;
        this._capa.alto  = this._capaTrayectoria.alto  = alto;
        this._coloreador = coloreador;
        this._colorTrayectoria = 'blue';
    };

    Object.defineProperties(graficador.PlanoComplejo.prototype, {
        canvas : {
            get : function() {
                return this._capa.canvas;
            }
        },
        _definirDimensiones : {
            value : function(conjuntoComplejo) {
                var i_min = conjuntoComplejo.oy - 1.5;
                var i_max = conjuntoComplejo.oy + 1.5;

                var r_min = conjuntoComplejo.ox - 2;
                var r_max = conjuntoComplejo.ox + 2;

                var anchoPlano = (i_max-i_min) * this._capa.ancho/this._capa.alto;
                var r_med = (r_max + r_min)/2;

                this._r_min = r_med - anchoPlano/2;
                this._r_max = r_med + anchoPlano/2;

                this._i_min = i_min;
                this._i_max = i_max;
            }
        },
        _limpiar : {
            value : function() {
                this._capa.limpiar();
            }
        },
        _dibujarPunto : {
            value : function(x, y, datos) {
                var color;
                if (this._coloreador) {
                    color = this._coloreador.getColor(datos);
                }
                this._capa.dibujarPunto(x, y, color);
            }
        },
        graficar : {
            value : function(conjuntoComplejo) {
                var alto  = this._capa.alto;
                var ancho = this._capa.ancho;

                if (!this._r_min)
                    this._definirDimensiones(conjuntoComplejo);

                this._limpiar();

                for (var y = 0; y < alto; y++) {
                    var c_i = this._getIm(y);
                    for (var x = 0; x < ancho; x++) {
                        var c_r = this._getRe(x);

                        var c = new dominio.NumeroComplejo(c_r, c_i);
                        var datos = conjuntoComplejo.getDatos(c);

                        this._dibujarPunto(x, y, datos);
                    }
                }
            }
        },
        _getIm : {
            value : function(y) {
                return this._i_max + (this._i_min - this._i_max) * y / this._capa.alto;
            }
        },
        _getRe : {
            value : function(x) {
                return this._r_min + (this._r_max - this._r_min) * x / this._capa.ancho;
            }
        },
        getComplejo : {
            value : function(x, y) {
                var c_r = this._getRe(x);
                var c_i = this._getIm(y);

                return new dominio.NumeroComplejo(c_r, c_i);
            }
        },
        getPunto : {
            value : function(c) {
                var x = (c.re - this._r_min) / (this._r_max - this._r_min) * this._capa.ancho;
                var y = (c.im - this._i_max) / (this._i_min - this._i_max) * this._capa.alto;

                return {
                    x : x,
                    y : y
                };
            }
        },
        dibujarEn : {
            value : function(ctx) {
                ctx.drawImage(this._capa.canvas, 0, 0);
            }
        },
        colorTrayectoria : {
            set : function(unColor) {
                this._colorTrayectoria = unColor;
            }
        },
        getCanvasTrayectoria : {
            value : function(trayectoria) {
                this._capaTrayectoria.limpiar();
                var ctx = this._capaTrayectoria.canvas.getContext("2d");
                var n = trayectoria.length;

                ctx.lineWidth = 2;
                ctx.lineJoin = 'round';
                ctx.strokeStyle = this._colorTrayectoria;

                ctx.beginPath();
                for (var i = 0; i < n; i++) {
                    var p = this.getPunto(trayectoria[i]);
                    ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();

                return this._capaTrayectoria.canvas;
            }
        },
        hacerZoomEn : {
            value : function(centro) {
                var factorZoom = 4;

                var ancho = this._r_max - this._r_min;
                var alto  = this._i_min - this._i_max;

                this._r_min = centro.re - ancho/factorZoom;
                this._r_max = centro.re + ancho/factorZoom;
                this._i_max = centro.im - alto/factorZoom;
                this._i_min = centro.im + alto/factorZoom;
            }
        },
        reiniciarZoom : {
            value : function() {
                this._r_min = undefined;
            }
        }
    });

    return graficador;
})(graficador || {});