// Kurtel İletişim Cihazları - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            if (counter.dataset.done) return;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Check if element is in viewport
            const rect = counter.getBoundingClientRect();
            if(rect.top < window.innerHeight && rect.bottom >= 0) {
                 updateCount();
                 counter.dataset.done = 'true'; // Prevent running again (keep the class for styling)
            }
        });
    };

    window.addEventListener('scroll', animateCounters);
    
    // Initial check for counter
    animateCounters();

    // Reference Carousel: auto-advance, prev/next, pause, keyboard, reduced motion
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const track = carousel.querySelector('.ref-track');
        const section = carousel.closest('section');
        const prevBtn = section.querySelector('[data-carousel-prev]');
        const nextBtn = section.querySelector('[data-carousel-next]');
        const toggleBtn = section.querySelector('[data-carousel-toggle]');
        const progress = carousel.querySelector('.carousel-progress span');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!track) return;

        let userPaused = reduceMotion.matches;
        let interactionPaused = false;
        let inView = false;
        let resumeTimer;

        const stepSize = () => {
            const card = track.querySelector('.ref-card');
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
        };

        const go = (dir) => {
            const max = track.scrollWidth - track.clientWidth;
            const behavior = reduceMotion.matches ? 'auto' : 'smooth';
            if (dir > 0 && track.scrollLeft >= max - 4) {
                track.scrollTo({ left: 0, behavior });
            } else if (dir < 0 && track.scrollLeft <= 4) {
                track.scrollTo({ left: max, behavior });
            } else {
                track.scrollBy({ left: dir * stepSize(), behavior });
            }
        };

        const updateProgress = () => {
            if (!progress) return;
            const ratio = (track.scrollLeft + track.clientWidth) / track.scrollWidth;
            progress.style.width = `${Math.min(100, ratio * 100)}%`;
        };

        const updateToggle = () => {
            if (!toggleBtn) return;
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-pause', !userPaused);
            icon.classList.toggle('fa-play', userPaused);
            toggleBtn.setAttribute('aria-label', userPaused ? 'Otomatik kaydırmayı başlat' : 'Otomatik kaydırmayı durdur');
        };

        // Pause briefly after manual interaction, then resume
        const pauseForInteraction = () => {
            interactionPaused = true;
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => { interactionPaused = false; }, 6000);
        };

        setInterval(() => {
            if (!userPaused && !interactionPaused && inView && !document.hidden) go(1);
        }, 3500);

        prevBtn && prevBtn.addEventListener('click', () => { go(-1); pauseForInteraction(); });
        nextBtn && nextBtn.addEventListener('click', () => { go(1); pauseForInteraction(); });
        toggleBtn && toggleBtn.addEventListener('click', () => { userPaused = !userPaused; updateToggle(); });

        carousel.addEventListener('mouseenter', () => { interactionPaused = true; clearTimeout(resumeTimer); });
        carousel.addEventListener('mouseleave', () => { interactionPaused = false; });
        carousel.addEventListener('focusin', () => { interactionPaused = true; clearTimeout(resumeTimer); });
        carousel.addEventListener('focusout', () => { interactionPaused = false; });
        track.addEventListener('touchstart', pauseForInteraction, { passive: true });

        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
        });

        track.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(entries => {
                inView = entries[0].isIntersecting;
            }, { threshold: 0.3 }).observe(carousel);
        } else {
            inView = true;
        }

        updateToggle();
        updateProgress();
    });

    // Particles.js Configuration for Hero Section
    if(typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#4361ee", "#ff6b35"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4361ee",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let the form submit naturally to Formspree
            // We just add a small visual feedback
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Gönderiliyor...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 3000);
        });
    }
});
