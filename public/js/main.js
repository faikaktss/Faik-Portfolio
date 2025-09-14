//MAİN KISIM
document.addEventListener('DOMContentLoaded',function(){
    initSmoothScroll();
    initMobileMenu();
    initBackToTopButton();
    initScrollAnimations();
    initNavbarScroll();
    scrollToElement();
})


//Scroll navigasyon kısmı
function initSmoothScroll(){
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link =>{
        link.addEventListener('click',function(e){
            e.preventDefault();

            const targetId = this.getAttribute('href')
            const targetSection = document.querySelector(targetId)

            if(targetSection){
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar? navbar.offsetHeight : 0;

                const targetPosition = targetSection.offsetTop - navbarHeight -20;//-20 daha rahat okuyabileyim diye bıraktım

                window.scrollTo({
                    top:targetPosition,
                    behavior:'smooth'
                });

                closeMobileMenu();
            }
        });
    });
}


//Mobil Menü kısmı

function initMobileMenu(){
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if(mobileMenuBtn && mobileMenu){
        mobileMenuBtn.addEventListener('click',function(){
            const isOpen = mobileMenu.classList.contains('active');

            if(isOpen){
                closeMobileMenu();
            }else{
                openMobileMenu();
            }
        });

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link =>{
            link.addEventListener('click',function(){
                closeMobileMenu();
            });
        });

        mobileMenuBtn.addEventListener('click',function(e){
            if(e.target === mobileMenu)
                closeMobileMenu();
        });

        function openMobileMenu(){
            mobileMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            body.style.overflow = 'hidden'; 
        }

        function closeMobileMenu(){
            if(mobileMenuBtn && mobileMenu){
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = '';
            }
        }
    }

    window.closeMobileMenu = closeMobileMenu;
}



//Başa dönme düğmesi
function initBackToTopButton(){
    const backToTopBtn = document.querySelectorAll('.back-to-top');

    if(backToTopBtn){
        window.addEventListener('scroll',function(){
            if(window.pageYOffset >300){
                backToTopBtn.classList.add('visible');
            }else{
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click',function(){
            window.scrollTo({
                top:0,
                behavior:'smooth'
             });
        });
    }
}



//Kaydırma animasyonları
function initScrollAnimations(){
    const observerOptions = {
        threshold:0.1,
        rootMargin:'0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries){
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(  '.skill-category, .contact-item, .hero-stats .stat-item, .about-text p');

    revealElements.forEach(el =>{
        el.classList.add('reveal-element');
        observer.observe(el);
    });
}


//Navbar efekti
function initNavbarScroll(){
    const navbar = document.querySelector('.navbar');
    
    if(navbar){
        window.addEventListener('scroll',function(){
            if(window.pageYOffset >50)
                navbar.classList.add('scrolled');
            else
                navbar.classList.remove('scrolled');
        });
    }    
}


//Yardımcı olarak ek yaptığım fonksiyonlar
function scrollToElement(elementId){
    const element = document.getElementById(elementId);
    if(element){
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = element.offsetTop - navbarHeight -20;


        window.scrollTo({
            top:targetPosition,
            behavior:'smooth'
        });
    }    
}



console.log(`
%c🚀 FAİK AKTAŞ Portfolio
%cBackend Developer | Node.js Specialist
%cGitHub: https://github.com/faikaktss
%cLinkedIn: https://linkedin.com/in/faikaktss
%cEmail: faikaktss06@gmail.com
`, 
'color: #4f7fff; font-size: 20px; font-weight: bold;',
'color: #888; font-size: 14px;',
'color: #333;',
'color: #4f7fff;',
'color: #4f7fff;',
'color: #4f7fff;'
);