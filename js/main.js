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
document.addEventListener('DOMContentLoaded', function () {

    const lazyProductImages = document.querySelectorAll('.lazy-load-product');

    const loadedImages = new Map();

    const productImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                const productImage = img.closest('.product-image');

                if (dataSrc) {
                    if (productImage) {
                        productImage.classList.add('loading');
                    }

                    const tempImg = new Image();
                    tempImg.src = dataSrc;

                    tempImg.onload = () => {
                        setTimeout(() => {
                            img.src = dataSrc;
                            img.classList.add('lazy-loaded');
                            img.classList.remove('lazy-load-product');

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
        rootMargin: '100px',
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

document.addEventListener('DOMContentLoaded', function () {

    const bannerImg = document.querySelector('.lazy-load-banner');
    const bannerContent = document.querySelector('.banner-content');

    if (bannerImg) {
        const bannerObserver = new IntersectionObserver((entries, observer) => {
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
                            img.classList.remove('lazy-load-banner');

                            setTimeout(() => {
                                if (bannerContent) {
                                    bannerContent.classList.add('animate');
                                }
                            }, 300);
                        };

                        tempImg.onerror = () => {
                            console.error('Erro ao carregar banner:', dataSrc);
                            if (bannerContent) {
                                bannerContent.classList.add('animate');
                            }
                        };
                    }

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.1
        });

        bannerObserver.observe(bannerImg);
    }
});

//  Split Banners
document.addEventListener('DOMContentLoaded', function () {

    const splitBannerImages = document.querySelectorAll('.lazy-load-split');
    const splitBanners = document.querySelectorAll('.split-banner');

    const splitImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');

                if (dataSrc) {
                    const tempImg = new Image();
                    tempImg.src = dataSrc;

                    tempImg.onload = () => {
                        setTimeout(() => {
                            img.src = dataSrc;
                            img.classList.add('lazy-loaded');
                            img.classList.remove('lazy-load-split');
                        }, 100);
                    };

                    tempImg.onerror = () => {
                        console.error('Erro ao carregar imagem do split banner:', dataSrc);
                    };
                }

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });

    splitBannerImages.forEach(img => splitImageObserver.observe(img));



    const splitBannerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    splitBanners.forEach(banner => splitBannerObserver.observe(banner));



    let ticking = false;

    function updateParallax() {
        const splitBannersWrapper = document.querySelector('.split-banners-wrapper');

        if (splitBannersWrapper) {
            const rect = splitBannersWrapper.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

            if (scrollPercent >= 0 && scrollPercent <= 1) {
                splitBanners.forEach((banner, index) => {
                    const img = banner.querySelector('.split-banner-img');
                    if (img && img.classList.contains('lazy-loaded')) {
                        const speed = index % 2 === 0 ? 0.05 : -0.05;
                        const yPos = scrollPercent * 100 * speed;
                        img.style.transform = `translateY(${yPos}px)`;
                    }
                });
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
});