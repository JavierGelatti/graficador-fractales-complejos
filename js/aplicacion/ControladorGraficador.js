var aplicacion = (function(aplicacion) {

    let txtRe, txtIm;
    let f;
    let cSeleccionado;
    let puntoVisibleEnMandelbrot = false;

    let graficadorJulia, graficadorMandelbrot;

    let mostrarVistaPreviaJulia, mostrarTrayectoria;

    class ControladorGraficador {
        constructor(canvasMandelbrot, colorMandel, canvasJulia, colorJulia, nroIter, fn, _txtRe, _txtIm) {
            txtRe = _txtRe;
            txtIm = _txtIm;
            f = fn;

            const ancho = canvasMandelbrot.ancho;
            const alto = canvasMandelbrot.alto;

            const planoJulia = new graficador.PlanoComplejo(ancho, alto, colorJulia);
            graficadorJulia = new aplicacion.GraficadorJulia(canvasJulia, planoJulia, nroIter);

            const planoMandelbrot = new graficador.PlanoComplejo(ancho, alto, colorMandel);
            planoMandelbrot.colorTrayectoria = 'red';
            graficadorMandelbrot = new aplicacion.GraficadorMandelbrot(canvasMandelbrot, planoMandelbrot, nroIter);

            const planoVistaPJulia = new graficador.PlanoComplejo(130, 100, colorJulia);
            mostrarVistaPreviaJulia = (p, graficador) => {
                const c = graficador.getComplejoPara(p);
                const conjuntoJulia = new dominio.ConjuntoJulia(f, 40, c);
                planoVistaPJulia.graficar(conjuntoJulia);
                graficador._canvas.dibujar(planoVistaPJulia.canvas);
            };

            mostrarTrayectoria = (p, graficador) => {
                graficador.mostrarTrayectoria(p);
            };
        }

        iniciarGraficador() {
            graficadorMandelbrot.conjunto = new dominio.ConjuntoMandelbrot(f, graficadorMandelbrot.iteraciones);

            const o = new dominio.NumeroComplejo(0, 0);
            this.seleccionarC(o);
        }

        seleccionarC(c) {
            this._actualizarCSeleccionado(c);

            graficadorJulia.conjunto = new dominio.ConjuntoJulia(f, graficadorJulia.iteraciones, cSeleccionado);
            txtIm.value = cSeleccionado.im;
            txtRe.value = cSeleccionado.re;

            this.redibujarMandelbrot();
            this.redibujarJulia();
        }

        _actualizarCSeleccionado(c) {
            cSeleccionado = !(c instanceof dominio.NumeroComplejo) ? this._getComplejoMandelbrot(c) : c;
        }

        _getComplejoMandelbrot(p) {
            return graficadorMandelbrot.getComplejoPara(p);
        }

        redibujarMandelbrot() {
            graficadorMandelbrot.redibujar();
            this._mostrarCSeleccionado();
        }

        _mostrarCSeleccionado() {
            if (puntoVisibleEnMandelbrot) {
                graficadorMandelbrot.mostrarPunto(cSeleccionado);
            }
        }

        redibujarJulia() {
            graficadorJulia.redibujar();
        }

        cursorSobreMandelbrot(p) {
            graficadorMandelbrot.cursorSobrePunto(p);
            this._mostrarCSeleccionado();
        }

        cursorSobreJulia(p) {
            graficadorJulia.cursorSobrePunto(p);
        }

        mostrarPuntoSeleccionado() {
            puntoVisibleEnMandelbrot = true;
            this._mostrarCSeleccionado();
        }

        ocultarPuntoSeleccionado() {
            puntoVisibleEnMandelbrot = false;
            this.redibujarMandelbrot();
        }

        mostrarTrayectoriaJulia() {
            graficadorJulia.agregarEscuchadorCursorSobrePunto(mostrarTrayectoria);
        }

        ocultarTrayectoriaJulia() {
            graficadorJulia.eliminarEscuchadorCursorSobrePunto(mostrarTrayectoria);
            this.redibujarJulia();
        }

        mostrarTrayectoriaMandelbrot() {
            graficadorMandelbrot.agregarEscuchadorCursorSobrePunto(mostrarTrayectoria);
        }

        ocultarTrayectoriaMandelbrot() {
            graficadorMandelbrot.eliminarEscuchadorCursorSobrePunto(mostrarTrayectoria);
            this.redibujarMandelbrot();
        }

        zoomMandelbrot(p) {
            graficadorMandelbrot.hacerZoomEn(p);
        }

        reiniciarZoomMandelbrot() {
            graficadorMandelbrot.reiniciarZoom();
            this._mostrarCSeleccionado();
        }

        zoomJulia(p) {
            graficadorJulia.hacerZoomEn(p);
        }

        reiniciarZoomJulia() {
            graficadorJulia.reiniciarZoom();
        }

        definirIteracionesMandelbrot(n) {
            graficadorMandelbrot.iteraciones = n;
        }

        definirIteracionesJulia(n) {
            graficadorJulia.iteraciones = n;
        }

        mostrarVistaPreviaJulia() {
            graficadorMandelbrot.agregarEscuchadorCursorSobrePunto(mostrarVistaPreviaJulia);
        }

        ocultarVistaPreviaJulia() {
            graficadorMandelbrot.eliminarEscuchadorCursorSobrePunto(mostrarVistaPreviaJulia);
        }
    }

    aplicacion.ControladorGraficador = ControladorGraficador;

    return aplicacion;
})(aplicacion || {});