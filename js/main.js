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

// Walking character follows scroll position
const character = document.getElementById('character');

if (character) {
    let lastScrollY = window.scrollY;
    let characterX = 60;
    let direction = 1; // 1 = right, -1 = left
    let isWalking = false;
    let walkTimeout;

    function updateCharacter() {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY;

        if (Math.abs(delta) > 0) {
            // Move character horizontally based on scroll
            characterX += delta * 0.5;

            // Bounce off screen edges
            const maxX = window.innerWidth - 40;
            if (characterX > maxX) {
                characterX = maxX;
                direction = -1;
            }
            if (characterX < 20) {
                characterX = 20;
                direction = 1;
            }

            // Apply position and flip direction
            character.style.left = characterX + 'px';
            character.style.transform = direction < 0 ? 'scaleX(-1)' : 'scaleX(1)';

            // Show walking animation
            character.style.opacity = '1';
            isWalking = true;

            // Stop walking after scroll stops
            clearTimeout(walkTimeout);
            walkTimeout = setTimeout(() => {
                isWalking = false;
            }, 300);
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateCharacter, { passive: true });

    // Set initial position
    character.style.left = characterX + 'px';
    character.style.opacity = '1';
}

// Fade in sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});