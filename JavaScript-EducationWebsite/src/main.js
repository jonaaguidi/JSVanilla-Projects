// DOM elements
const navbarNav = document.querySelector(".navbar-nav");
const navbarToggle = document.querySelector(".nav-toggle-btn");

// Toogle functionality
navbarToggle.addEventListener("click", () => {
    navbarNav.classList.toggle("active");
    navbarToggle.classList.toggle("active");
});