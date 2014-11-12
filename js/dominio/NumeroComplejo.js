var dominio = (function(dominio) {

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
                return Math.sqrt(this.mod2);
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
                var sc = Math.pow(c2.re, 2) + Math.pow(c2.im, 2);
                return new dominio.NumeroComplejo((c1.re*c2.re + c1.im*c2.im)/sc, (c1.im*c2.re - c1.re*c2.im)/sc);
            }
        }
    });

    return dominio;
})(dominio || {});