let menu=document.querySelector(".nav__menu");
let openMenuBtn=document.querySelector(".nav__open__menu");
let closeMenuBtn=document.querySelector(".nav__close__menu");

function toggleMenu() {
    menu.classList.toggle("nav__menu__opened");
}
openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);