const radioEscape = 2;
const radioEscape2 = radioEscape * radioEscape;

class ConjuntoComplejo {
    constructor(funcionGeneradora, numeroDeIteraciones) {
        this._funcionGeneradora = funcionGeneradora;
        this._nroIteraciones = numeroDeIteraciones;
        this.ox = 0;
        this.oy = 0;
    }

    getDatos(z) {
        const maxIter = this._nroIteraciones;
        const f = this._funcionGeneradora;
        const c = this._getC(z);

        let i;
        for (i = 0; i < maxIter && z.mod2 < radioEscape2; i++) {
            z = f(z, c);
        }

        return {
            modulo: z.mod,
            pertenece: i === maxIter,
            nroIter: i,
            nroMaxIter: maxIter
        };
    }

    get nroIteraciones() {
        return this._nroIteraciones;
    }

    set nroIteraciones(n) {
        this._nroIteraciones = n;
    }

    getTrayectoria(z) {
        const trayectoria = [];
        const maxIter = this._nroIteraciones;

        trayectoria[0] = z;
        for (let i = 0; i < maxIter && trayectoria[i].mod2 < radioEscape2; i++) {
            trayectoria[i + 1] = this._funcionGeneradora(trayectoria[i], this._getC(z));
        }

        return trayectoria;
    }

    _getC(z) {
        throw new Error("Method '_getC' must be implemented by subclasses.");
    }
}

export class ConjuntoJulia extends ConjuntoComplejo {
    constructor(funcionGeneradora, numeroDeIteraciones, c) {
        super(funcionGeneradora, numeroDeIteraciones);
        this._c = c;
    }

    _getC() {
        return this._c;
    }

    get c() {
        return this._c;
    }
}

export class ConjuntoMandelbrot extends ConjuntoComplejo {
    constructor(fn, nroIter) {
        super(fn, nroIter);
        this.ox = -0.5;
    }

    _getC(z) {
        return z;
    }
}