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
                    nroIter   : i,
                    nroMaxIter: maxIter
                };
            }
        },
        nroIteraciones : {
            get : function() {
                return this._nroIteraciones;
            },
            set : function(n) {
                this._nroIteraciones = n;
            }
        }
    });

    dominio.ConjuntoJulia = function(fn, nroIter, c) {
        ConjuntoComplejo.call(this, fn, nroIter);
        this._c = c;
    };

    dominio.ConjuntoJulia.prototype = Object.create(ConjuntoComplejo.prototype, {
        _getC : {
            value : function() {
                return this._c;
            }
        },
        c : {
            get : function() {
                return this._c;
            }
        },
        getTrayectoria : {
            value : function(z) {
                var trayectoria = [];
                var maxIter = this._nroIteraciones;

                trayectoria[0] = z;
                for (var i = 0; i < maxIter && trayectoria[i].mod2 < radioEscape2; i++) {
                    trayectoria[i+1] = f(trayectoria[i], this._c);
                }

                return trayectoria;
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