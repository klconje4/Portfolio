// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ============================================
// FREE-ROAMING REALISTIC CHARACTER
// ============================================
const character = document.getElementById('character');

if (character) {
    let x = Math.random() * (window.innerWidth - 80) + 40;
    let direction = 1;
    let speed = 1.2;
    let pauseTimer = 0;
    let isPaused = false;

    character.style.left = x + 'px';
    character.classList.add('walking');

    function updateCharacter() {
        if (isPaused) {
            pauseTimer--;
            if (pauseTimer <= 0) {
                isPaused = false;
                character.classList.add('walking');
                if (Math.random() > 0.5) direction *= -1;
            }
        } else {
            x += speed * direction;

            const margin = 50;
            if (x > window.innerWidth - margin) { x = window.innerWidth - margin; direction = -1; }
            if (x < margin) { x = margin; direction = 1; }

            character.style.left = x + 'px';
            // Flip horizontally when going left
            character.style.transform = direction < 0 ? 'scaleX(-1)' : 'scaleX(1)';

            if (Math.random() < 0.003) {
                isPaused = true;
                pauseTimer = Math.floor(Math.random() * 140) + 60;
                character.classList.remove('walking');
            }
            if (Math.random() < 0.002) direction *= -1;
            if (Math.random() < 0.01) speed = 0.7 + Math.random() * 1.1;
        }

        requestAnimationFrame(updateCharacter);
    }

    requestAnimationFrame(updateCharacter);
}

// ============================================
// BOKEH / DUST PARTICLES
// ============================================
const heroParticles = document.getElementById('heroParticles');
if (heroParticles) {
    const hero = document.querySelector('.hero');
    const heroH = hero ? hero.offsetHeight : window.innerHeight;

    function spawnParticle() {
        const p = document.createElement('div');
        p.className = 'particle';

        const size = 3 + Math.random() * 6;
        const startX = 10 + Math.random() * 80; // percent
        const startY = 30 + Math.random() * 60; // percent of hero
        const duration = 6 + Math.random() * 10;
        const delay = Math.random() * 8;

        // Color variation: warm golden or soft lavender
        const colors = [
            'rgba(255,210,80,0.55)',
            'rgba(255,180,60,0.45)',
            'rgba(200,160,255,0.4)',
            'rgba(255,230,120,0.5)',
            'rgba(180,220,255,0.35)',
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            top: ${startY}%;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            filter: blur(${size * 0.3}px);
        `;

        heroParticles.appendChild(p);

        // Clean up after several cycles
        setTimeout(() => p.remove(), (duration + delay + 2) * 1000 * 2);
    }

    // Initial batch
    for (let i = 0; i < 20; i++) spawnParticle();

    // Keep generating
    setInterval(() => {
        if (heroParticles.children.length < 28) spawnParticle();
    }, 1500);
}

// ============================================
// PARALLAX — subtle sky scroll
// ============================================
const sky = document.querySelector('.sky');
const bgBuildings = document.querySelector('.bg-buildings');
const streetScene = document.querySelector('.street-scene');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
        if (sky) sky.style.transform = `translateY(${scrollY * 0.15}px)`;
        if (bgBuildings) bgBuildings.style.transform = `translateY(${scrollY * 0.08}px)`;
        if (streetScene) streetScene.style.transform = `translateX(-50%) translateY(${scrollY * 0.04}px)`;
    }
}, { passive: true });

// ============================================
// FADE IN SECTIONS ON SCROLL
// ============================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    fadeObserver.observe(section);
});