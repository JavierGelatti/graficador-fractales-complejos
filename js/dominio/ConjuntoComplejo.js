var dominio = (function(dominio) {

    var radioEscape  = 2;
    var radioEscape2 = radioEscape*radioEscape;

    var ConjuntoComplejo = function(fn, nroIter) {
        this._fn = fn;
        this._nroIteraciones = nroIter;
        this.ox = 0;
        this.oy = 0;
    };

    Object.defineProperties(ConjuntoComplejo.prototype, {
        getDatos : {
            value : function(z) {
                var maxIter = this._nroIteraciones;
                var f       = this._fn;
                var c       = this._getC(z);

                for (var i = 0; i < maxIter && z.mod2 < radioEscape2; i++) {
                    z = f(z, c);
                }

                return {
                    modulo    : z.mod,
                    pertenece : i == maxIter,
                    nroIter   : i
                };
            }
        }
    });

    dominio.ConjuntoJulia = function(fn, nroIter, c) {
        ConjuntoComplejo.call(this, fn, nroIter);
        this.c = c;
    };

    dominio.ConjuntoJulia.prototype = Object.create(ConjuntoComplejo.prototype, {
        _getC : {
            value : function() {
                return this.c;
            }
        }
    });

    dominio.ConjuntoMandelbrot = function(fn, nroIter) {
        ConjuntoComplejo.call(this, fn, nroIter);
        this.ox = -0.5;
    };

    dominio.ConjuntoMandelbrot.prototype = Object.create(ConjuntoComplejo.prototype, {
        _getC : {
            value : function(z) {
                return z;
            }
        }
    });

    return dominio;
})(dominio || {});