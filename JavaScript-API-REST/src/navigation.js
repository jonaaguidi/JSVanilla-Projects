//  Logica de Navegación.
//  Location: Es una propiedad de JS en el browser, que nos permite leer la URL donde nos encontramos.
//  Hash navigation: "window.onhashchange o Element.addEventListener(`hashchange`, nameFunction);" nos permite ejecutar cierto codigo cada vez que cambie nuestro "hash".

// Llamamos a la funcion "navigator" cuando "load/carga" la app y cuando exite un cambio en el "hash/hashchange"
window.addEventListener(`load`, navigator,);
window.addEventListener(`hashchange`, navigator,);

// Hago que lo botones me redireccionen al hash pedido.
trendingBtn.addEventListener("click", () => location.hash = "trends");
searchFormBtn.addEventListener("click", () => { location.hash = `search=${searchFormInput.value}` });
arrowBtn.addEventListener('click', () => {
    history.back();
 });

//  Lo que queremos hacer es "Leer" el "hash" donde nos encontramos y dependiendo ese "hash" mostrar cierta información que necesitemos.
//  Funcion "navigator" la llamare cuando inicie la app y cada vez que cambie el "hash". 
//  Dentro tendremos una validacion de las URLS donde si "location.hash.startswith(...)" el hash inicia con determinado parametro, realizara cierta acción, estas acciones son "Manipular el DOM y sus clases" para mostrar o ocultar determinados elementos.

function navigator() {

    if (location.hash.startsWith(`#trends`)) {
        trendsPage();
    } else if (location.hash.startsWith(`#search=`)) {
        searchPage();
    }
    else if (location.hash.startsWith(`#movie=`)) {
        moviedetailsPage();
    }
    else if (location.hash.startsWith(`#category=`)) {
        categoriesPage();
    }
    else {
        homePage();
    };

    function smoothscroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
    };
    smoothscroll();
};

function homePage() {

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMoviesPreview();
    getCategoriesPreview();
};

function categoriesPage() {

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    // Destructuracion del array, separo con el metodo .split , inserto el nombre a cada category
    const [_, categoryData] = location.hash.split("=");
    const [categoryID, categoryName] = categoryData.split("-");
    const completeName = decodeURI(categoryName);
    headerCategoryTitle.innerHTML = completeName;

    getMoviesByCategory(categoryID);
};

function moviedetailsPage() {
    console.log("Estas en la pagina #movie");

    headerSection.classList.add("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");

    const [ _ , id ] = location.hash.split("=");
    getMovieByID(id);
};

function searchPage() {
    console.log("Estas en la pagina #search");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [ _ , query ] = location.hash.split("=");
    getMoviesBySearch(query);

};

function trendsPage() {
    console.log("Estas en la pagina #trends");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    headerCategoryTitle.textContent = "Tendencias del dia";
    getTrendingMovies();
};
