// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ============================================
// FREE-ROAMING REALISTIC CHARACTER
// ============================================
const character = document.getElementById('character');
if (character) {
    let x = Math.random() * (window.innerWidth - 80) + 40;
    let direction = 1, speed = 1.2, pauseTimer = 0, isPaused = false;
    character.style.left = x + 'px';
    character.classList.add('walking');

    function updateCharacter() {
        if (isPaused) {
            if (--pauseTimer <= 0) {
                isPaused = false;
                character.classList.add('walking');
                if (Math.random() > 0.5) direction *= -1;
            }
        } else {
            x += speed * direction;
            if (x > window.innerWidth - 50) { x = window.innerWidth - 50; direction = -1; }
            if (x < 50) { x = 50; direction = 1; }
            character.style.left = x + 'px';
            character.style.transform = direction < 0 ? 'scaleX(-1)' : 'scaleX(1)';
            if (Math.random() < 0.003) { isPaused = true; pauseTimer = Math.floor(Math.random() * 140) + 60; character.classList.remove('walking'); }
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
    function spawnParticle() {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 3 + Math.random() * 7;
        const colors = ['rgba(255,220,80,0.6)','rgba(255,185,60,0.5)','rgba(255,240,140,0.55)','rgba(220,180,255,0.38)','rgba(180,230,255,0.35)'];
        p.style.cssText = `width:${size}px;height:${size}px;left:${5+Math.random()*90}%;top:${40+Math.random()*55}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${7+Math.random()*10}s;animation-delay:${Math.random()*6}s;filter:blur(${size*0.35}px);`;
        heroParticles.appendChild(p);
        setTimeout(() => p.remove(), 20000);
    }
    for (let i = 0; i < 22; i++) spawnParticle();
    setInterval(() => { if (heroParticles.children.length < 30) spawnParticle(); }, 1200);
}

// ============================================
// PARALLAX ON HERO BG + LIGHTS
// ============================================
const heroBg = document.querySelector('.hero__bg');
const heroLights = document.querySelector('.hero__lights');
window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (s < window.innerHeight) {
        if (heroBg) heroBg.style.transform = `translateY(${s * 0.25}px) scale(1.04)`;
        if (heroLights) heroLights.style.transform = `translateY(${s * 0.1}px)`;
    }
}, { passive: true });

// ============================================
// FADE IN SECTIONS ON SCROLL
// ============================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('section').forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    s.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    fadeObserver.observe(s);
});