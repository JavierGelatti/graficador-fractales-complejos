import {NumeroComplejo} from "./NumeroComplejo.ts";

type FuncionGeneradora = (z: NumeroComplejo, c: NumeroComplejo) => NumeroComplejo;

const radioEscape = 2;
const radioEscape2 = radioEscape * radioEscape;

export abstract class ConjuntoComplejo {
    private readonly _funcionGeneradora: FuncionGeneradora;
    private _nroIteraciones: number;
    ox: number;
    oy: number;

    constructor(funcionGeneradora: FuncionGeneradora, numeroDeIteraciones: number, ox = 0, oy = 0) {
        this._funcionGeneradora = funcionGeneradora;
        this._nroIteraciones = numeroDeIteraciones;
        this.ox = ox;
        this.oy = oy;
    }

    getDatos(z: NumeroComplejo) {
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

    set nroIteraciones(n: number) {
        this._nroIteraciones = n;
    }

    getTrayectoria(z: NumeroComplejo) {
        const trayectoria = [];
        const maxIter = this._nroIteraciones;

        trayectoria[0] = z;
        for (let i = 0; i < maxIter && trayectoria[i].mod2 < radioEscape2; i++) {
            trayectoria[i + 1] = this._funcionGeneradora(trayectoria[i], this._getC(z));
        }

        return trayectoria;
    }

    abstract _getC(z: NumeroComplejo): NumeroComplejo;
}

export class ConjuntoJulia extends ConjuntoComplejo {
    private readonly _c: NumeroComplejo;

    constructor(funcionGeneradora: FuncionGeneradora, numeroDeIteraciones: number, c: NumeroComplejo) {
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
    constructor(fn: FuncionGeneradora, nroIter: number) {
        super(fn, nroIter, -0.5);
    }

    _getC(z: NumeroComplejo) {
        return z;
    }
}