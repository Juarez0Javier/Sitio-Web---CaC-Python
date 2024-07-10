
const urlParams = new URLSearchParams(window.location.search);
const currentProductId = urlParams.get('prod_id');



fetchRandomProducts(currentProductId);


function fetchRandomProducts(currentProductId) {
    fetch("http://localhost:5000/api/products/published/")
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product => product.id !== parseInt(currentProductId));
            const randomProducts = getRandomElements(filteredProducts, 3);
            const recommendationsContainer = document.getElementById("three");

            if (recommendationsContainer) {
                recommendationsContainer.innerHTML = ''; // Clear any existing content

                randomProducts.forEach(product => {
                    let productElement = document.createElement("a");
                    productElement.href = `producto.html?prod_id=${product.id}`;
                    productElement.innerHTML = `
                        <article class="article">
                            <img class="miniatura" src="${product.image}" alt="${product.name}">
                            <div class="contenido">
                                <h3 class="titulo_miniatura">${product.name}</h3>
                                <p class="precio_miniatura">$${product.price}</p>
                            </div>
                        </article>
                    `;
                    recommendationsContainer.appendChild(productElement);
                });
            }
        })
        .catch(error => console.log("Ocurrió un error! " + error));
}

function getRandomElements(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
