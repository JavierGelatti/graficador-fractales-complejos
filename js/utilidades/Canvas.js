var utilidades = (function(utilidades) {

    utilidades.Canvas = function(canvas) {
        this._canvas = canvas;
        this._ctx    = canvas.getContext("2d");
    };

    Object.defineProperties(utilidades.Canvas.prototype, {
        alto : {
            get : function() {
                return this._canvas.height;
            },
            set : function(alto) {
                this._canvas.height = alto;
            }
        },
        ancho : {
            get : function() {
                return this._canvas.width;
            },
            set : function(ancho) {
                this._canvas.width = ancho;
            }
        },
        canvas : {
            get : function() {
                return this._canvas;
            }
        },
        limpiar : {
            value : function() {
                this._ctx.clearRect(0, 0, this.ancho, this.alto);
            }
        },
        dibujarPunto : {
            value : function(x, y, color) {
                if (color) {
                    this._ctx.fillStyle = color.rgb;
                }

                this._ctx.fillRect(x, y, 1, 1);
            }
        },
        dibujar : {
            value: function (imagen) {
                this._ctx.drawImage(imagen, 0, 0);
            }
        },
        addEventListener : {
            value : function(evento, manejador) {
                this.canvas.addEventListener(evento, manejador);
            }
        },
        removeEventListener : {
            value : function(evento, manejador) {
                this.canvas.removeEventListener(evento, manejador);
            }
        }
    });

    return utilidades;
})(utilidades || {});