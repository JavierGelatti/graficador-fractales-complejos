var graficador = (function(graficador) {

    graficador.CanvasPlanoComplejo = function(canvas) {
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

    graficador.CanvasPlanoComplejo.prototype = Object.create(utilidades.Canvas.prototype, {
        mostrarUbicacion : {
            value : function(c) {
                this._ctx.fillText(
                    "c =" + numeroImprimible(c.re) + numeroImprimible(c.im) + " i",
                    this.ancho-5, this.alto-5);
            }
        }
    });

    return graficador;
})(graficador || {});