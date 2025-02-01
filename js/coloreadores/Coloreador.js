var coloreadores = (function(coloreadores) {

    class ColoreadorAzul {
        getColor(datos) {
            if (datos.pertenece) {
                return new utilidades.Color(0, 0, 0);
            } else {
                const t = datos.nroIter;
                const r = 255 - Math.floor(255 * t / datos.nroMaxIter);
                const g = 255 - Math.floor(255 * t / datos.nroMaxIter);
                const b = (255 - (t) % 256);
                return new utilidades.Color(r, g, b);
            }
        }
    }

    class ColoreadorRojo {
        getColor(datos) {
            if (datos.pertenece) {
                return new utilidades.Color(0, 0, 0);
            } else {
                const t = datos.nroIter;
                const r = (255 - (t) % 256);
                const g = 255 - Math.floor(255 * t / datos.nroMaxIter);
                const b = 255 - Math.floor(255 * t / datos.nroMaxIter);
                return new utilidades.Color(r, g, b);
            }
        }
    }

    coloreadores.ColoreadorAzul = ColoreadorAzul;
    coloreadores.ColoreadorRojo = ColoreadorRojo;

    return coloreadores;
})(coloreadores || {});