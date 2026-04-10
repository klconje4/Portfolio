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
        if (heroBg) heroBg.style.transform = `translateY(${s * 0.25}px)`;
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

// ============================================
// QUEST DIALOG
// ============================================
const questOverlay = document.getElementById('questOverlay');
const questClose   = document.getElementById('questClose');

if (questOverlay) {
    document.querySelectorAll('.quest-open-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            document.getElementById('qdBadge').textContent  = 'Quest ' + card.dataset.quest;
            document.getElementById('qdStatus').textContent = '✔ ' + card.dataset.status;
            document.getElementById('qdTitle').textContent  = card.dataset.title;
            document.getElementById('qdDesc').textContent   = card.dataset.desc;
            document.getElementById('qdLink').href          = card.dataset.link;
            document.getElementById('qdLink').textContent   = card.dataset.linkLabel + ' ▶';
            document.getElementById('qdTags').innerHTML     = card.dataset.tags.split(',').map(t => `<span>${t.trim()}</span>`).join('');

            // Swap the dialog image to match the clicked card
            const qdImg = document.querySelector('#qdImage img');
            qdImg.src = card.dataset.image;
            qdImg.alt = card.dataset.title + ' preview';

            questOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeQuest() {
        questOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    questClose.addEventListener('click', closeQuest);
    questOverlay.addEventListener('click', e => { if (e.target === questOverlay) closeQuest(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuest(); });
}