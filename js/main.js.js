// ===================================
// NAVBAR FUNCTIONALITY
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// TYPING ANIMATION
// ===================================
const typingText = document.getElementById('typingText');
const textToType = 'CONECTE. ASSISTA. SEM LIMITES.';
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing animation when page loads
setTimeout(typeText, 500);

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ===================================
// PARTICLES ANIMATION
// ===================================
const particlesBg = document.getElementById('particles-bg');
const particleCount = 50;

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = Math.random() > 0.5 
        ? 'rgba(43, 78, 255, 0.4)' 
        : 'rgba(155, 46, 255, 0.4)';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = '0 0 10px currentColor';
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
    
    particlesBg.appendChild(particle);
}

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.6;
        }
        50% {
            transform: translate(-20px, -40px) scale(0.9);
            opacity: 0.4;
        }
        75% {
            transform: translate(-40px, -20px) scale(1.05);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// SMOOTH SCROLL FOR ALL LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation to all cards
const cards = document.querySelectorAll('.recurso-card, .plano-card, .depoimento-card, .beneficio-item');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// ===================================
// FORM HANDLING - REVENDEDOR
// ===================================
const revendedorForm = document.getElementById('revendedorForm');

revendedorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        whatsapp: document.getElementById('whatsapp').value,
        cidade: document.getElementById('cidade').value
    };
    
    // Show success message
    alert('Obrigado pelo seu interesse! Nossa equipe entrará em contato em breve.');
    
    // Log form data (in production, this would be sent to a server)
    console.log('Cadastro de Revendedor:', formData);
    
    // Create WhatsApp message
    const message = `Olá! Quero ser revendedor NuvixTV.\n\nNome: ${formData.nome}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nCidade: ${formData.cidade}`;
    const whatsappUrl = `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    revendedorForm.reset();
});

// ===================================
// FORM HANDLING - CONTATO
// ===================================
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('contato-nome').value,
        email: document.getElementById('contato-email').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Show success message
    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
    
    // Log form data (in production, this would be sent to a server)
    console.log('Contato:', formData);
    
    // Create WhatsApp message
    const message = `Mensagem do site NuvixTV:\n\nNome: ${formData.nome}\nEmail: ${formData.email}\n\nMensagem:\n${formData.mensagem}`;
    const whatsappUrl = `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contatoForm.reset();
});

// ===================================
// PHONE MASK FOR WHATSAPP FIELD
// ===================================
const whatsappInput = document.getElementById('whatsapp');

whatsappInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    e.target.value = value;
});

// ===================================
// VIDEO PLAYER ENHANCEMENTS
// ===================================
const videoPlayer = document.querySelector('.video-player');

if (videoPlayer) {
    // Add loading state
    videoPlayer.addEventListener('loadstart', () => {
        videoPlayer.style.opacity = '0.5';
    });
    
    videoPlayer.addEventListener('loadeddata', () => {
        videoPlayer.style.opacity = '1';
    });
    
    // Auto-pause when scrolling away
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !videoPlayer.paused) {
                videoPlayer.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(videoPlayer);
}

// ===================================
// ACTIVE SECTION HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavLink, 50));

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🎬 NuvixTV - Conecte. Assista. Sem Limites.', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #2B4EFF 0%, #9B2EFF 100%); color: white; padding: 10px 20px; border-radius: 10px;');
console.log('%cDesenvolvido com ❤️ para a melhor experiência em streaming IPTV', 'font-size: 14px; color: #9B2EFF;');

// ===================================
// PAGE LOAD COMPLETE
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Página carregada com sucesso!');
});
