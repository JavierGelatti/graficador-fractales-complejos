var canvasMandelbrot = new graficador.CanvasGraficador(document.getElementById("canvasMandelbrot"));
var canvasJulia      = new graficador.CanvasGraficador(document.getElementById("canvasJulia"));

var coloreadorAzul  = new coloreadores.ColoreadorAzul();
var coloreadorRojo  = new coloreadores.ColoreadorRojo();

var checkMostrarPunto = document.getElementById("mostrarPunto");
var checkMostrarTrayectoriaMandelbrot = document.getElementById("mostrarTrayectoriaMandelbrot");
var checkMostrarTrayectoriaJulia = document.getElementById("mostrarTrayectoriaJulia");
var checkMostrarVistaPJulia = document.getElementById("mostrarVistaJulia");

var btnZoomMandel   = document.querySelector("#wrapper > section.mandelbrot > h2 > span.zoom");
var btnResetMandel  = document.querySelector("#wrapper > section.mandelbrot > h2 > span.reiniciar");
var txtNroIterMandel= document.querySelector("#wrapper > section.mandelbrot > h2 > span.nroIteraciones");
var btnZoomJulia    = document.querySelector("#wrapper > section.julia > h2 > span.zoom");
var btnResetJulia   = document.querySelector("#wrapper > section.julia > h2 > span.reiniciar");
var txtNroIterJulia = document.querySelector("#wrapper > section.julia > h2 > span.nroIteraciones");

var txtRe = document.getElementById("re");
var txtIm = document.getElementById("im");
var frmC  = document.getElementById("cManual");
var btnC  = document.querySelector(".complejo > span");
var panelC= document.querySelector(".complejo");

var nroIteraciones = 50;
txtNroIterMandel.innerHTML = nroIteraciones;
txtNroIterJulia.innerHTML  = nroIteraciones;

var f = function(z, c) {
    return z.multiplicar(z).sumar(c);
};

var controlador = new aplicacion.ControladorGraficador(
    canvasMandelbrot, coloreadorRojo,
    canvasJulia     , coloreadorAzul,
    nroIteraciones  , f,
    txtRe           , txtIm
);
controlador.iniciarGraficador();

var obtenerPunto = function(evt) {
    var canvas = evt.target;
    var rect = canvas.getBoundingClientRect();
    return {
        x : evt.clientX - rect.left -3,
        y : evt.clientY - rect.top
    };
};

var seleccionarC = function(evt) {
    controlador.seleccionarC(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("click", seleccionarC);

var cursorSobreMandelbrot  = function(evt) {
    controlador.cursorSobreMandelbrot(obtenerPunto(evt));
};
canvasMandelbrot.addEventListener("mousemove", cursorSobreMandelbrot);

var redibujarMandel = function() {
    controlador.redibujarMandelbrot();
};
canvasMandelbrot.addEventListener("mouseleave", redibujarMandel);

var cambiarEstadoMostrarPuntoSeleccionado = function(evt) {
    if (evt.target.checked) {
        controlador.mostrarPuntoSeleccionado();
    } else {
        controlador.ocultarPuntoSeleccionado();
    }
};
checkMostrarPunto.addEventListener("change", cambiarEstadoMostrarPuntoSeleccionado);

var cursorSobreJulia = function(evt) {
    controlador.cursorSobreJulia(obtenerPunto(evt));
};
canvasJulia.addEventListener("mousemove", cursorSobreJulia);

var cambiarEstadoMostrarTrayectoriaJulia = function(evt) {
    if (evt.target.checked) {
        controlador.mostrarTrayectoriaJulia();
    } else {
        controlador.ocultarTrayectoriaJulia();
    }
};
checkMostrarTrayectoriaJulia.addEventListener("change", cambiarEstadoMostrarTrayectoriaJulia);

var cambiarEstadoMostrarTrayectoriaMandelbrot = function(evt) {
    if (evt.target.checked) {
        controlador.mostrarTrayectoriaMandelbrot();
    } else {
        controlador.ocultarTrayectoriaMandelbrot();
    }
};
checkMostrarTrayectoriaMandelbrot.addEventListener("change", cambiarEstadoMostrarTrayectoriaMandelbrot);

var cambiarEstadoMostrarVistaPreviaJulia = function(evt) {
    if (evt.target.checked) {
        controlador.mostrarVistaPreviaJulia();
    } else {
        controlador.ocultarVistaPreviaJulia();
    }
};
checkMostrarVistaPJulia.addEventListener("change", cambiarEstadoMostrarVistaPreviaJulia);

var seleccionarCManual = function(evt) {
    evt.preventDefault();
    if (!txtRe.checkValidity() || !txtIm.checkValidity()) {
        alert("Por favor, ingrese solo números");
        return false;
    }
    var re = parseFloat(txtRe.value);
    var im = parseFloat(txtIm.value);

    controlador.seleccionarC(new dominio.NumeroComplejo(re, im));
    return false;
};
frmC.addEventListener("submit", seleccionarCManual);

var cambiarVisibilidadPanelIngresoC = function() {
    panelC.classList.toggle("activado");
};
btnC.addEventListener("click", cambiarVisibilidadPanelIngresoC);

var comando = function(fn, args) {
    return function() {
        fn.apply(this, args);
    };
};
var activarZoom = function(canvas, btnZoom, fnAntes, fnZoom) {
    canvas.removeEventListener("click", fnAntes);
    canvas.addEventListener("click", fnZoom);
    canvas.classList.add("zoomActivado");

    btnZoom.onclick = comando(desactivarZoom, arguments);
    btnZoom.classList.add("activado");
};
var desactivarZoom = function(canvas, btnZoom, fnAntes, fnZoom) {
    canvas.addEventListener("click", fnAntes);
    canvas.removeEventListener("click", fnZoom);
    canvas.classList.remove("zoomActivado");

    btnZoom.onclick = comando(activarZoom, arguments);
    btnZoom.classList.remove("activado");
};

var zoomMandel = function(evt) {
    controlador.zoomMandelbrot(obtenerPunto(evt));
};
var activarZoomMandel = function() {
    activarZoom(canvasMandelbrot.canvas, btnZoomMandel, seleccionarC, zoomMandel);
};
btnZoomMandel.onclick = activarZoomMandel;

var reiniciarZoomMandel = function() {
    controlador.reiniciarZoomMandelbrot();
};
btnResetMandel.addEventListener("click", reiniciarZoomMandel);

var zoomJulia = function(evt) {
    controlador.zoomJulia(obtenerPunto(evt));
};
var activarZoomJulia = function() {
    activarZoom(canvasJulia.canvas, btnZoomJulia, undefined, zoomJulia);
};
btnZoomJulia.onclick = activarZoomJulia;

var reiniciarZoomJulia = function() {
    controlador.reiniciarZoomJulia();
};
btnResetJulia.addEventListener("click", reiniciarZoomJulia);

var cambiarNroIteraciones = function(txt, fn) {
    var nroIter = prompt("Ingrese el número de iteraciones", txt.innerHTML);
    if (nroIter === null) {
        return;
    }

    nroIter = parseInt(nroIter);
    if (isNaN(nroIter) || nroIter < 1) {
        alert("Número de iteraciones inválido.");
        return;
    }

    fn.call(controlador, nroIter);
    txt.innerHTML = nroIter;
};
var cambiarIteracionesMandel = function() {
    cambiarNroIteraciones(txtNroIterMandel, controlador.definirIteracionesMandelbrot);
};
txtNroIterMandel.addEventListener("click", cambiarIteracionesMandel);

var cambiarIteracionesJulia = function() {
    cambiarNroIteraciones(txtNroIterJulia, controlador.definirIteracionesJulia);
};
txtNroIterJulia.addEventListener("click", cambiarIteracionesJulia);
