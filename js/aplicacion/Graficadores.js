var aplicacion = (function(aplicacion) {

    class Graficador {
        constructor(canvas, plano, nroIteraciones) {
            this._canvas = canvas;
            this._plano = plano;
            this._nroIteraciones = nroIteraciones;
            this._escuchadoresCursorSobrePunto = [];
        }

        getComplejoPara(unPuntoEnElCanvas) {
            return this._plano.getComplejo(unPuntoEnElCanvas.x, unPuntoEnElCanvas.y);
        }

        redibujar() {
            this._canvas.limpiar();
            this._canvas.dibujar(this._plano.canvas);
        }

        hacerZoomEn(unPuntoEnElCanvas) {
            const c = this.getComplejoPara(unPuntoEnElCanvas);
            this._plano.hacerZoomEn(c);
            this._plano.graficar(this._conjunto);
            this.redibujar();
        }

        reiniciarZoom() {
            this._plano.reiniciarZoom();
            this._plano.graficar(this._conjunto);
            this.redibujar();
        }

        set conjunto(c) {
            this._conjunto = c;
            this._plano.graficar(this._conjunto);
        }

        get iteraciones() {
            return this._nroIteraciones;
        }

        set iteraciones(n) {
            this._nroIteraciones = n;
            this._conjunto.nroIteraciones = n;
            this._plano.graficar(this._conjunto);
            this.redibujar();
        }

        mostrarTrayectoria(unPuntoDelCanvas) {
            const c = this.getComplejoPara(unPuntoDelCanvas);
            const trayectoria = this._conjunto.getTrayectoria(c);
            this.redibujar();
            this._canvas.dibujar(this._plano.getCanvasTrayectoria(trayectoria));
        }

        cursorSobrePunto(unPuntoDelCanvas) {
            this._escuchadoresCursorSobrePunto.forEach(e => e(unPuntoDelCanvas, this));
        }

        agregarEscuchadorCursorSobrePunto(unEscuchador) {
            this._escuchadoresCursorSobrePunto.push(unEscuchador);
        }

        eliminarEscuchadorCursorSobrePunto(unEscuchador) {
            this._escuchadoresCursorSobrePunto = this._escuchadoresCursorSobrePunto.filter(e => e !== unEscuchador);
        }
    }

    class GraficadorJulia extends Graficador {
        redibujar() {
            super.redibujar();
            this._canvas.mostrarUbicacion(this._conjunto.c);
        }
    }

    class GraficadorMandelbrot extends Graficador {
        cursorSobrePunto(unPuntoDelCanvas) {
            const c = this.getComplejoPara(unPuntoDelCanvas);
            this.redibujar();
            this._canvas.mostrarUbicacion(c);
            super.cursorSobrePunto(unPuntoDelCanvas);
        }

        mostrarPunto(c) {
            const p = this._plano.getPunto(c);
            this._canvas.mostrarPunto(p);
        }
    }

    aplicacion.GraficadorJulia = GraficadorJulia;
    aplicacion.GraficadorMandelbrot = GraficadorMandelbrot;

    return aplicacion;
})(aplicacion || {});