var utilidades = (function(utilidades) {

    class Canvas {
        constructor(canvas) {
            this._canvas = canvas;
            this._ctx = canvas.getContext("2d");
        }

        get alto() {
            return this._canvas.height;
        }

        set alto(alto) {
            this._canvas.height = alto;
        }

        get ancho() {
            return this._canvas.width;
        }

        set ancho(ancho) {
            this._canvas.width = ancho;
        }

        get canvas() {
            return this._canvas;
        }

        limpiar() {
            this._ctx.clearRect(0, 0, this.ancho, this.alto);
        }

        dibujarPunto(x, y, color) {
            if (color) {
                this._ctx.fillStyle = color.rgb;
            }
            this._ctx.fillRect(x, y, 1, 1);
        }

        dibujar(imagen) {
            this._ctx.drawImage(imagen, 0, 0);
        }

        addEventListener(evento, manejador) {
            this.canvas.addEventListener(evento, manejador);
        }

        removeEventListener(evento, manejador) {
            this.canvas.removeEventListener(evento, manejador);
        }
    }

    utilidades.Canvas = Canvas;

    return utilidades;
})(utilidades || {});