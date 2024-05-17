document.addEventListener("DOMContentLoaded", function() {
    const carruselContenedor = document.querySelector(".carrusel-contenedor");
    const carruselBotonAnterior = document.querySelector(".carrusel-anterior");
    const carruselBotonSiguiente = document.querySelector(".carrusel-siguiente");

    let posicionActual = 0;
    const anchoElemento = carruselContenedor.children[0].offsetWidth;
    const cantidadElementos = carruselContenedor.children.length;

    carruselBotonAnterior.addEventListener("click", () => {
        if (posicionActual > 0) {
            posicionActual--;
            actualizarCarrusel();
        }
    });

    carruselBotonSiguiente.addEventListener("click", () => {
        if (posicionActual < cantidadElementos - 1) {
            posicionActual++;
            actualizarCarrusel();
        }
    });

    function actualizarCarrusel() {
        const desplazamiento = -posicionActual * anchoElemento;
        carruselContenedor.style.transform = `translateX(${desplazamiento}px)`;
    }
});
