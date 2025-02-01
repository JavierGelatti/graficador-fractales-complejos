export function hacerDecorable(unObjeto) {
    unObjeto._decoraciones = {};

    unObjeto.eliminarDecoracion = function(idDecoracion) {
        this._decoraciones[idDecoracion].call(this);
        this._decoraciones[idDecoracion] = undefined;
    };

    unObjeto.decorar = function(unMensaje, nuevoMetodo) {
        // Aplicar la decoracion
        const metodoOriginal = this[unMensaje];
        Object.defineProperty(this, unMensaje, {
            value: (...args) => {
                nuevoMetodo.apply(this, [...args, metodoOriginal.bind(this)]);
            },
            configurable: true
        });

        // Registrar para deshacer la decoracion
        const idEstaDecoracion = metodoOriginal;
        this._decoraciones[idEstaDecoracion] = () => {
            Object.defineProperty(this, unMensaje, {
                value: metodoOriginal,
                configurable: true
            });
        };

        return idEstaDecoracion;
    };
}