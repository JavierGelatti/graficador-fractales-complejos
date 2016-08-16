var Objeto, llamada;
TestCase("TestDecorador", {
    "setUp": function() {
        llamada = "";
        Objeto = function() {
            this.valor = 'valor original';
        };
        Object.defineProperties(Objeto.prototype, {
            hacerAlgo : {
                value : function(texto) {
                    llamada += "original(" + texto + ").";
                }
            },
            hacerOtraCosa : {
                value : function(texto) {
                    this.valor = texto;
                }
            }
        });
    },
    "test se puede decorar un metodo": function() {
        var objeto = new Objeto();
        aplicacion.hacerDecorable(objeto);
        objeto.hacerAlgo('A');

        objeto.decorar('hacerAlgo', function(texto) {
            llamada += "modificado(" + texto + ").";
        });
        objeto.hacerAlgo('B');

        assertEquals("original(A).modificado(B).", llamada);
    },
    "test al decorar se enlaza al objeto original": function() {
        var objeto = new Objeto();
        aplicacion.hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function(texto) {
            this.hacerOtraCosa(texto);
        });
        objeto.hacerAlgo('B');

        assertEquals('B', objeto.valor);
    },
    "test se puede llamar al metodo original": function() {
        var objeto = new Objeto();
        aplicacion.hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function(texto, metodoOriginal) {
            metodoOriginal(texto);
        });
        objeto.hacerAlgo('B');

        assertEquals("original(B).", llamada);
    },
    "test el this esta bien en el metodo original": function() {
        var objeto = new Objeto();
        aplicacion.hacerDecorable(objeto);
        objeto.decorar('hacerOtraCosa', function(texto, metodoOriginal) {
            metodoOriginal(texto);
        });
        objeto.hacerOtraCosa('B');

        assertEquals('B', objeto.valor);
    },
    "test se puede eliminar una decoracion": function() {
        var objeto = new Objeto();
        aplicacion.hacerDecorable(objeto);
        objeto.decorar('hacerAlgo', function() {
            llamada += 'A';
        });
        var idDeco = objeto.decorar('hacerAlgo', function() {
            llamada += 'B';
        });

        objeto.eliminarDecoracion(idDeco);
        objeto.hacerAlgo();

        assertEquals('A', llamada);
    }
});

