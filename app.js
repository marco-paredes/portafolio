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

//para efecto de imagen independiente
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

//envía correo desde la sección de contactos
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

//para blogs
var data = {q: 'https://www.linkedin.com/pulse/parte-7-final-kanban-un-sistema-visual-que-transforma-marco-paredes-qj3xe'}
var data1 = {q:'https://www.linkedin.com/pulse/la-importancia-de-comunicaci%25C3%25B3n-organizacional-en-tiempos-paredes-jouxe'}
var data2 = {q:'https://www.linkedin.com/pulse/m%25C3%25A9tricas-clave-para-evaluar-la-eficacia-de-marco-paredes-8whne'}

var key = "b9948580fd578ecac9acfa6773a26b77"
//articulo actual
    fetch('https://api.linkpreview.net', {
      method: 'POST',
      headers: {
        'X-Linkpreview-Api-Key': key,
      },
      mode: 'cors',
      body: JSON.stringify(data),
    })
    
      .then(res => res.json())
      .then(response => {
    document.getElementById("mytitle").innerHTML = response.title
    document.getElementById("mydescription").innerHTML = response.description
    document.getElementById("myimage").src = response.image
    document.getElementById("myurl").innerHTML = response.url
    })
//artículo antiguo
    fetch('https://api.linkpreview.net', {
        method: 'POST',
        headers: {
          'X-Linkpreview-Api-Key': key,
        },
        mode: 'cors',
        body: JSON.stringify(data1),
      })
      
        .then(res => res.json())
        .then(response => {
      document.getElementById("mytitle1").innerHTML = response.title
      document.getElementById("mydescription1").innerHTML = response.description
      document.getElementById("myimage1").src = response.image
      document.getElementById("myurl1").innerHTML = response.url
      })

//artículo llamativo
fetch('https://api.linkpreview.net', {
    method: 'POST',
    headers: {
      'X-Linkpreview-Api-Key': key,
    },
    mode: 'cors',
    body: JSON.stringify(data2),
  })
  
    .then(res => res.json())
    .then(response => {
  document.getElementById("mytitle2").innerHTML = response.title
  document.getElementById("mydescription2").innerHTML = response.description
  document.getElementById("myimage2").src = response.image
  document.getElementById("myurl2").innerHTML = response.url
  })

//para ver video incrustado
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function playApi(videoId){
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars:{
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0
        }
    });
}

function openVideoPopup(videoId) {
    const popup = document.getElementById('videoPopup');
    popup.style.display = 'flex';
    if (player) {
        player.destroy();
    }
    playApi(videoId);
}

function closeVideoPopup() {
    const popup = document.getElementById('videoPopup');
    popup.style.display = 'none';
    if (player) {
        player.stopVideo();
    }
}

document.querySelectorAll('.openVideoBtn').forEach(button =>{
    button.addEventListener('click', ()=>{
        const videoId = button.getAttribute('data-video-id');
        openVideoPopup(videoId);
    });  
});

document.getElementById('closeVideoBtn').addEventListener('click', closeVideoPopup);
