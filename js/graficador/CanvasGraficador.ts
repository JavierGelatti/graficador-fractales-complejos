import { Canvas } from "../utilidades/Canvas";

export class CanvasGraficador extends Canvas {
    constructor(canvas) {
        super(canvas);
        this._ctx.font = "14px monospace";
        this._ctx.textBaseline = "bottom";
        this._ctx.textAlign = "right";
    }

    mostrarUbicacion(c) {
        const numeroImprimible = (nro) => {
            if (nro < 0) {
                nro = -nro;
                return ` - ${nro.toFixed(4)}`;
            } else {
                return ` + ${nro.toFixed(4)}`;
            }
        };

        this._ctx.fillText(
            `c =${numeroImprimible(c.re)}${numeroImprimible(c.im)} i`,
            this.ancho - 5, this.alto - 5
        );
    }

    mostrarPunto(p) {
        const radio = 3;
        const ctx = this._ctx;

        ctx.save();
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'darkred';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radio, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}