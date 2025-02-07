import {Punto} from "../dominio/Punto";
import {CanvasGraficador} from "../graficador/CanvasGraficador";
import {PlanoComplejo} from "../graficador/PlanoComplejo";
import {ConjuntoComplejo, ConjuntoJulia, ConjuntoMandelbrot} from "../dominio/ConjuntoComplejo.ts";
import {NumeroComplejo} from "../dominio/NumeroComplejo.ts";

export class Graficador<Conjunto extends ConjuntoComplejo = ConjuntoComplejo> {
    protected _conjunto: Conjunto;
    protected _canvas: CanvasGraficador;
    protected _plano: PlanoComplejo;
    protected _nroIteraciones: number;
    private _escuchadoresCursorSobrePunto: ((p: Punto, graficador: Graficador) => void)[];

    constructor(canvas: CanvasGraficador, plano: PlanoComplejo, nroIteraciones: number, conjunto: Conjunto) {
        this._canvas = canvas;
        this._plano = plano;
        this._nroIteraciones = nroIteraciones;
        this._escuchadoresCursorSobrePunto = [];
        this._conjunto = conjunto;
        this._plano.graficar(this._conjunto);
    }

    set iteraciones(n: number) {
        this._nroIteraciones = n;
        this._conjunto.nroIteraciones = n;
        this._plano.graficar(this._conjunto);
        this.redibujar();
    }

    getComplejoPara(unPuntoEnElCanvas: Punto) {
        return this._plano.getComplejo(unPuntoEnElCanvas.x, unPuntoEnElCanvas.y);
    }

    redibujar() {
        this._canvas.limpiar();
        this._canvas.dibujar(this._plano.canvas);
    }

    hacerZoomEn(unPuntoEnElCanvas: Punto) {
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

    mostrarTrayectoria(unPuntoDelCanvas: Punto) {
        const c = this.getComplejoPara(unPuntoDelCanvas);
        const trayectoria = this._conjunto.getTrayectoria(c);
        this.redibujar();
        this._canvas.dibujar(this._plano.getCanvasTrayectoria(trayectoria));
    }

    cursorSobrePunto(unPuntoDelCanvas: Punto) {
        this._escuchadoresCursorSobrePunto.forEach(e => e(unPuntoDelCanvas, this));
    }

    agregarEscuchadorCursorSobrePunto(unEscuchador: (p: Punto, graficador: Graficador) => void) {
        this._escuchadoresCursorSobrePunto.push(unEscuchador);
    }

    eliminarEscuchadorCursorSobrePunto(unEscuchador: (p: Punto, graficador: Graficador) => void) {
        this._escuchadoresCursorSobrePunto = this._escuchadoresCursorSobrePunto.filter(e => e !== unEscuchador);
    }

    dibujar(plano: PlanoComplejo) {
        this._canvas.dibujar(plano.canvas);
    }
}

export class GraficadorJulia extends Graficador<ConjuntoJulia> {
    constructor(canvas: CanvasGraficador, plano: PlanoComplejo, nroIteraciones: number, f: (z: NumeroComplejo, c: NumeroComplejo) => NumeroComplejo) {
        super(canvas, plano, nroIteraciones, new ConjuntoJulia(f, nroIteraciones, new NumeroComplejo(0, 0)));
    }

    redibujar() {
        super.redibujar();
        this._canvas.mostrarUbicacion(this._conjunto.c);
    }

    cambiarConjunto(f: (z: NumeroComplejo, c: NumeroComplejo) => NumeroComplejo, c: NumeroComplejo) {
        this._conjunto = new ConjuntoJulia(f, this._nroIteraciones, c);
        this._plano.graficar(this._conjunto);
    }
}

export class GraficadorMandelbrot extends Graficador<ConjuntoMandelbrot> {
    constructor(canvas: CanvasGraficador, plano: PlanoComplejo, nroIteraciones: number, f: (z: NumeroComplejo, c: NumeroComplejo) => NumeroComplejo) {
        super(canvas, plano, nroIteraciones, new ConjuntoMandelbrot(f, nroIteraciones));
    }

    cursorSobrePunto(unPuntoDelCanvas: Punto) {
        const c = this.getComplejoPara(unPuntoDelCanvas);
        this.redibujar();
        this._canvas.mostrarUbicacion(c);
        super.cursorSobrePunto(unPuntoDelCanvas);
    }

    mostrarPunto(c: NumeroComplejo) {
        const p = this._plano.getPunto(c);
        this._canvas.mostrarPunto(p);
    }
}