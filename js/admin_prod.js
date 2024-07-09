//The server's url
let BASE_URL = "http://localhost:5000"


let product = document.querySelector(".Prod");
let productCopia = product.cloneNode(true);

product.remove();


let prod_con = document.querySelector(".Prod_Listing");




function Get_All_Products(){
    fetchData(BASE_URL + "/api/products/all/", "GET", (data) => {


        for (let product of data) {
            
            let newProd = productCopia.cloneNode(true);

            newProd.querySelector(".name").innerHTML = product.nombre;
            newProd.querySelector(".l_name").innerHTML = product.long_name;

            let Image = newProd.querySelector(".image>img");
            Image.setAttribute("src", product.imagen);
            Image.setAttribute("class", "miniatura");

            newProd.querySelector(".descr").innerHTML = product.descripcion;
            newProd.querySelector(".price").innerHTML = "$" + product.precio;

            let Stock = newProd.querySelector(".stock");

            if(product.stock == -1)
                Stock.innerHTML = "Descontinuado";
            else if (product.stock == 0)
                Stock.innerHTML = "Agotado";
            else
                Stock.innerHTML = product.stock;

            let discontinueProduct = newProd.querySelector(".borrar");
            let modifyProduct = newProd.querySelector(".modi");

            discontinueProduct.addEventListener("click",Discontinue_Product);
            discontinueProduct.id = product.id;

            modifyProduct.addEventListener("click",Modify_Product);
            modifyProduct.id = product.id;
            
            prod_con.appendChild(newProd);
        }
    });
}

function Discontinue_Product(event)
{
    let id = event.currentTarget.id;

    let url = BASE_URL + '/api/products/delete/' + id;

    fetchData(url, "DELETE", () => {
        location.reload();
    });
}

function Modify_Product(event)
{
    let id = event.currentTarget.id;
    window.location.replace("product_edit.html?prod_id=" + id);
}

Get_All_Products();