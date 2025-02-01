import {describe, test, expect, beforeEach} from "vitest";
import { hacerDecorable } from "../js/aplicacion/Decorador";

describe("TestDecorador", () => {
    class Objeto {
        constructor() {
            this.valor = 'valor original';
        }
        hacerAlgo(texto) {
            llamada += "original(" + texto + ").";
        }
        hacerOtraCosa(texto) {
            this.valor = texto;
        }
    }

    let llamada;

    beforeEach(() => {
        llamada = "";
    });

    test("se puede decorar un metodo", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.hacerAlgo('A');

        objeto.decorar('hacerAlgo', function(texto) {
            llamada += "modificado(" + texto + ").";
        });
        objeto.hacerAlgo('B');

        expect(llamada).toEqual("original(A).modificado(B).");
    });

    test("al decorar se enlaza al objeto original", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function(texto) {
            this.hacerOtraCosa(texto);
        });
        objeto.hacerAlgo('B');

        expect(objeto.valor).toEqual('B');
    });

    test("se puede llamar al metodo original", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function(texto, metodoOriginal) {
            metodoOriginal(texto);
        });
        objeto.hacerAlgo('B');

        expect(llamada).toEqual("original(B).");
    });

    test("el this esta bien en el metodo original", () => {
        const objeto = new Objeto();
        hacerDecorable(objeto);
        objeto.decorar('hacerOtraCosa', function(texto, metodoOriginal) {
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
        objeto.hacerAlgo();

        expect(llamada).toEqual('A');
    });
});
