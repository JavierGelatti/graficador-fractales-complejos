var graficador = (function(graficador) {

    graficador.PlanoComplejo = function(ancho, alto) {
        this._capaFractal        = document.createElement("canvas");
        this._capaFractal.width  = ancho;
        this._capaFractal.height = alto;

        this._ctx   = this._capaFractal.getContext("2d");
        this._ancho = ancho;
        this._alto  = alto;
    };

    Object.defineProperties(graficador.PlanoComplejo.prototype, {
        re : {
            get : function() {
                return this._a;
            }
        },
        _definirDimensiones : {
            value : function(conjuntoComplejo) {
                var i_min = conjuntoComplejo.oy - 1.5;
                var i_max = conjuntoComplejo.oy + 1.5;

                var r_min = conjuntoComplejo.ox - 2;
                var r_max = conjuntoComplejo.ox + 2;

                var anchoPlano = (i_max-i_min) * ancho/alto;
                var r_med = (r_max + r_min)/2;

                this._i_min = i_min;
                this._i_max = i_max;
                this._r_min = r_med - anchoPlano/2;
                this._r_max = r_med + anchoPlano/2;
            }
        },
        graficar : {
            value : function(conjuntoComplejo) {
                var alto  = this._alto;
                var ancho = this._ancho;

                this._definirDimensiones(conjuntoComplejo);
                var r_min = this._r_min;
                var r_max = this._r_max;
                var i_min = this._i_min;
                var i_max = this._i_max;

                for (var y = 0; y < alto; y++) {
                    for (var x = 0; x < ancho; x++) {
                        var c_r = r_min + (r_max-r_min) * x / ancho;
                        var c_i = i_max + (i_min-i_max) * y / alto;
                        var c = new dominio.NumeroComplejo(c_r, c_i);
                        var datos = conjuntoComplejo.getDatos(c);
                        if (datos.pertenece) {
                            this._ctx.fillRect(x, y, 1, 1);
                        }
                    }
                }
            }
        }
    });

    return graficador;
})(graficador || {});