import {Canvas} from "../utilidades/Canvas";
import {NumeroComplejo} from "../dominio/NumeroComplejo";
import {Coloreador, Datos} from "../coloreadores/Coloreador";
import {ConjuntoComplejo} from "../dominio/ConjuntoComplejo";

export class PlanoComplejo {
    private _capa: Canvas;
    private _capaTrayectoria: Canvas;
    private _coloreador: Coloreador;

    private _extension: { r_min: number; r_max: number, i_min: number, i_max: number } | undefined;
    private get _r_min() { return this._extension!.r_min; }
    private get _r_max() { return this._extension!.r_max; }
    private get _i_min() { return this._extension!.i_min; }
    private get _i_max() { return this._extension!.i_max; }

    constructor(ancho: number, alto: number, coloreador: Coloreador) {
        this._capa = new Canvas(document.createElement("canvas"));
        this._capaTrayectoria = new Canvas(document.createElement("canvas"));
        this._capa.ancho = this._capaTrayectoria.ancho = ancho;
        this._capa.alto = this._capaTrayectoria.alto = alto;
        this._coloreador = coloreador;
        this._colorTrayectoria = "blue";
    }

    private _colorTrayectoria: string;

    set colorTrayectoria(unColor: string) {
        this._colorTrayectoria = unColor;
    }

    get canvas() {
        return this._capa.canvas;
    }

    _definirDimensiones(conjuntoComplejo: ConjuntoComplejo) {
        const i_min = conjuntoComplejo.oy - 1.5;
        const i_max = conjuntoComplejo.oy + 1.5;

        const r_min = conjuntoComplejo.ox - 2;
        const r_max = conjuntoComplejo.ox + 2;

        const anchoPlano = (i_max - i_min) * this._capa.ancho / this._capa.alto;
        const r_med = (r_max + r_min) / 2;

        this._extension = {
            r_min: r_med - anchoPlano / 2,
            r_max: r_med + anchoPlano / 2,
            i_min: i_min,
            i_max: i_max,
        }
    }

    _limpiar() {
        this._capa.limpiar();
    }

    _dibujarPunto(x: number, y: number, datos: Datos) {
        const color = this._coloreador?.getColor(datos);
        this._capa.dibujarPunto(x, y, color);
    }

    graficar(conjuntoComplejo: ConjuntoComplejo) {
        const alto = this._capa.alto;
        const ancho = this._capa.ancho;

        if (this._extension === undefined) this._definirDimensiones(conjuntoComplejo);

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

    _getIm(y: number) {
        return this._i_max + (this._i_min - this._i_max) * y / this._capa.alto;
    }

    _getRe(x: number) {
        return this._r_min + (this._r_max - this._r_min) * x / this._capa.ancho;
    }

    getComplejo(x: number, y: number) {
        const c_r = this._getRe(x);
        const c_i = this._getIm(y);
        return new NumeroComplejo(c_r, c_i);
    }

    getPunto(c: NumeroComplejo) {
        const x = (c.re - this._r_min) / (this._r_max - this._r_min) * this._capa.ancho;
        const y = (c.im - this._i_max) / (this._i_min - this._i_max) * this._capa.alto;
        return {x, y};
    }

    getCanvasTrayectoria(trayectoria: NumeroComplejo[]) {
        this._capaTrayectoria.limpiar();
        const ctx = this._capaTrayectoria.canvas.getContext("2d")!;
        const n = trayectoria.length;

        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.strokeStyle = this._colorTrayectoria;

        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const p = this.getPunto(trayectoria[i]);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        return this._capaTrayectoria.canvas;
    }

    hacerZoomEn(centro: NumeroComplejo) {
        const factorZoom = 4;

        const ancho = this._r_max - this._r_min;
        const alto = this._i_min - this._i_max;

        this._extension = {
            r_min: centro.re - ancho / factorZoom,
            r_max: centro.re + ancho / factorZoom,
            i_max: centro.im - alto / factorZoom,
            i_min: centro.im + alto / factorZoom,
        }
    }

    reiniciarZoom() {
        this._extension = undefined;
    }
}