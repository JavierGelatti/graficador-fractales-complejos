var utilidades = (function(utilidades) {

    var ColorGradiente = function(color, porcentaje) {
        this.color = color;
        this.porcentaje = porcentaje;
    };

    function compararColoresGradiente(a, b) {
        if (a.porcentaje < b.porcentaje)
            return -1;
        if (a.porcentaje > b.porcentaje)
            return 1;
        return 0;
    }

    function interpolarColores(colorFinal, colorInicio, razonColor) {
        var deltaR = colorFinal.r - colorInicio.r;
        var deltaG = colorFinal.g - colorInicio.g;
        var deltaB = colorFinal.b - colorInicio.b;

        var r = Math.round((deltaR * razonColor) + colorInicio.r);
        var g = Math.round((deltaG * razonColor) + colorInicio.g);
        var b = Math.round((deltaB * razonColor) + colorInicio.b);

        return new utilidades.Color(r, g, b);
    }

    function buscarColor(colores, iMin, iMax, porcentaje) {
        if (iMin > iMax) {
            if (iMax === -1) {
                return colores[iMin].color;
            }

            if (iMin === colores.length) {
                return colores[iMax].color;
            }

            try {
                var colorInicio = colores[iMax].color;
                var colorFinal  = colores[iMin].color;
            } catch (err) {
                console.log(iMin);
                console.log(iMax);
                console.log(colores);
            }

            var porcInicio  = colores[iMax].porcentaje;
            var porcFinal   = colores[iMin].porcentaje;
            var deltaPorc   = porcFinal - porcInicio;
            var razonColor  = (porcentaje - porcInicio) / deltaPorc;

            return interpolarColores(colorFinal, colorInicio, razonColor);
        }

        var iMed = Math.floor((iMax + iMin)/2);
        var porcMed = colores[iMed].porcentaje;
        if (porcentaje < porcMed) {
            return buscarColor(colores, iMin, iMed-1, porcentaje);
        } else if (porcentaje > porcMed) {
            return buscarColor(colores, iMed+1, iMax, porcentaje);
        } else {
            return colores[iMed].color;
        }
    }

    utilidades.Gradiente = function(cInicio, cFin) {
        this._colores = [new ColorGradiente(cInicio, 0), new ColorGradiente(cFin, 100)];
    };

    Object.defineProperties(utilidades.Gradiente.prototype, {
        agregarColor : {
            value : function(color, porcentaje) {
                this._colores.push(new ColorGradiente(color, porcentaje));
                this._colores.sort(compararColoresGradiente);
            }
        },
        tomarColor : {
            value : function(porcentaje) {
                return buscarColor(this._colores, 0, this._colores.length-1, porcentaje);
            }
        }
    });

    return utilidades;
})(utilidades || {});
