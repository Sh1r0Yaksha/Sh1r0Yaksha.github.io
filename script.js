const hamburger = document.querySelector('.hamburger');
const hamburgerLinks = document.querySelector('.hamburger-links');
const topBar = document.querySelector('.top-bar');
const links = document.querySelectorAll('.hamburger-links .top-bar-element'); // Select all links inside the hamburger menu

hamburger.addEventListener('click', () => {
    hamburgerLinks.classList.toggle('show'); // Toggle the 'show' class to display the links
});

// Close the menu when any link inside the hamburger menu is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerLinks.classList.remove('show'); // Hide the hamburger menu
    });
});