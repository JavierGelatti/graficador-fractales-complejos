var dominio = (function(dominio) {
    // Funciones matemáticas
    const e = Math.E;
    const cos = Math.cos;
    const sen = Math.sin;
    const sqrt = Math.sqrt;
    const pow = Math.pow;
    const exp = x => pow(e, x);
    const cosh = x => {
        const ex = exp(x);
        return 1/2 * (1/ex + ex);
    };
    const senh = x => {
        const ex = exp(x);
        return 1/2 * (-1/ex + ex);
    };

    class NumeroComplejo {
        constructor(re, im) {
            this._re = re;
            this._im = im;
        }

        get re() {
            return this._re;
        }

        get im() {
            return this._im;
        }

        get mod2() {
            return this._re * this._re + this._im * this._im;
        }

        get mod() {
            return sqrt(this.mod2);
        }

        sumar(c2) {
            return new NumeroComplejo(this.re + c2.re, this.im + c2.im);
        }

        restar(c2) {
            return new NumeroComplejo(this.re - c2.re, this.im - c2.im);
        }

        multiplicar(c2) {
            return new NumeroComplejo(
                this.re * c2.re - this.im * c2.im,
                this.re * c2.im + this.im * c2.re
            );
        }

        dividir(c2) {
            const sc = pow(c2.re, 2) + pow(c2.im, 2);
            return new NumeroComplejo(
                (this.re * c2.re + this.im * c2.im) / sc,
                (this.im * c2.re - this.re * c2.im) / sc
            );
        }

        sen() {
            return new NumeroComplejo(
                cosh(this.im) * sen(this.re),
                cos(this.re) * senh(this.im)
            );
        }

        exp() {
            const ea = exp(this.re);
            return new NumeroComplejo(
                ea * cos(this.im),
                ea * sen(this.im)
            );
        }
    }

    dominio.NumeroComplejo = NumeroComplejo;

    return dominio;
})(dominio || {});