var aplicacion = (function(aplicacion) {

    aplicacion.hacerDecorable = function(unObjeto) {
        unObjeto._decoraciones = {};

        unObjeto.eliminarDecoracion = function(idDecoracion) {
            this._decoraciones[idDecoracion].call(this);
            this._decoraciones[idDecoracion] = undefined;
        };

        unObjeto.decorar = function(unMensaje, nuevoMetodo) {
            // Aplicar la decoracion
            var metodoOriginal = this[unMensaje];
            Object.defineProperty(this, unMensaje, {
                value : function() {
                    [].push.call(arguments, metodoOriginal.bind(this));
                    nuevoMetodo.apply(this, arguments);
                },
                configurable: true
            });

            // Registrar para deshacer la decoracion
            var idEstaDecoracion = metodoOriginal;
            this._decoraciones[idEstaDecoracion] = function() {
                Object.defineProperty(this, unMensaje, {
                    value : metodoOriginal,
                    configurable: true
                });
            };

            return idEstaDecoracion;
        }
    };

    return aplicacion;
})(aplicacion || {});
