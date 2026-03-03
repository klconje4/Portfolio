// Mobile menu toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});