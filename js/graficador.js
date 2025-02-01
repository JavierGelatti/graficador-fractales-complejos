const canvasMandelbrot = new graficador.CanvasGraficador(document.getElementById("canvasMandelbrot"));
const canvasJulia = new graficador.CanvasGraficador(document.getElementById("canvasJulia"));

const coloreadorAzul = new coloreadores.ColoreadorAzul();
const coloreadorRojo = new coloreadores.ColoreadorRojo();

const checkMostrarPunto = document.getElementById("mostrarPunto");
const checkMostrarTrayectoriaMandelbrot = document.getElementById("mostrarTrayectoriaMandelbrot");
const checkMostrarTrayectoriaJulia = document.getElementById("mostrarTrayectoriaJulia");
const checkMostrarVistaPJulia = document.getElementById("mostrarVistaJulia");

const btnZoomMandel = document.querySelector("#wrapper > section.mandelbrot > h2 > span.zoom");
const btnResetMandel = document.querySelector("#wrapper > section.mandelbrot > h2 > span.reiniciar");
const txtNroIterMandel = document.querySelector("#wrapper > section.mandelbrot > h2 > span.nroIteraciones");
const btnZoomJulia = document.querySelector("#wrapper > section.julia > h2 > span.zoom");
const btnResetJulia = document.querySelector("#wrapper > section.julia > h2 > span.reiniciar");
const txtNroIterJulia = document.querySelector("#wrapper > section.julia > h2 > span.nroIteraciones");

const txtRe = document.getElementById("re");
const txtIm = document.getElementById("im");
const frmC = document.getElementById("cManual");
const btnC = document.querySelector(".complejo > span");
const panelC = document.querySelector(".complejo");

let nroIteraciones = 50;
txtNroIterMandel.innerHTML = nroIteraciones;
txtNroIterJulia.innerHTML = nroIteraciones;

const f = (z, c) => z.multiplicar(z).sumar(c);

const controlador = new aplicacion.ControladorGraficador(
    canvasMandelbrot, coloreadorRojo,
    canvasJulia, coloreadorAzul,
    nroIteraciones, f,
    txtRe, txtIm
);
controlador.iniciarGraficador();

const obtenerPunto = (evt) => {
    const canvas = evt.target;
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left - 3,
        y: evt.clientY - rect.top
    };
};

const seleccionarC = (evt) => {
    controlador.seleccionarC(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("click", seleccionarC);

const cursorSobreMandelbrot = (evt) => {
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

const cursorSobreJulia = (evt) => {
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

const seleccionarCManual = (evt) => {
    evt.preventDefault();
    if (!txtRe.checkValidity() || !txtIm.checkValidity()) {
        alert("Por favor, ingrese solo números");
        return false;
    }
    const re = parseFloat(txtRe.value);
    const im = parseFloat(txtIm.value);

    controlador.seleccionarC(new dominio.NumeroComplejo(re, im));
    return false;
};
frmC.addEventListener("submit", seleccionarCManual);

const cambiarVisibilidadPanelIngresoC = () => {
    panelC.classList.toggle("activado");
};
btnC.addEventListener("click", cambiarVisibilidadPanelIngresoC);

const comando = (fn, args) => () => fn.apply(this, args);

const activarZoom = (canvas, btnZoom, fnAntes, fnZoom) => {
    canvas.removeEventListener("click", fnAntes);
    canvas.addEventListener("click", fnZoom);
    canvas.classList.add("zoomActivado");

    btnZoom.onclick = comando(desactivarZoom, arguments);
    btnZoom.classList.add("activado");
};

const desactivarZoom = (canvas, btnZoom, fnAntes, fnZoom) => {
    canvas.addEventListener("click", fnAntes);
    canvas.removeEventListener("click", fnZoom);
    canvas.classList.remove("zoomActivado");

    btnZoom.onclick = comando(activarZoom, arguments);
    btnZoom.classList.remove("activado");
};

const zoomMandel = (evt) => {
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

const zoomJulia = (evt) => {
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

const cambiarNroIteraciones = (txt, fn) => {
    let nroIter = prompt("Ingrese el número de iteraciones", txt.innerHTML);
    if (nroIter === null) return;

    nroIter = parseInt(nroIter);
    if (isNaN(nroIter) || nroIter < 1) {
        alert("Número de iteraciones inválido.");
        return;
    }

    fn.call(controlador, nroIter);
    txt.innerHTML = nroIter;
};

const cambiarIteracionesMandel = () => {
    cambiarNroIteraciones(txtNroIterMandel, controlador.definirIteracionesMandelbrot);
};
txtNroIterMandel.addEventListener("click", cambiarIteracionesMandel);

const cambiarIteracionesJulia = () => {
    cambiarNroIteraciones(txtNroIterJulia, controlador.definirIteracionesJulia);
};
txtNroIterJulia.addEventListener("click", cambiarIteracionesJulia);