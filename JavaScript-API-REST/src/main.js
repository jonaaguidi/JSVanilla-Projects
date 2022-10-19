const API_KEY = "90c2c9c219f97f4a17f3454fa7eff34c";

// Utils - Utilidades / Funcion que renderiza las peliculas una por una, DRY - Don’t Repeat Yourself (No lo repitas tú mismo)
function createMovies(movies, container) {

    // Poniendo un "String vacio" en el elemento que duplica, antes de renderizar los elementos de la api, hace que evitemos la doble carga de info. 
    container.innerHTML = "";

    movies.forEach(movie => {

        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");
        // Cada vez que hago click, cambia el hash a la descripcion de la pelicula.
        movieContainer.addEventListener("click", () => location.hash = `#movie=${movie.id}`);

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);

    });
};

function createCategories(categories, container) {

    container.innerHTML = "";

    categories.forEach(category => {

        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id", `id${category.id}`);
        categoryTitle.addEventListener("click", () => {
            location.hash = `category=${category.id}-${category.name}`
        });
        const categoryTitleText = document.createTextNode(`${category.name}`);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);

    });

}

// FUNCIONES QUE CONSUMEN API´S
// Funcion asincrona que trae con fetch() a las peliculas "TENDENCIAS DEL DIA", ademas "Itera" con .forEach por cada una de las peliculas, para luego "Manipular el DOM" y crear cada contendor e img.
async function getTrendingMoviesPreview() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList);
};


// Funcion asincrona que trae con fetch() a las "CATEGORIAS DE LAS PELICULAS", ademas "Itera" con .forEach por cada una de las categorias, para luego "Manipular el DOM" y crear el listado.
async function getCategoriesPreview() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es`);
    const data = await res.json();
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
};


// Funcion asincrona que trae con fetch() a las "PELICULAS POR CATEGORIAS", ademas "Itera" con .forEach por cada una de las categorias, para luego "Manipular el DOM" y crear el listado.
async function getMoviesByCategory(categoryID) {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryID}`);
    const data = await res.json();
    const movies = data.results;
    createMovies(movies, genericSection);

};


// Funcion asincrona que trae con fetch() a un "endpoint" (&query=) que lo que hace es consultar por palabras clave.
async function getMoviesBySearch(query) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    const movies = data.results;
    createMovies(movies, genericSection);
};


// Funcion asincrona que trae con fetch() a las "Peliculas en tendencias"
async function getTrendingMovies() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    const movies = data.results;
    createMovies(movies, genericSection);
};


// Funcion asincrona que trae con fetch() a la "Descripcion de las peliculas"
async function getMovieByID(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    headerSection.style.background = `url(${movieImgUrl}),
    linear-gradient(180deg,rgba(0, 0, 0, 0.35) 19.27%,rgba(0, 0, 0, 0) 29.17%)`;

    movieDetailTitle.textContent = `${data.original_title}`;
    movieDetailDescription.textContent = `${data.overview}`;
    movieDetailScore.textContent = Math.round(`${data.vote_average}`);

    createCategories(data.genres, movieDetailCategoriesList);

    getRelatedMoviesById(id);

};


async function getRelatedMoviesById(id){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`);
    const data = await res.json();
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);

}