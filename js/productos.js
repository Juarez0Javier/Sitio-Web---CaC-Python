function fetchProducts() {
    fetch("http://localhost:5000/api/products/all/")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                let productElement = document.createElement("div");
                productElement.innerHTML = `
                    <p>Nombre: ${product.nombre}</p>
                    <p>Precio: $${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                `;
                document.getElementById("productContainer").appendChild(productElement);
            });
        })
        .catch(error => console.log("Ocurrió un error! " + error));
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
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}
