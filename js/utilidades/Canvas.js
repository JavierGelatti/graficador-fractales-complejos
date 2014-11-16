var utilidades = (function(utilidades) {

    utilidades.Canvas = function(canvas) {
        this._canvas = canvas;
        this._ctx    = canvas.getContext("2d");
        this._ancho  = canvas.width;
        this._alto   = canvas.height;
    };

    Object.defineProperties(utilidades.Canvas.prototype, {
        alto : {
            get : function() {
                return this._alto;
            },
            set : function(alto) {
                this._canvas.height = alto;
                this._alto = alto;
            }
        },
        ancho : {
            get : function() {
                return this._ancho;
            },
            set : function(ancho) {
                this._canvas.width = ancho;
                this._ancho = ancho;
            }
        },
        canvas : {
            get : function() {
                return this._canvas;
            }
        },
        limpiar : {
            value : function() {
                this._ctx.clearRect(0, 0, this._ancho, this._alto);
            }
        },
        dibujarPunto : {
            value : function(x, y, color) {
                if (color) {
                    this._ctx.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
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