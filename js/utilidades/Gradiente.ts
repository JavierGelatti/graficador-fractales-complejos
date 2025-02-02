import {Color} from "./Color";

class ColorGradiente {
    color: Color;
    porcentaje: number;

    constructor(color: Color, porcentaje: number) {
        this.color = color;
        this.porcentaje = porcentaje;
    }
}

const compararColoresGradiente = (a: ColorGradiente, b: ColorGradiente) => a.porcentaje - b.porcentaje;

const interpolarColores = (
    colorFinal: Color, colorInicio: Color, razonColor: number,
) => {
    const deltaR = colorFinal.r - colorInicio.r;
    const deltaG = colorFinal.g - colorInicio.g;
    const deltaB = colorFinal.b - colorInicio.b;

    const r = Math.round(deltaR * razonColor + colorInicio.r);
    const g = Math.round(deltaG * razonColor + colorInicio.g);
    const b = Math.round(deltaB * razonColor + colorInicio.b);

    return new Color(r, g, b);
};

const buscarColor = (
    colores: ColorGradiente[], iMin: number, iMax: number, porcentaje: number,
) => {
    if (iMin > iMax) {
        if (iMax === -1) return colores[iMin].color;
        if (iMin === colores.length) return colores[iMax].color;

        const colorInicio = colores[iMax].color;
        const colorFinal = colores[iMin].color;
        const porcInicio = colores[iMax].porcentaje;
        const porcFinal = colores[iMin].porcentaje;
        const deltaPorc = porcFinal - porcInicio;
        const razonColor = (porcentaje - porcInicio) / deltaPorc;

        return interpolarColores(colorFinal, colorInicio, razonColor);
    }

    const iMed = Math.floor((iMax + iMin) / 2);
    const porcMed = colores[iMed].porcentaje;

    if (porcentaje < porcMed) return buscarColor(colores, iMin, iMed - 1, porcentaje);
    if (porcentaje > porcMed) return buscarColor(colores, iMed + 1, iMax, porcentaje);
    return colores[iMed].color;
};

export class Gradiente {
    private readonly _colores: ColorGradiente[];

    constructor(cInicio: Color, cFin: Color) {
        this._colores = [
            new ColorGradiente(cInicio, 0),
            new ColorGradiente(cFin, 100),
        ];
    }

    agregarColor(color: Color, porcentaje: number) {
        this._colores.push(new ColorGradiente(color, porcentaje));
        this._colores.sort(compararColoresGradiente);
    }

    tomarColor(porcentaje: number) {
        return buscarColor(this._colores, 0, this._colores.length - 1, porcentaje);
    }
}