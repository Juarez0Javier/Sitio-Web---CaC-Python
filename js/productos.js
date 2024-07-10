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
    fetch("http://localhost:5000/api/products/published/")
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
                            <img class="miniatura" src="${product.image}" alt="${product.name}" >
                            <div class="contenido">
                                <h3 class="titulo">${product.name}</h3>
                                <p class="precio">$${product.price}</p>
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

            const productQuota = document.getElementById("cuotas");

            let purchaseButton = document.querySelector(".boton_compra");

            productImage.src = product.image;
            productImage.alt = product.name;
            productName.textContent = product.name;
            productPrice.textContent = `$${product.price}`;
            productQuota.textContent = `$${(Math.round((product.price /12) * 100) / 100)}`;
            productStock.innerHTML = `Stock disponible: ${product.stock > 0 ? '<i class="bx bx-check-square"></i>' : 'Agotado'}`;
            productDescription.textContent = product.desc;

            if(product.stock <= 0)
                purchaseButton.setAttribute("class","false_compra");
            else
            {
                purchaseButton.addEventListener("click",buyProduct);
                purchaseButton.id = product.id;
                purchaseButton.newStock = (product.stock-1);
            }
        })
        .catch(error => console.log("Ocurrió un error! " + error));
}

function buyProduct(event) {

    let productId = event.currentTarget.id;
    let newStock = event.currentTarget.newStock

    console.log(productId);
    console.log(newStock);


    fetch(`http://localhost:5000/api/products/refresh_stock/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: newStock })
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}
