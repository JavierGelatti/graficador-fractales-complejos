import {Color} from "../utilidades/Color";
import {ConjuntoComplejo} from "../dominio/ConjuntoComplejo.ts";

export type Datos = ReturnType<ConjuntoComplejo['getDatos']>;

export interface Coloreador {
    getColor(datos: Datos): Color;
}

export class ColoreadorAzul implements Coloreador {
    getColor(datos: Datos) {
        if (datos.pertenece) {
            return new Color(0, 0, 0);
        } else {
            const t = datos.nroIter;
            const r = 255 - Math.floor(255 * t / datos.nroMaxIter);
            const g = 255 - Math.floor(255 * t / datos.nroMaxIter);
            const b = (255 - (t) % 256);
            return new Color(r, g, b);
        }
    }
}

export class ColoreadorRojo implements Coloreador{
    getColor(datos: Datos) {
        if (datos.pertenece) {
            return new Color(0, 0, 0);
        } else {
            const t = datos.nroIter;
            const r = (255 - (t) % 256);
            const g = 255 - Math.floor(255 * t / datos.nroMaxIter);
            const b = 255 - Math.floor(255 * t / datos.nroMaxIter);
            return new Color(r, g, b);
        }
    }
}