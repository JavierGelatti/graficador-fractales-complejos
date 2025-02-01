import { Canvas } from "../utilidades/Canvas";
import { NumeroComplejo } from "../dominio/NumeroComplejo";

export class PlanoComplejo {
    constructor(ancho, alto, coloreador) {
        this._capa = new Canvas(document.createElement("canvas"));
        this._capaTrayectoria = new Canvas(document.createElement("canvas"));
        this._capa.ancho = this._capaTrayectoria.ancho = ancho;
        this._capa.alto = this._capaTrayectoria.alto = alto;
        this._coloreador = coloreador;
        this._colorTrayectoria = 'blue';
    }

    get canvas() {
        return this._capa.canvas;
    }

    _definirDimensiones(conjuntoComplejo) {
        const i_min = conjuntoComplejo.oy - 1.5;
        const i_max = conjuntoComplejo.oy + 1.5;

        const r_min = conjuntoComplejo.ox - 2;
        const r_max = conjuntoComplejo.ox + 2;

        const anchoPlano = (i_max - i_min) * this._capa.ancho / this._capa.alto;
        const r_med = (r_max + r_min) / 2;

        this._r_min = r_med - anchoPlano / 2;
        this._r_max = r_med + anchoPlano / 2;

        this._i_min = i_min;
        this._i_max = i_max;
    }

    _limpiar() {
        this._capa.limpiar();
    }

    _dibujarPunto(x, y, datos) {
        const color = this._coloreador?.getColor(datos);
        this._capa.dibujarPunto(x, y, color);
    }

    graficar(conjuntoComplejo) {
        const alto = this._capa.alto;
        const ancho = this._capa.ancho;

        if (!this._r_min) this._definirDimensiones(conjuntoComplejo);

        this._limpiar();

        for (let y = 0; y < alto; y++) {
            const c_i = this._getIm(y);
            for (let x = 0; x < ancho; x++) {
                const c_r = this._getRe(x);
                const c = new NumeroComplejo(c_r, c_i);
                const datos = conjuntoComplejo.getDatos(c);
                this._dibujarPunto(x, y, datos);
            }
        }
    }

    _getIm(y) {
        return this._i_max + (this._i_min - this._i_max) * y / this._capa.alto;
    }

    _getRe(x) {
        return this._r_min + (this._r_max - this._r_min) * x / this._capa.ancho;
    }

    getComplejo(x, y) {
        const c_r = this._getRe(x);
        const c_i = this._getIm(y);
        return new NumeroComplejo(c_r, c_i);
    }

    getPunto(c) {
        const x = (c.re - this._r_min) / (this._r_max - this._r_min) * this._capa.ancho;
        const y = (c.im - this._i_max) / (this._i_min - this._i_max) * this._capa.alto;
        return { x, y };
    }

    dibujarEn(ctx) {
        ctx.drawImage(this._capa.canvas, 0, 0);
    }

    set colorTrayectoria(unColor) {
        this._colorTrayectoria = unColor;
    }

    getCanvasTrayectoria(trayectoria) {
        this._capaTrayectoria.limpiar();
        const ctx = this._capaTrayectoria.canvas.getContext("2d");
        const n = trayectoria.length;

        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = this._colorTrayectoria;

        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const p = this.getPunto(trayectoria[i]);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        return this._capaTrayectoria.canvas;
    }

    hacerZoomEn(centro) {
        const factorZoom = 4;

        const ancho = this._r_max - this._r_min;
        const alto = this._i_min - this._i_max;

        this._r_min = centro.re - ancho / factorZoom;
        this._r_max = centro.re + ancho / factorZoom;
        this._i_max = centro.im - alto / factorZoom;
        this._i_min = centro.im + alto / factorZoom;
    }

    reiniciarZoom() {
        this._r_min = undefined;
    }
}