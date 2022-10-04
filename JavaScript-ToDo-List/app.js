window.addEventListener("load", () => {
    // Referenciar elementos del DOM
    const formCrear = document.getElementById("form-create");
    const inputCrear = document.getElementById("create");
    const inputBuscar = document.getElementById("search");
    const list = document.getElementById("ToDo-List");

    // Funcion 1 - Enviar nuevas tareas.
    formCrear.addEventListener("submit", (e) => {
        e.preventDefault();
        capturarValor();
    })

    const capturarValor = () => {
        const nuevaTarea = inputCrear.value.trim();

        if (nuevaTarea.length) {
            mostrarTareaDOM(nuevaTarea);
        } else {
            alert("Debes ingresar una tarea!");
        };

        function mostrarTareaDOM(tarea) {
            const liDOM =
            `<li>
            <strong>${tarea}</strong>
            <i class="fa-solid fa-delete-left borrar"></i>
            </li>`;
            list.innerHTML += liDOM;
        };
    };

    // Funcion 2 - Buscar Tareas
    inputBuscar.addEventListener('keyup', () => {
        const char = inputBuscar.value.trim()
        busqueda(char)
    });

    const busqueda = (string) => {
        let arreglo = Array.from(list.children)
        arreglo
            .filter(texto => !texto.textContent.toLowerCase().includes(string))
            .forEach(stringFilter => {
                stringFilter.classList.add(`textFiltrado`)
            })

        arreglo
            .filter(texto => texto.textContent.toLowerCase().includes(string))
            .forEach(stringFilter => {
                stringFilter.classList.remove(`textFiltrado`)
            })
    }

    // Funcion 3 - Eliminar Tareas
    list.addEventListener("click",(e)=>{
        if (e.target.classList.contains("borrar")) {
            e.target.parentElement.remove();
        }
        inputBuscar.value = ""
    })
});



