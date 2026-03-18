// Mobile menu toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// FREE-ROAMING CHARACTER
// ============================================
const character = document.getElementById('character');

if (character) {
    let x = Math.random() * (window.innerWidth - 60) + 30;
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

            if (x > window.innerWidth - 40) {
                x = window.innerWidth - 40;
                direction = -1;
            }
            if (x < 10) {
                x = 10;
                direction = 1;
            }

            character.style.left = x + 'px';
            character.style.transform = direction < 0 ? 'scaleX(-1)' : 'scaleX(1)';

            if (Math.random() < 0.003) {
                isPaused = true;
                pauseTimer = Math.floor(Math.random() * 120) + 60;
                character.classList.remove('walking');
            }

            if (Math.random() < 0.002) direction *= -1;

            if (Math.random() < 0.01) {
                speed = 0.8 + Math.random() * 1;
            }
        }

        requestAnimationFrame(updateCharacter);
    }

    requestAnimationFrame(updateCharacter);
}

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
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});