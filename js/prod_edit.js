let BASE_URL = 'http://localhost:5000';


let Form = document.querySelector(".consultas>form");

let submitButton = Form.querySelector("#form-button");

let params = new URLSearchParams(document.location.search);
let prod_id = params.get("prod_id");

function add_prod(event) {
    let data = {
        'nombre': Form.querySelector(".entry>#Name").value,
        'long name': Form.querySelector(".entry>#LongName").value,
        'descripcion': Form.querySelector(".entry>#Description").value,
        'precio': Form.querySelector(".entry>#Price").value,
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
    let data = {
        'nombre': Form.querySelector(".entry>#Name").value,
        'long name': Form.querySelector(".entry>#LongName").value,
        'descripcion': Form.querySelector(".entry>#Description").value,
        'precio': Form.querySelector(".entry>#Price").value,
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

function add_or_update(){
    if(prod_id !== null) {
        document.querySelector("#form-title").innerHTML = "Editar Producto";

        set_form_readOnly(true);

        let url = BASE_URL + '/api/products/' + prod_id;
        fetchData(url, "GET", (data) => {

            Form.querySelector(".entry>#Name").value = data.nombre;
            Form.querySelector(".entry>#LongName").value = data.long_name;
            Form.querySelector(".entry>#Description").value = data.descripcion;
            Form.querySelector(".entry>#Price").value = data.precio; 
            Form.querySelector(".entry>#Stock").value = data.stock;

            set_form_readOnly(false);
        });

        submitButton.addEventListener("click", update_prod);
    } else {
        submitButton.addEventListener("click", add_prod);
    }
}

add_or_update();