import {describe, test, expect, beforeEach} from "vitest";
import { hacerDecorable } from "../js/aplicacion/Decorador";

describe("TestDecorador", () => {
    let llamada = "";

    class Objeto {
        public valor: string;

        constructor() {
            this.valor = 'valor original';
        }
        hacerAlgo(texto: string) {
            llamada += "original(" + texto + ").";
        }
        hacerOtraCosa(texto: string) {
            this.valor = texto;
        }
    }

    beforeEach(() => {
        llamada = "";
    });

    test("se puede decorar un metodo", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.hacerAlgo('A');

        objeto.decorar('hacerAlgo', function(_, texto) {
            llamada += "modificado(" + texto + ").";
        });
        objeto.hacerAlgo('B');

        expect(llamada).toEqual("original(A).modificado(B).");
    });

    test("al decorar se enlaza al objeto original", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function(_, texto) {
            this.hacerOtraCosa(texto);
        });
        objeto.hacerAlgo('B');

        expect(objeto.valor).toEqual('B');
    });

    test("se puede llamar al metodo original", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function(metodoOriginal, texto) {
            metodoOriginal(texto);
        });
        objeto.hacerAlgo('B');

        expect(llamada).toEqual("original(B).");
    });

    test("el this esta bien en el metodo original", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerOtraCosa', function(metodoOriginal, texto) {
            metodoOriginal(texto);
        });
        objeto.hacerOtraCosa('B');

        expect(objeto.valor).toEqual('B');
    });

    test("se puede eliminar una decoracion", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function() {
            llamada += 'A';
        });
        const idDeco = objeto.decorar('hacerAlgo', function() {
            llamada += 'B';
        });

        objeto.eliminarDecoracion(idDeco);
        objeto.hacerAlgo('C');

        expect(llamada).toEqual('A');
    });
});
