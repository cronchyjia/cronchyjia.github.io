document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    // Smooth scroll to an id link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Smooth scroll to", this.getAttribute('href'));
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    //Dissapearing and reappearing header
    const fadeOutDistance = 200; // Distance from the top (in pixels) to start fading out
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > fadeOutDistance) {
            header.classList.add('fade-out');
        } else {
            header.classList.remove('fade-out');
        }
    });

    // Change document title and favicon on window blur and focus
    let title = document.title;
    let favicon = document.getElementById('favicon');
    let originalFaviconHref = favicon.href;
    let sadEmojiFavicon = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 110 110%22><text y=%22.9em%22 font-size=%2290%22>👻</text></svg>';

    window.addEventListener('blur', () => {
        document.title = 'COME BACK! | Jiayue\'s Portfolio';
        favicon.href = sadEmojiFavicon;
    });

    window.addEventListener('focus', () => {
        document.title = title;
        favicon.href = originalFaviconHref;
    });

    // Active side menu event
    window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.project-page > section');
    const menuItems = document.querySelectorAll('.side-menu a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 450; // Adjust this offset as needed
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
});
});