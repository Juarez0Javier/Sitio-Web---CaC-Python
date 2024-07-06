function fetchProducts() {
    fetch("http://localhost:5000/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                let productElement = document.createElement("div");
                productElement.innerHTML = `
                    <p>Nombre: ${product[1]}</p>
                    <p>Precio: $${product[2]}</p>
                    <p>Stock: ${product[3]}</p>
                `;
                document.getElementById("productContainer").appendChild(productElement);
            });
        })
        .catch(error => console.log("Ocurrió un error! " + error));
}

function buyProduct(productId, newStock) {
    fetch("http://localhost:5000/buy_product", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId, new_stock: newStock })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}
