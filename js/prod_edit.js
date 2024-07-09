let BASE_URL = 'http://localhost:5000';


let Form = document.querySelector(".consultas>form");

let submitButton = Form.querySelector("#form-button");

let params = new URLSearchParams(document.location.search);
let prod_id = params.get("prod_id");

console.log(prod_id);

add_or_update();

function add_or_update(){
    if(prod_id !== null) {
        document.querySelector("#form-title").innerHTML = "Editar Producto";

        set_form_readOnly(true);


        let url = BASE_URL + '/api/products/' + prod_id;
        fetchData(url, "GET", (data) => {

            Form.querySelector(".entry>#Name").value = data.name;
            Form.querySelector(".entry>#LongName").value = data.l_name;
            Form.querySelector(".entry>#Description").value = data.desc;
            Form.querySelector(".entry>#Price").value = data.price; 
            Form.querySelector(".entry>#Stock").value = data.stock;

            set_form_readOnly(false);
        });

        submitButton.addEventListener("click", update_prod);
    } else {
        submitButton.addEventListener("click", add_prod);
    }
}

function add_prod(event) {
    let data = {
        'name': Form.querySelector(".entry>#Name").value,
        'l_name': Form.querySelector(".entry>#LongName").value,
        'image': "../img/prods/default.png",
        'desc': Form.querySelector(".entry>#Description").value,
        'price': Form.querySelector(".entry>#Price").value,
        'stock': Form.querySelector(".entry>#Stock").value
    }

    let url = BASE_URL + '/api/products/publish/';

    fetchData(url, "POST", () => {
        Form.reset();
        window.location.replace("admin.html");
    }, 
    data);
}

function update_prod(event) {
    
    let image = "../img/prods/" + Form.querySelector(".entry>#Name").value.toLowerCase() + ".png"

    console.log(image);
    
    let data = {

        'name': Form.querySelector(".entry>#Name").value,
        'l_name': Form.querySelector(".entry>#LongName").value,
        'image': image,
        'desc': Form.querySelector(".entry>#Description").value,
        'price': Form.querySelector(".entry>#Price").value,
        'stock': Form.querySelector(".entry>#Stock").value
    }

    let url = BASE_URL + '/api/products/update/' + prod_id;

    fetchData(url, "PUT", () => {
        Form.reset();
        window.location.replace("admin.html");
    }, 
    data);
}

function set_form_readOnly(value) {
    var elements = Form.elements;
    for (input of elements) { 
        input.readOnly = value;
    }
}