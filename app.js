const navMenu = document.querySelector('.nav__menu');
const mobileMenu = document.getElementById('mobile__menu');

mobileMenu.addEventListener('click',()=>{
    navMenu.classList.toggle('active');
});
 
//a partir de aqui es para mostrar menu activado
const navLinks = document.querySelectorAll('.nav__menu a');
navLinks.forEach(link => {
    link.addEventListener('click',function (e){
        //ahora removemos la clase "active" de todos los enlaces
        navLinks.forEach(link => link.classList.remove('active'));
        //ahora agregamos la clase active al enlace clickeado
        this.classList.add('active');
        //cerramos el menú responsivo después de hacer clic
        if(window.innerWidth <= 768){
            navMenu.classList.remove('active');
        }
    });
});

//codigo para activar menu cuando se desliza la pantalla
const menuLinks = document.querySelectorAll('.nav__menu a[href^="#"]');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`.nav__menu a[href="#${id}"]`);

            if (entry.isIntersecting) {
                document.querySelector(".nav__menu a.active").classList.remove("active");
                menuLink.classList.add("active");
            } 
        });
    },
    {rootMargin: "-30% 0px -70% 0px"}
);
menuLinks.forEach(menuLink =>{
    menuLink.addEventListener("click", function (){
        navMenu.classList.remove("nav__menu.active");
    });
    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
        observer.observe(target);
    }
})