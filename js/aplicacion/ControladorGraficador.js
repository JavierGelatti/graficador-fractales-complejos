import { PlanoComplejo } from "../graficador/PlanoComplejo";
import { GraficadorJulia, GraficadorMandelbrot } from "./Graficadores";
import { ConjuntoJulia, ConjuntoMandelbrot } from "../dominio/ConjuntoComplejo";
import { NumeroComplejo } from "../dominio/NumeroComplejo";

let txtRe, txtIm;
let f;
let cSeleccionado;
let puntoVisibleEnMandelbrot = false;

let graficadorJulia, graficadorMandelbrot;

let mostrarVistaPreviaJulia, mostrarTrayectoria;

export class ControladorGraficador {
    constructor(canvasMandelbrot, colorMandel, canvasJulia, colorJulia, nroIter, fn, _txtRe, _txtIm) {
        txtRe = _txtRe;
        txtIm = _txtIm;
        f = fn;

        const ancho = canvasMandelbrot.ancho;
        const alto = canvasMandelbrot.alto;

        const planoJulia = new PlanoComplejo(ancho, alto, colorJulia);
        graficadorJulia = new GraficadorJulia(canvasJulia, planoJulia, nroIter);

        const planoMandelbrot = new PlanoComplejo(ancho, alto, colorMandel);
        planoMandelbrot.colorTrayectoria = 'red';
        graficadorMandelbrot = new GraficadorMandelbrot(canvasMandelbrot, planoMandelbrot, nroIter);

        const planoVistaPJulia = new PlanoComplejo(130, 100, colorJulia);
        mostrarVistaPreviaJulia = (p, graficador) => {
            const c = graficador.getComplejoPara(p);
            const conjuntoJulia = new ConjuntoJulia(f, 40, c);
            planoVistaPJulia.graficar(conjuntoJulia);
            graficador._canvas.dibujar(planoVistaPJulia.canvas);
        };

        mostrarTrayectoria = (p, graficador) => {
            graficador.mostrarTrayectoria(p);
        };
    }

    iniciarGraficador() {
        graficadorMandelbrot.conjunto = new ConjuntoMandelbrot(f, graficadorMandelbrot.iteraciones);

        const o = new NumeroComplejo(0, 0);
        this.seleccionarC(o);
    }

    seleccionarC(c) {
        this._actualizarCSeleccionado(c);

        graficadorJulia.conjunto = new ConjuntoJulia(f, graficadorJulia.iteraciones, cSeleccionado);
        txtIm.value = cSeleccionado.im;
        txtRe.value = cSeleccionado.re;

        this.redibujarMandelbrot();
        this.redibujarJulia();
    }

    _actualizarCSeleccionado(c) {
        cSeleccionado = !(c instanceof NumeroComplejo) ? this._getComplejoMandelbrot(c) : c;
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