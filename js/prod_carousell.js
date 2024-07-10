const BASE_URL = "http://localhost:5000";

let card = document.querySelector(".card");
let cardCopia = card.cloneNode(true);

card.remove();

let card_con = document.querySelector(".carrusel-contenedor");


fetchCarousellProducts();

document.addEventListener("DOMContentLoaded", EnableCarousell)




function fetchCarousellProducts() {
    
    fetchData(BASE_URL + "/api/products/all/", "GET", (data) => {
        
        const randomProducts = getRandomElements(data, 4);


        for (let product of randomProducts)
        {
            let newCard= cardCopia.cloneNode(true);

            newCard.querySelector(".imgcard").setAttribute("src",product.image);
            newCard.querySelector("h3").innerHTML = product.name;

            card_con.appendChild(newCard);
        }
    })
}

function getRandomElements(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


function EnableCarousell(){
        const carruselContenedor = document.querySelector(".carrusel-contenedor");
        const carruselBotonAnterior = document.querySelector(".carrusel-anterior");
        const carruselBotonSiguiente = document.querySelector(".carrusel-siguiente");

        let posicionActual = 0;
        const anchoElemento = carruselContenedor.children[0].offsetWidth+40;
        const cantidadElementos = carruselContenedor.children.length;

        carruselBotonAnterior.addEventListener("click", () => {
            if (posicionActual > 0) {
                posicionActual--;
                actualizarCarrusel();
            }
        });

        carruselBotonSiguiente.addEventListener("click", () => {
            if (posicionActual < cantidadElementos - 3) {
                posicionActual++;
                actualizarCarrusel();
            }
        });
        
        function actualizarCarrusel() {
            const desplazamiento = -posicionActual * anchoElemento;
            carruselContenedor.style.transform = `translateX(${desplazamiento}px)`;
        } 
}