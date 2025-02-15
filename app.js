const menu=document.querySelector(".nav__menu");
const openMenuBtn=document.querySelector(".nav__open__menu");
const closeMenuBtn=document.querySelector(".nav__close__menu");

function toggleMenu() {
    menu.classList.toggle("nav__menu__opened");
}
//menu.addEventListener("click", toggleMenu);
openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

//a partir de aqui es para mostrar menu activado en la sección clickeada
const menuLinks = document.querySelector('.menu a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`.menu a[href="#${id}"]`);
            if (entry.isIntersecting) {
                document.querySelector(".menu a.selected").classList.remove("selected");
                menuLink.classList.add("selected");
            }
        });
    }, {rootMargin: "-30% 0px -70% 0px"});

menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", function(){
        menu.classList.remove("nav__menu__opened");
    })
    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
        observer.observe(target);
    } 
});
