// Clase PRODUCTO 
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// Clase INTERFAZ
class UI {
    addProduct(product) {
        const productList = document.getElementById(`product-list`);
        const element = document.createElement(`div`);
        element.innerHTML = `
    <div class="card text-center mb-4">
        <div class="card-body">
            <strong>Product</strong>: ${product.name} 
            <br>
            <strong>Price</strong>: ${product.price}
            <strong>Year</strong>: ${product.year}
            <br>
            <button class="btn btn-danger" name="delete">Delete</button>
        </div>
    </div>`;
        productList.appendChild(element);
    };

    resetForm() {
        const form = document.getElementById(`product-form`);
        form.reset();
    }

    deleteProduct(element) {
        if (element.name === "delete") {
            element.parentElement.parentElement.remove();
            this.showMessage("Producto Eliminado correctamente", "danger")
        };
    }

    showMessage(message, cssClass) {
        // Alert
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        // DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");

        // Insert Message in the UI
        container.insertBefore(div, app);

        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000);

    }
}

// Events DOM
const form = document.getElementById(`product-form`);
const newProduct = (e) => {
    // Cancelo el comportamiento por defecto
    e.preventDefault();

    // Obtengo los valores del formulario
    const name = document.getElementById(`name`).value;
    const price = document.getElementById(`price`).value;
    const year = document.getElementById(`year`).value;

    // Instancia del la clase Product con los valores del formulario
    const product = new Product(name, price, year);

    // Instacia de la interfaz donde ejecuto la funcion addProduct y resetForm.
    const ui = new UI;
    
    // Input User Validation
    if (name === "" || price === "" || year === "") {
        return ui.showMessage("Porfavor inserta la información", "danger");
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage(`Producto agregado satisfactoriamente`, `success`);

};

form.addEventListener(`submit`, newProduct);

const list = document.getElementById("product-list");
list.addEventListener("click", function (element) {
    const ui = new UI;
    ui.deleteProduct(element.target);
    element.preventDefault();
})


