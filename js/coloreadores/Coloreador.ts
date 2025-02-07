import {Color} from "../utilidades/Color";
import {ConjuntoComplejo} from "../dominio/ConjuntoComplejo.ts";

export type Datos = ReturnType<ConjuntoComplejo["getDatos"]>;

export abstract class Coloreador {
    getColor(datos: Datos): Color {
        if (datos.pertenece) return new Color(0, 0, 0);

        return this._colorPara(
            Math.floor(255 * (1 - datos.nroIter / datos.nroMaxIter))
        );
    }

    /**
     * @param componenteDeColor número entre 0 y 255
     */
    protected abstract _colorPara(componenteDeColor: number): Color;
}

export class ColoreadorAzul extends Coloreador {
    protected _colorPara(x: number): Color {
        return new Color(x, x, 255);
    }
}

export class ColoreadorRojo extends Coloreador {
    protected _colorPara(x: number): Color {
        return new Color(255, x, x);
    }
}