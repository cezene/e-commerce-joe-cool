// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');


    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }


    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }


    mobileMenuBtn.addEventListener('click', function () {
        if (mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', closeMobileMenu);

    mobileMenuOverlay.addEventListener('click', function (e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});


window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Flickity Carousel 
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.hero-carousel');

    if (carousel) {
        const flkty = new Flickity(carousel, {
            cellAlign: 'center',
            contain: true,
            autoPlay: 4000,
            wrapAround: true,
            pauseAutoPlayOnHover: false,
            pageDots: true,
            prevNextButtons: true,
            draggable: true,
            friction: 0.8,
            selectedAttraction: 0.2,
            freeScroll: false,
            adaptiveHeight: false
        });

        function setupSlide(index) {
            const cells = carousel.querySelectorAll('.carousel-cell');

            cells.forEach((cell, i) => {
                const img = cell.querySelector('img');
                const overlay = cell.querySelector('.carousel-overlay');
                const animation = cell.querySelector('.person-animation');

                if (i === index) {
                    img.style.transform = 'scale(1.05)';
                    overlay.style.opacity = '1';

                    if (window.innerWidth <= 768) {
                        overlay.style.transform = 'none';
                        overlay.style.left = 'auto';
                        overlay.style.top = 'auto';
                        overlay.style.bottom = 'auto';
                        overlay.style.position = 'relative';
                    } else {
                        overlay.style.transform = 'translateY(-50%) translateX(0)';
                        overlay.style.left = '8%';
                        overlay.style.top = '50%';
                        overlay.style.bottom = 'auto';
                        overlay.style.position = 'absolute';
                    }

                    if (animation) {
                        animation.style.opacity = '1';
                    }

                    // Animações de entrada do texto
                    const h2 = overlay.querySelector('h2');
                    const p = overlay.querySelector('p');
                    const btn = overlay.querySelector('.btn-primary');

                    if (h2) {
                        h2.style.animation = 'slideInLeft 0.8s ease-out';
                    }
                    if (p) {
                        p.style.animation = 'slideInLeft 0.8s ease-out 0.2s both';
                    }
                    if (btn) {
                        btn.style.animation = 'slideInLeft 0.8s ease-out 0.4s both';
                    }
                }
            });
        }

        flkty.on('change', function (index) {
            setupSlide(index);
        });

        setupSlide(0);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function () {

    const lazyImages = document.querySelectorAll('.lazy-load');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');

                if (dataSrc) {
                    const tempImg = new Image();
                    tempImg.src = dataSrc;

                    tempImg.onload = () => {
                        img.src = dataSrc;
                        img.classList.add('lazy-loaded');
                        img.classList.remove('lazy-load');
                    };
                }

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    const animatedElements = document.querySelectorAll('[data-animate], .collection-header-text, .collection-image, .collection-text');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});
// Lazy Loading para Produtos
document.addEventListener('DOMContentLoaded', function () {
    
    const lazyProductImages = document.querySelectorAll('.lazy-load-product');
    
    // Contador para saber quando ambas as imagens de um produto carregaram
    const loadedImages = new Map();
    
    const productImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                const productImage = img.closest('.product-image');
                
                if (dataSrc) {
                    // Adiciona classe loading ao container
                    if (productImage) {
                        productImage.classList.add('loading');
                    }
                    
                    // Criar uma nova imagem para pré-carregar
                    const tempImg = new Image();
                    tempImg.src = dataSrc;
                    
                    tempImg.onload = () => {
                        // Pequeno delay para suavizar a transição
                        setTimeout(() => {
                            img.src = dataSrc;
                            img.classList.add('lazy-loaded');
                            img.classList.remove('lazy-load-product');
                            
                            // Remove loading do container quando terminar
                            if (productImage) {
                                productImage.classList.remove('loading');
                            }
                        }, 100);
                    };
                    
                    tempImg.onerror = () => {
                        console.error('Erro ao carregar imagem:', dataSrc);
                        if (productImage) {
                            productImage.classList.remove('loading');
                        }
                    };
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px', // Começa a carregar 100px antes
        threshold: 0.01
    });
    
    lazyProductImages.forEach(img => {
        productImageObserver.observe(img);
    });
    
    
    const productCards = document.querySelectorAll('.product-card');
    
    const cardAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        cardAnimationObserver.observe(card);
    });
});