var graficador = (function(graficador) {

    graficador.CanvasGraficador = function(canvas) {
        utilidades.Canvas.call(this, canvas);
        this._ctx.font = "14px monospace";
        this._ctx.textBaseline = "bottom";
        this._ctx.textAlign = "right";
    };

    var numeroImprimible = function (nro) {
        if (nro < 0) {
            nro = -nro;
            return " - " + nro.toFixed(4);
        } else {
            return " + " + nro.toFixed(4);
        }
    };

    graficador.CanvasGraficador.prototype = Object.create(utilidades.Canvas.prototype, {
        mostrarUbicacion : {
            value : function(c) {
                this._ctx.fillText(
                    "c =" + numeroImprimible(c.re) + numeroImprimible(c.im) + " i",
                    this.ancho-5, this.alto-5);
            }
        },
        mostrarPunto : {
            value : function(p) {
                var radio = 3;
                var ctx = this._ctx;

                ctx.save();
                ctx.fillStyle = 'red';
                ctx.strokeStyle = 'darkred';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radio, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }
    });

    return graficador;
})(graficador || {});