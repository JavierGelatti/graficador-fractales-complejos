import {Color} from "./Color.ts";

export class Canvas {
    protected _ctx: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d")!;
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

    dibujarPunto(x: number, y: number, color: Color) {
        if (color) {
            this._ctx.fillStyle = color.rgb;
        }
        this._ctx.fillRect(x, y, 1, 1);
    }

    dibujar(imagen: CanvasImageSource) {
        this._ctx.drawImage(imagen, 0, 0);
    }

    addEventListener<K extends keyof HTMLElementEventMap>(
        evento: K,
        manejador: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void,
    ) {
        this.canvas.addEventListener(evento, manejador);
    }

    removeEventListener<K extends keyof HTMLElementEventMap>(
        evento: K,
        manejador: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void,
    ) {
        this.canvas.removeEventListener(evento, manejador);
    }
}