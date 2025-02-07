import {PlanoComplejo} from "../graficador/PlanoComplejo";
import {Graficador, GraficadorJulia, GraficadorMandelbrot} from "./Graficadores";
import {ConjuntoJulia} from "../dominio/ConjuntoComplejo";
import {NumeroComplejo} from "../dominio/NumeroComplejo";
import {Coloreador} from "../coloreadores/Coloreador";
import {CanvasGraficador} from "../graficador/CanvasGraficador";
import {Punto} from "../dominio/Punto";

let txtRe: HTMLInputElement, txtIm: HTMLInputElement;
let f: (z: NumeroComplejo, c: NumeroComplejo) => NumeroComplejo;
let cSeleccionado: NumeroComplejo;
let puntoVisibleEnMandelbrot = false;

let graficadorJulia: GraficadorJulia, graficadorMandelbrot: GraficadorMandelbrot;

let mostrarVistaPreviaJulia: (p: Punto, graficador: Graficador) => void;
let mostrarTrayectoria: (p: Punto, graficador: Graficador) => void;

export class ControladorGraficador {
    constructor(
        canvasMandelbrot: CanvasGraficador,
        colorMandel: Coloreador,
        canvasJulia: CanvasGraficador,
        colorJulia: Coloreador,
        nroIter: number,
        fn: (z: NumeroComplejo, c: NumeroComplejo) => NumeroComplejo,
        _txtRe: HTMLInputElement,
        _txtIm: HTMLInputElement,
    ) {
        txtRe = _txtRe;
        txtIm = _txtIm;
        f = fn;

        const ancho = canvasMandelbrot.ancho;
        const alto = canvasMandelbrot.alto;

        const planoJulia = new PlanoComplejo(ancho, alto, colorJulia);
        graficadorJulia = new GraficadorJulia(canvasJulia, planoJulia, nroIter, f);

        const planoMandelbrot = new PlanoComplejo(ancho, alto, colorMandel);
        planoMandelbrot.colorTrayectoria = "red";
        graficadorMandelbrot = new GraficadorMandelbrot(canvasMandelbrot, planoMandelbrot, nroIter, f);

        const planoVistaPJulia = new PlanoComplejo(130, 100, colorJulia);
        mostrarVistaPreviaJulia = (p, graficador: Graficador) => {
            const c = graficador.getComplejoPara(p);
            const conjuntoJulia = new ConjuntoJulia(f, 40, c);
            planoVistaPJulia.graficar(conjuntoJulia);
            graficador.dibujar(planoVistaPJulia);
        };

        mostrarTrayectoria = (p, graficador) => graficador.mostrarTrayectoria(p);

        this.seleccionarC(new NumeroComplejo(0, 0));
    }

    seleccionarC(c: NumeroComplejo | Punto) {
        this._actualizarCSeleccionado(c);

        graficadorJulia.cambiarConjunto(f, cSeleccionado);
        txtIm.value = String(cSeleccionado.im);
        txtRe.value = String(cSeleccionado.re);

        this.redibujarMandelbrot();
        this.redibujarJulia();
    }

    _actualizarCSeleccionado(c: NumeroComplejo | Punto) {
        cSeleccionado = !(c instanceof NumeroComplejo) ? this._getComplejoMandelbrot(c) : c;
    }

    _getComplejoMandelbrot(p: Punto) {
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

    cursorSobreMandelbrot(p: Punto) {
        graficadorMandelbrot.cursorSobrePunto(p);
        this._mostrarCSeleccionado();
    }

    cursorSobreJulia(p: Punto) {
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

    zoomMandelbrot(p: Punto) {
        graficadorMandelbrot.hacerZoomEn(p);
    }

    reiniciarZoomMandelbrot() {
        graficadorMandelbrot.reiniciarZoom();
        this._mostrarCSeleccionado();
    }

    zoomJulia(p: Punto) {
        graficadorJulia.hacerZoomEn(p);
    }

    reiniciarZoomJulia() {
        graficadorJulia.reiniciarZoom();
    }

    definirIteracionesMandelbrot(n: number) {
        graficadorMandelbrot.iteraciones = n;
    }

    definirIteracionesJulia(n: number) {
        graficadorJulia.iteraciones = n;
    }

    mostrarVistaPreviaJulia() {
        graficadorMandelbrot.agregarEscuchadorCursorSobrePunto(mostrarVistaPreviaJulia);
    }

    ocultarVistaPreviaJulia() {
        graficadorMandelbrot.eliminarEscuchadorCursorSobrePunto(mostrarVistaPreviaJulia);
    }
}