import {Punto} from "../dominio/Punto";
import {CanvasGraficador} from "../graficador/CanvasGraficador";
import {PlanoComplejo} from "../graficador/PlanoComplejo";
import {ConjuntoComplejo} from "../dominio/ConjuntoComplejo.ts";
import {NumeroComplejo} from "../dominio/NumeroComplejo.ts";

export class Graficador {
    protected _canvas: CanvasGraficador;
    protected _plano: PlanoComplejo;
    private _nroIteraciones: number;
    private _escuchadoresCursorSobrePunto: ((p: Punto, graficador: Graficador) => void)[];

    constructor(canvas: CanvasGraficador, plano: PlanoComplejo, nroIteraciones: number) {
        this._canvas = canvas;
        this._plano = plano;
        this._nroIteraciones = nroIteraciones;
        this._escuchadoresCursorSobrePunto = [];
    }

    protected _conjunto: ConjuntoComplejo;

    set conjunto(c: ConjuntoComplejo) {
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
}

export class GraficadorJulia extends Graficador {
    redibujar() {
        super.redibujar();
        this._canvas.mostrarUbicacion(this._conjunto.c);
    }
}

export class GraficadorMandelbrot extends Graficador {
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