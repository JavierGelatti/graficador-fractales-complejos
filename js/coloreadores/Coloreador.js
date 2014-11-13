var coloreadores = (function(coloreadores) {

    coloreadores.ColoreadorAzul = function() {};

    Object.defineProperties(coloreadores.ColoreadorAzul.prototype, {
        getColor : {
            value : function(datos) {
                if (datos.pertenece) {
                    return new utilidades.Color(0, 0, 0);
                } else {
                    var t = datos.nroIter;

                    var r = 255 - Math.floor(255*t/datos.nroMaxIter);
                    var g = 255 - Math.floor(255*t/datos.nroMaxIter);
                    var b = (255 - (t) % 256);
                    return new utilidades.Color(r, g, b);
                }
            }
        }
    });

    coloreadores.ColoreadorRojo = function() {};

    Object.defineProperties(coloreadores.ColoreadorRojo.prototype, {
        getColor : {
            value : function(datos) {
                if (datos.pertenece) {
                    return new utilidades.Color(0, 0, 0);
                } else {
                    var t = datos.nroIter;

                    var r = (255 - (t) % 256);
                    var g = 255 - Math.floor(255*t/datos.nroMaxIter);
                    var b = 255 - Math.floor(255*t/datos.nroMaxIter);
                    return new utilidades.Color(r, g, b);
                }
            }
        }
    });

    return coloreadores;
})(coloreadores || {});