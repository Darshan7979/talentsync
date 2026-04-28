const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const pageVeil = document.querySelector('.page-veil');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealPage() {
    document.body.classList.add('is-ready');

    if (pageVeil) {
        pageVeil.classList.add('is-hidden');
        pageVeil.addEventListener('transitionend', () => {
            pageVeil.remove();
        }, { once: true });
    }
}

if (document.readyState === 'complete') {
    requestAnimationFrame(revealPage);
} else {
    window.addEventListener('load', () => {
        requestAnimationFrame(revealPage);
    }, { once: true });
}

if (menuToggle && navPanel) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navPanel.classList.toggle('open');
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navPanel.classList.remove('open');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const selector = this.getAttribute('href');
        const target = selector ? document.querySelector(selector) : null;

        if (!target) {
            return;
        }

        e.preventDefault();

        const headerOffset = header ? header.offsetHeight : 80;
        const offsetPosition = target.offsetTop - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
});

if (header) {
    header.classList.add('scrolled');
}

const pageSections = document.querySelectorAll('main section[id]');

if (pageSections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
                });
            });
        },
        {
            threshold: 0.45,
            rootMargin: '-12% 0px -35% 0px'
        }
    );

    pageSections.forEach((section) => sectionObserver.observe(section));
}

const revealTargets = document.querySelectorAll('.reveal, .fade-card');

if (revealTargets.length) {
    revealTargets.forEach((item, index) => {
        const delay = Math.min(index * 40, 280);
        item.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    if (prefersReducedMotion) {
        revealTargets.forEach((item) => {
            item.classList.add('is-visible', 'is-inview');
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('is-visible', 'is-inview');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -44px 0px'
            }
        );

        revealTargets.forEach((item) => revealObserver.observe(item));
    }
}

const textCycles = document.querySelectorAll('.text-cycle[data-words]');

textCycles.forEach((node) => {
    const words = node.dataset.words
        .split(',')
        .map((word) => word.trim())
        .filter(Boolean);

    if (words.length < 2 || prefersReducedMotion) {
        return;
    }

    let index = 0;

    setInterval(() => {
        node.classList.add('is-changing');

        setTimeout(() => {
            index = (index + 1) % words.length;
            node.textContent = words[index];
            node.classList.remove('is-changing');
        }, 180);
    }, 1400);
});

const missionCards = document.querySelectorAll('[data-animate-card]');

if (!prefersReducedMotion && missionCards.length) {
    missionCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('is-emphasis');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-emphasis');
        });
    });
}

document.querySelectorAll('.delivery-card[data-project], .project-row[data-project]').forEach((card) => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
});

const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    const syncBackToTopVisibility = () => {
        backToTopButton.classList.toggle('show', window.pageYOffset > 300);
    };

    syncBackToTopVisibility();
    window.addEventListener('scroll', syncBackToTopVisibility);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const deliveryCards = document.querySelectorAll('.delivery-card[data-project], .project-row[data-project]');
const projectsTrack = document.querySelector('.projects-zigzag');
const projectsPrevBtn = document.querySelector('[data-project-nav="prev"]');
const projectsNextBtn = document.querySelector('[data-project-nav="next"]');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card[data-testimonial]');
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual && !prefersReducedMotion) {
    const heroPanel = heroVisual.querySelector('.hero-panel');

    if (heroPanel) {
        heroVisual.addEventListener('mousemove', (event) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const tiltX = (0.5 - y) * 4;
            const tiltY = (x - 0.5) * 5;

            heroPanel.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
            heroPanel.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        });

        heroVisual.addEventListener('mouseleave', () => {
            heroPanel.style.setProperty('--tilt-x', '0deg');
            heroPanel.style.setProperty('--tilt-y', '0deg');
        });
    }
}

function getProjectSlideStep() {
    if (!projectsTrack) {
        return 0;
    }

    const firstSlide = projectsTrack.querySelector('.projects-slide');
    if (!firstSlide) {
        return projectsTrack.clientWidth;
    }

    const trackStyles = window.getComputedStyle(projectsTrack);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0');
    return firstSlide.getBoundingClientRect().width + gap;
}

function updateProjectNavState() {
    if (!projectsTrack || !projectsPrevBtn || !projectsNextBtn) {
        return;
    }

    const maxScrollLeft = projectsTrack.scrollWidth - projectsTrack.clientWidth;
    projectsPrevBtn.disabled = projectsTrack.scrollLeft <= 4;
    projectsNextBtn.disabled = projectsTrack.scrollLeft >= maxScrollLeft - 4;
}

if (projectsTrack) {
    let autoSlideTimer = null;

    const startAutoSlide = () => {
        if (prefersReducedMotion || !projectsNextBtn) {
            return;
        }

        autoSlideTimer = window.setInterval(() => {
            const atEnd = projectsNextBtn.disabled;
            projectsTrack.scrollBy({
                left: atEnd ? -projectsTrack.scrollWidth : getProjectSlideStep(),
                behavior: 'smooth'
            });
        }, 7000);
    };

    const stopAutoSlide = () => {
        if (autoSlideTimer) {
            window.clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    };

    if (projectsPrevBtn && projectsNextBtn) {
        projectsPrevBtn.addEventListener('click', () => {
            projectsTrack.scrollBy({ left: -getProjectSlideStep(), behavior: 'smooth' });
        });

        projectsNextBtn.addEventListener('click', () => {
            projectsTrack.scrollBy({ left: getProjectSlideStep(), behavior: 'smooth' });
        });

        projectsTrack.addEventListener('scroll', updateProjectNavState, { passive: true });
        window.addEventListener('resize', updateProjectNavState);
        updateProjectNavState();
    }
}

function centerTestimonialCard(card) {
    if (!testimonialTrack || !card) {
        return;
    }

    const offsetLeft = card.offsetLeft - (testimonialTrack.clientWidth - card.offsetWidth) / 2;
    testimonialTrack.scrollTo({ left: offsetLeft, behavior: 'smooth' });
}

function updateActiveTestimonial(index) {
    testimonialCards.forEach((card) => {
        card.classList.toggle('active', Number(card.dataset.testimonial) === index);
    });
}

if (testimonialTrack && testimonialCards.length) {
    let testimonialIndex = 0;
    let testimonialAutoTimer = null;
    let testimonialPaused = false;

    const goToTestimonial = (nextIndex) => {
        testimonialIndex = (nextIndex + testimonialCards.length) % testimonialCards.length;
        const activeCard = testimonialTrack.querySelector(`[data-testimonial="${testimonialIndex}"]`);
        updateActiveTestimonial(testimonialIndex);
        centerTestimonialCard(activeCard);
    };

    const startTestimonialAuto = () => {
        if (prefersReducedMotion || testimonialAutoTimer) {
            return;
        }

        testimonialAutoTimer = window.setInterval(() => {
            if (testimonialPaused) {
                return;
            }
            goToTestimonial(testimonialIndex + 1);
        }, 6500);
    };

    const stopTestimonialAuto = () => {
        if (testimonialAutoTimer) {
            window.clearInterval(testimonialAutoTimer);
            testimonialAutoTimer = null;
        }
    };

    testimonialCards.forEach((card) => {
        card.addEventListener('click', () => {
            testimonialPaused = true;
            goToTestimonial(Number(card.dataset.testimonial));
        });

        card.addEventListener('mouseenter', () => {
            testimonialPaused = true;
            stopTestimonialAuto();
        });

        card.addEventListener('mouseleave', () => {
            testimonialPaused = false;
            startTestimonialAuto();
        });
    });

    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            const index = Number(entry.target.dataset.testimonial);
            testimonialIndex = index;
            updateActiveTestimonial(index);
        });
    }, {
        root: testimonialTrack,
        threshold: 0.58
    });

    testimonialCards.forEach((card) => testimonialObserver.observe(card));
    goToTestimonial(testimonialIndex);
    startTestimonialAuto();
}

function openProjectModal(projectData) {
    if (!modal) {
        return;
    }

    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.querySelector('.modal-tag');
    const modalDescription = document.querySelector('.modal-description');
    const modalDetails = document.querySelector('.modal-details');

    if (!modalTitle || !modalTag || !modalDescription || !modalDetails) {
        return;
    }

    modalTitle.textContent = projectData.title;
    modalTag.textContent = projectData.tag;
    modalDescription.textContent = projectData.description;
    modalDetails.textContent = projectData.details;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!modal) {
        return;
    }

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

deliveryCards.forEach((card) => {
    const openFromCard = () => {
        const projectData = {
            title: card.getAttribute('data-title') || 'Project',
            description: card.getAttribute('data-description') || 'Project summary',
            details: card.getAttribute('data-details') || 'Project details coming soon.',
            tag: card.querySelector('.delivery-tag')?.textContent || 'Project'
        };

        openProjectModal(projectData);
    };

    card.addEventListener('click', openFromCard);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openFromCard();
        }
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ── AOS Init ──
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 60 });
}

// ── Particle Canvas ──
(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.5 + 0.1
        };
    }

    resize();
    for (let i = 0; i < 90; i++) particles.push(createParticle());
    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79,140,255,${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ── Animated Counters ──
(function () {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target) + (el.dataset.suffix || '+');
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target + (el.dataset.suffix || '+');
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();

// ── Contact Form Handler ──
function handleContactForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.contact-submit');
    const success = document.getElementById('form-success');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        e.target.reset();
        if (success) success.classList.add('show');
        setTimeout(() => success && success.classList.remove('show'), 5000);
    }, 1400);
}
