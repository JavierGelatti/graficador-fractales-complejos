var utilidades = (function(utilidades) {

    utilidades.Color = function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };

    Object.defineProperties(utilidades.Color.prototype, {
        rgb : {
            get : function() {
                return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
            }
        }
    });

    return utilidades;
})(utilidades || {});
