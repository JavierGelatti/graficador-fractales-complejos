import {NumeroComplejo} from "./dominio/NumeroComplejo";
import {CanvasGraficador} from "./graficador/CanvasGraficador";
import {ColoreadorAzul, ColoreadorRojo} from "./coloreadores/Coloreador";
import {ControladorGraficador} from "./aplicacion/ControladorGraficador";
import {Punto} from "./dominio/Punto.ts";

const canvasMandelbrot = new CanvasGraficador(document.getElementById("canvasMandelbrot") as HTMLCanvasElement);
const canvasJulia = new CanvasGraficador(document.getElementById("canvasJulia") as HTMLCanvasElement);

const coloreadorAzul = new ColoreadorAzul();
const coloreadorRojo = new ColoreadorRojo();

const checkMostrarPunto = document.getElementById("mostrarPunto") as HTMLInputElement;
const checkMostrarTrayectoriaMandelbrot = document.getElementById("mostrarTrayectoriaMandelbrot") as HTMLInputElement;
const checkMostrarTrayectoriaJulia = document.getElementById("mostrarTrayectoriaJulia") as HTMLInputElement;
const checkMostrarVistaPJulia = document.getElementById("mostrarVistaJulia") as HTMLInputElement;

const btnZoomMandel = document.querySelector<HTMLElement>("#wrapper > section.mandelbrot > h2 > span.zoom")!;
const btnResetMandel = document.querySelector<HTMLElement>("#wrapper > section.mandelbrot > h2 > span.reiniciar")!;
const txtNroIterMandel = document.querySelector<HTMLElement>("#wrapper > section.mandelbrot > h2 > span.nroIteraciones")!;
const btnZoomJulia = document.querySelector<HTMLElement>("#wrapper > section.julia > h2 > span.zoom")!;
const btnResetJulia = document.querySelector<HTMLElement>("#wrapper > section.julia > h2 > span.reiniciar")!;
const txtNroIterJulia = document.querySelector<HTMLElement>("#wrapper > section.julia > h2 > span.nroIteraciones")!;

const txtRe = document.getElementById("re") as HTMLInputElement;
const txtIm = document.getElementById("im") as HTMLInputElement;
const frmC = document.getElementById("cManual")!;
const btnC = document.querySelector(".complejo > span")!;
const panelC = document.querySelector(".complejo")!;

let nroIteraciones = 50;
txtNroIterMandel.innerHTML = String(nroIteraciones);
txtNroIterJulia.innerHTML = String(nroIteraciones);

const f = (z: NumeroComplejo, c: NumeroComplejo) => z.multiplicar(z).sumar(c);

const controlador = new ControladorGraficador(
    canvasMandelbrot, coloreadorRojo,
    canvasJulia, coloreadorAzul,
    nroIteraciones, f,
    txtRe, txtIm
);
controlador.iniciarGraficador();

const obtenerPunto: (evt: MouseEvent) => Punto = evt => {
    const canvas = evt.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left - 3,
        y: evt.clientY - rect.top
    };
};

const seleccionarC = (evt: MouseEvent) => {
    controlador.seleccionarC(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("click", seleccionarC);

const cursorSobreMandelbrot = (evt: MouseEvent) => {
    controlador.cursorSobreMandelbrot(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("mousemove", cursorSobreMandelbrot);

const redibujarMandel = () => {
    controlador.redibujarMandelbrot();
};
canvasMandelbrot.addEventListener("mouseleave", redibujarMandel);

const cambiarEstadoMostrarPuntoSeleccionado = () => {
    if (checkMostrarPunto.checked) {
        controlador.mostrarPuntoSeleccionado();
    } else {
        controlador.ocultarPuntoSeleccionado();
    }
};
checkMostrarPunto.addEventListener("change", cambiarEstadoMostrarPuntoSeleccionado);
cambiarEstadoMostrarPuntoSeleccionado();

const cursorSobreJulia = (evt: MouseEvent) => {
    controlador.cursorSobreJulia(obtenerPunto(evt));
};
canvasJulia.addEventListener("mousemove", cursorSobreJulia);

const cambiarEstadoMostrarTrayectoriaJulia = () => {
    if (checkMostrarTrayectoriaJulia.checked) {
        controlador.mostrarTrayectoriaJulia();
    } else {
        controlador.ocultarTrayectoriaJulia();
    }
};
checkMostrarTrayectoriaJulia.addEventListener("change", cambiarEstadoMostrarTrayectoriaJulia);
cambiarEstadoMostrarTrayectoriaJulia();

const cambiarEstadoMostrarTrayectoriaMandelbrot = () => {
    if (checkMostrarTrayectoriaMandelbrot.checked) {
        controlador.mostrarTrayectoriaMandelbrot();
    } else {
        controlador.ocultarTrayectoriaMandelbrot();
    }
};
checkMostrarTrayectoriaMandelbrot.addEventListener("change", cambiarEstadoMostrarTrayectoriaMandelbrot);
cambiarEstadoMostrarTrayectoriaMandelbrot();

const cambiarEstadoMostrarVistaPreviaJulia = () => {
    if (checkMostrarVistaPJulia.checked) {
        controlador.mostrarVistaPreviaJulia();
    } else {
        controlador.ocultarVistaPreviaJulia();
    }
};
checkMostrarVistaPJulia.addEventListener("change", cambiarEstadoMostrarVistaPreviaJulia);
cambiarEstadoMostrarVistaPreviaJulia();

const seleccionarCManual = (evt: SubmitEvent) => {
    evt.preventDefault();
    if (!txtRe.checkValidity() || !txtIm.checkValidity()) {
        alert("Por favor, ingrese solo números");
        return false;
    }
    const re = parseFloat(txtRe.value);
    const im = parseFloat(txtIm.value);

    controlador.seleccionarC(new NumeroComplejo(re, im));
    return false;
};
frmC.addEventListener("submit", seleccionarCManual);

const cambiarVisibilidadPanelIngresoC = () => {
    panelC.classList.toggle("activado");
};
btnC.addEventListener("click", cambiarVisibilidadPanelIngresoC);

const activarZoom = (
    canvas: HTMLCanvasElement, btnZoom: HTMLElement, fnAntes: ((evt: MouseEvent) => void) | undefined, fnZoom: (evt: MouseEvent) => void
) => {
    if (fnAntes !== undefined) canvas.removeEventListener("click", fnAntes);
    canvas.addEventListener("click", fnZoom);
    canvas.classList.add("zoomActivado");

    btnZoom.onclick = () => desactivarZoom.apply(this, [canvas, btnZoom, fnAntes, fnZoom]);
    btnZoom.classList.add("activado");
};

const desactivarZoom = (
    canvas: HTMLCanvasElement, btnZoom: HTMLElement, fnAntes: ((evt: MouseEvent) => void) | undefined, fnZoom: (evt: MouseEvent) => void
) => {
    if (fnAntes !== undefined) canvas.addEventListener("click", fnAntes);
    canvas.removeEventListener("click", fnZoom);
    canvas.classList.remove("zoomActivado");

    btnZoom.onclick = () => activarZoom.apply(this, [canvas, btnZoom, fnAntes, fnZoom]);
    btnZoom.classList.remove("activado");
};

const zoomMandel = (evt: MouseEvent) => {
    controlador.zoomMandelbrot(obtenerPunto(evt));
};
const activarZoomMandel = () => {
    activarZoom(canvasMandelbrot.canvas, btnZoomMandel, seleccionarC, zoomMandel);
};
btnZoomMandel.onclick = activarZoomMandel;

const reiniciarZoomMandel = () => {
    controlador.reiniciarZoomMandelbrot();
};
btnResetMandel.addEventListener("click", reiniciarZoomMandel);

const zoomJulia = (evt: MouseEvent) => {
    controlador.zoomJulia(obtenerPunto(evt));
};
const activarZoomJulia = () => {
    activarZoom(canvasJulia.canvas, btnZoomJulia, undefined, zoomJulia);
};
btnZoomJulia.onclick = activarZoomJulia;

const reiniciarZoomJulia = () => {
    controlador.reiniciarZoomJulia();
};
btnResetJulia.addEventListener("click", reiniciarZoomJulia);

const cambiarNroIteraciones = (txt: HTMLElement, fn: (this: ControladorGraficador, nroIter: number) => void) => {
    let nroIter: string | number | null = prompt("Ingrese el número de iteraciones", txt.innerHTML);
    if (nroIter === null) return;

    nroIter = parseInt(nroIter);
    if (isNaN(nroIter) || nroIter < 1) {
        alert("Número de iteraciones inválido.");
        return;
    }

    fn.call(controlador, nroIter);
    txt.innerHTML = String(nroIter);
};

const cambiarIteracionesMandel = () => {
    cambiarNroIteraciones(txtNroIterMandel, controlador.definirIteracionesMandelbrot);
};
txtNroIterMandel.addEventListener("click", cambiarIteracionesMandel);

const cambiarIteracionesJulia = () => {
    cambiarNroIteraciones(txtNroIterJulia, controlador.definirIteracionesJulia);
};
txtNroIterJulia.addEventListener("click", cambiarIteracionesJulia);