import { Color } from "../utilidades/Color";

export class ColoreadorAzul {
    getColor(datos) {
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

export class ColoreadorRojo {
    getColor(datos) {
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