var dominio = (function(dominio) {

    var e = Math.E;
    function cos(x) {
        return Math.cos(x);
    }
    function sen(x) {
        return Math.sin(x);
    }
    function sqrt(x) {
        return Math.sqrt(x);
    }
    function pow(y, x) {
        return Math.pow(y, x);
    }
    function exp(x) {
        return pow(e, x);
    }
    function cosh(x) {
        var ex = exp(x);
        return 1/2 * (1/ex + ex);
    }
    function senh(x) {
        var ex = exp(x);
        return 1/2 * (-1/ex + ex);
    }

    dominio.NumeroComplejo = function(a, b) {
        this._a = a;
        this._b = b;
    };

    Object.defineProperties(dominio.NumeroComplejo.prototype, {
        re : {
            get : function() {
                return this._a;
            }
        },
        im : {
            get : function() {
                return this._b;
            }
        },
        mod2 : {
            get : function() {
                return this._a * this._a + this._b * this._b;
            }
        },
        mod : {
            get : function() {
                return sqrt(this.mod2);
            }
        },
        sumar : {
            value : function(c2) {
                var c1 = this;
                return new dominio.NumeroComplejo(c1.re + c2.re, c1.im + c2.im);
            }
        },
        restar : {
            value : function(c2) {
                var c1 = this;
                return new dominio.NumeroComplejo(c1.re - c2.re, c1.im - c2.im);
            }
        },
        multiplicar : {
            value : function(c2) {
                var c1 = this;
                return new dominio.NumeroComplejo(c1.re*c2.re - c1.im*c2.im, c1.re*c2.im + c1.im*c2.re);
            }
        },
        dividir : {
            value : function(c2) {
                var c1 = this;
                var sc = pow(c2.re, 2) + pow(c2.im, 2);
                return new dominio.NumeroComplejo((c1.re*c2.re + c1.im*c2.im)/sc, (c1.im*c2.re - c1.re*c2.im)/sc);
            }
        },
        sen : {
            value : function() {
                var z = this;
                return new dominio.NumeroComplejo(cosh(z.im) * sen(z.re), cos(z.re) * senh(z.im));
            }
        },
        exp : {
            value : function() {
                var z = this;
                var ea = exp(z.re);
                return new dominio.NumeroComplejo(ea * cos(z.im), ea * sen(z.im));
            }
        }
    });

    return dominio;
})(dominio || {});