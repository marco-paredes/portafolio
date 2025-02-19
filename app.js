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

//codigo para activar elemento de menu cuando se desliza la pantalla
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

//para efecto zoom grupal
/*
const zoomElements = document.querySelectorAll('.zoom');
const observer1 = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add('mostrar');
            }else {
                entry.target.classList.remove('mostrar');
            }
        });
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }
);
zoomElements.forEach((element)=>{
    observer1.observe(element);
});
*/
//funcion para efecto grupal
function efectoGrupal(div) {
    const grupo = document.querySelectorAll(div);
    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add('mostrar');
            }else {
                entry.target.classList.remove('mostrar');
            }
        });
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }
);
    grupo.forEach((element)=>{
    observer.observe(element);
});
}

//para efecto de imagen
function muestraEfecto(div) {
    div.classList.add('mostrar');
    window.addEventListener('scroll',function(){
        var scrollTop = window.scrollY;
        var offsetTop = div.offsetTop;
        var viewportHeight = window.innerHeight;
        
        if (scrollTop + viewportHeight > offsetTop && scrollTop < offsetTop + div.offsetHeight) {
            div.classList.add('mostrar');
            } else {
                div.classList.remove('mostrar');
            }
    });
}
//efectos independientes
efectoGrupal('.presentacion__imagen');
efectoGrupal('.presentacion__titulo');
efectoGrupal('.enlaces__v');
efectoGrupal('.about__logo');
efectoGrupal('.about__content');

//efectos grupales
efectoGrupal('.zoom'); //efecto del mismo div en varios elementos con zoom
efectoGrupal('.entrada__der');
efectoGrupal('.entrada__izq');
efectoGrupal('.entrada__abajo');
efectoGrupal('.entrada__arriba');
efectoGrupal('.vanish');

emailjs.init('oGwAV1I2Fxvebhw5F');
document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    emailjs.send('service_6d52jla', 'template_by0ocil',{
        nombre: nombre,
        email: email,
        mensaje: mensaje
    })
    .then(()=>{
        document.getElementById('mensaje__enviado').classList.remove('ocultar');
        document.getElementById('contact-form').reset();
    })
    .catch((error) => {
        console.error('Error al enviar el mensaje: ', error);
        alert('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
    });
});
//<button type="submit">Enviar</button>
//servicio id: service_6d52jla
//template id: template_by0ocil
//apikey: oGwAV1I2Fxvebhw5F