/* ============================================
   MAIN.JS - Arung Jeram Sungai Outbound Air
   ============================================ */

// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
function handleNavbar() {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleNavbar, { passive: true });
handleNavbar();

// ---- Mobile Menu Toggle ----
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- AOS Scroll Animations ----
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initAOS);

// ---- Scroll to Top FAB ----
const fabTop = document.getElementById('fab-top-btn');

function handleFabTop() {
    if (window.scrollY > 400) {
        fabTop.style.display = 'flex';
        fabTop.style.alignItems = 'center';
        fabTop.style.justifyContent = 'center';
    } else {
        fabTop.style.display = 'none';
    }
}
window.addEventListener('scroll', handleFabTop, { passive: true });

fabTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Smooth Anchor Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---- Counter Animation ----
function animateCounter(el, target, duration) {
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString('id-ID');
    }, 16);
}

// ---- Navbar Hamburger Animation ----
navToggle.addEventListener('click', function () {
    const spans = this.querySelectorAll('span');
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// ---- Fix hamburger on close ----
navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ---- Lazy image reveal ----
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ---- Console Greeting ----
console.log('%c🌊 Arung Jeram Sungai Outbound Air', 'font-size:18px; color:#0077b6; font-weight:bold;');
console.log('%cSelamat datang! Website ini dibuat dengan ❤️ untuk petualangan terbaik Anda.', 'font-size:12px; color:#64748b;');
