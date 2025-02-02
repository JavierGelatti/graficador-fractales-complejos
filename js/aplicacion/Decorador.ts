type MethodParameters<T, K extends keyof T> = T[K] extends (...args: any[]) => any ? Parameters<T[K]> : never;

type IdDecoracion = Function & { __marca_id_decoracion__: any };
type ObjetoDecorado<T> = T & {
    _decoraciones: Map<IdDecoracion, Function>,
    eliminarDecoracion(idDecoracion: IdDecoracion): void,
    decorar<K extends keyof T>(
        unMensaje: K,
        nuevoMetodo: (this: ObjetoDecorado<T>, metodoOriginal: T[K] & Function, ...args: MethodParameters<T, K>) => unknown
    ): IdDecoracion
}

export function hacerDecorable<T extends object>(unObjeto: T): asserts unObjeto is ObjetoDecorado<T> {
    // @ts-ignore
    unObjeto._decoraciones = new Map();

    // @ts-ignore
    unObjeto.eliminarDecoracion = function(this: ObjetoDecorado<T>, idDecoracion: IdDecoracion) {
        this._decoraciones.get(idDecoracion)!.call(this);
        this._decoraciones.delete(idDecoracion);
    };

    // @ts-ignore
    unObjeto.decorar = function<K extends keyof T>(
        this: ObjetoDecorado<T>,
        unMensaje: K,
        nuevoMetodo: (this: ObjetoDecorado<T>, metodoOriginal: T[K] & Function, ...args: MethodParameters<T, K>) => unknown
    ): IdDecoracion {
        // Aplicar la decoracion
        const metodoOriginal = Reflect.get(this, unMensaje) as Function;
        Object.defineProperty(this, unMensaje, {
            value: (...args: MethodParameters<T, K>) => {
                nuevoMetodo.apply(this, [metodoOriginal.bind(this), ...args]);
            },
            configurable: true
        });

        // Registrar para deshacer la decoracion
        const idEstaDecoracion = metodoOriginal as IdDecoracion;
        this._decoraciones.set(idEstaDecoracion, () => {
            Object.defineProperty(this, unMensaje, {
                value: metodoOriginal,
                configurable: true
            });
        });

        return idEstaDecoracion;
    };
}