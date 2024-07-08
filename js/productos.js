document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prod_id = urlParams.get('prod_id');
    if (prod_id) {
        fetchProductDetails(prod_id);
    } else {
        fetchProducts();
    }
});

function fetchProducts() {
    fetch("http://localhost:5000/api/products/all/")
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById("productContainer");
            productContainer.innerHTML = ''; 

            data.forEach(product => {
                let productElement = document.createElement("div");
                productElement.classList.add('product-item');
                productElement.innerHTML = `
                    <a href="producto.html?prod_id=${product.id}" class="producto_link">
                        <article class="article">
                            <img class="miniatura" src="${product.imagen}" alt="${product.nombre}" >
                            <div class="contenido">
                                <h3 class="titulo">${product.nombre}</h3>
                                <p class="precio">$${product.precio}</p>
                                <p class="stock">Stock: ${product.stock}</p>
                            </div>
                        </article>
                    </a>
                `;
                productContainer.appendChild(productElement);
            });
        })
        .catch(error => console.log("Ocurrió un error! " + error));
}

function fetchProductDetails(prod_id) {
    fetch(`http://localhost:5000/api/products/${prod_id}`)
        .then(response => response.json())
        .then(product => {
            const productImage = document.getElementById("productImage");
            const productName = document.getElementById("productName");
            const productPrice = document.getElementById("productPrice");
            const productStock = document.getElementById("productStock");
            const productDescription = document.getElementById("productDescription");

            productImage.src = product.imagen;
            productImage.alt = product.nombre;
            productName.textContent = product.nombre;
            productPrice.textContent = `$${product.precio}`;
            productStock.innerHTML = `Stock disponible: ${product.stock > 0 ? '<i class="bx bx-check-square"></i>' : 'Agotado'}`;
            productDescription.textContent = product.descripcion;
        })
        .catch(error => console.log("Ocurrió un error! " + error));
}


function fetchRandomProducts(currentProductId) {
    fetch("http://localhost:5000/api/products/all/")
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product => product.id !== parseInt(currentProductId));
            const randomProducts = getRandomElements(filteredProducts, 6);
            const recommendationsContainer = document.getElementById("three");

            if (recommendationsContainer) {
                recommendationsContainer.innerHTML = ''; // Clear any existing content

                randomProducts.forEach(product => {
                    let productElement = document.createElement("a");
                    productElement.href = `producto.html?prod_id=${product.id}`;
                    productElement.innerHTML = `
                        <article class="article">
                            <img class="miniatura" src="${product.imagen}" alt="${product.nombre}">
                            <div class="contenido">
                                <h3 class="titulo_miniatura">${product.nombre}</h3>
                                <p class="precio_miniatura">$${product.precio}</p>
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


function buyProduct(productId, newStock) {
    fetch(`http://localhost:5000/api/products/refresh_stock/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: newStock })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        fetchProductDetails(productId);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}

