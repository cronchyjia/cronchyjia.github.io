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
    // let favicon = document.getElementById('favicon');
    // let originalFaviconHref = favicon.href;
    // let ghostEmojiFavicon = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 110 110%22><text y=%22.9em%22 font-size=%2290%22>👻</text></svg>';

    window.addEventListener('blur', () => {
        document.title = 'COME BACK! | Jiayue\'s Portfolio';
       // favicon.href = ghostEmojiFavicon;
    });

    window.addEventListener('focus', () => {
        document.title = title;
       // favicon.href = originalFaviconHref;
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

    // Insert current year into the span with id="year"
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) { // Make sure the element exists
        yearElement.textContent = currentYear;
    }

    // Carousel rotation
    const slider = document.querySelector('.slider');
    const quantity = parseInt(getComputedStyle(slider).getPropertyValue('--quantity'));
    const infoImage = document.getElementById('info-image');
    const infoText = document.getElementById('info-text');

    let currentPosition = 0;

    // Data for each carousel item
    const carouselData = [
        {
            image: 'images/slider/choncc-splash-resort.jpg',
            title: 'Top 1.8% player in TFT',
            description: 'If you want a cute and fun strategy game to play give Teamfight Tactics (TFT) a try. This is one of my favourite games to play, whether alone or with friends. Through hard work and dedication I had worked my way up the ranks to masters in double up (during the Magic N\' Mayhem set), which puts me in the top 1-2% of players in all of North America! The picture on the right is my favourite in game board.'
        },
        {
            image: 'images/slider/sprite.jpg',
            title: 'Clay Sauna Sprite',
            description: 'I crafted a clay figure of my favourite little legend from Teamfight Tactics. He is just so cute and cozy sitting in the sauna with a little towel on his head! This was my first time creating something with polymer clay. I must say, I am pretty proud of how it came out.'
        },
        {
            image: 'images/slider/dress-collage.jpg',
            title: 'Sewing a Dress',
            description: 'Towards the end of highschool, I fell in love with fashion and the creativity behind personal style. When I couldn\'t find a grad dress that I loved or one that felt like me, I decided to design and sew my own. The process challenged me to learn new techniques and trust my vision. The result was a piece I was truly proud of! Although I didn\'t end up studying fasion formally, this project sparked a lifelong appreciation for design, craftsmanship, and self-expression.'
        },
        {
            image: 'images/slider/mush-room-close.png',
            title: 'MushRoom House',
            description: 'A cozy little mushroom shaped house I created in Blender! This was one of the first things I had made in blender and taught me the fundamentals of 3D modeling. I hope you like it as much as I do <3'
        },
        {
            image: 'images/slider/hornet-wip.png',
            title: 'Crocheted Hornet',
            description: 'Crocheting is one of my favourite pastimes as you can create a variety of cute and functional items. I have gotten into making cute little amigurumi\'s (which are small stuffed creatures/objects). One of my friends had gotten really into the game Silksong, so I gifted them a crocheted version of the main character Hornet!'
        },
        {
            image: 'images/slider/dizzy-sploot.gif',
            title: 'Dizzy from Valorant!',
            description: 'I took a digital arts course one summer. For the introductory animation section of the course, I decided to create a little animation of Dizzy. Dizzy is a blinding ability from the game Valorant. I initially created the version without a background, although I had to quickly create one for the assignment submission.'
        },
        {
            image: 'images/slider/laundry-bins-wireframe.png',
            title: 'Blender Laundry Bins',
            description: 'I wanted to give a try at creating something more realistic and mundane in Blender. I decided on making two different types of laundry baskets, one with round holes and the other with diamond shape ones. Since there isn\'t a size reference in the image, you could think of them as pencil holders as well.' 
        },
        {
            image: 'images/slider/dumpster-wireframe.png',
            title: 'Used Blender Dumpster',
            description: 'This was my first time creating textures in my blender models! If you zoom into the image you can see that I had created a dented and scratched plastic texture for the dumpster\'s lids and a rusted dirty metal material for the dumpster\'s body.'
        }
    ];

    function updateInfo() {
        const data = carouselData[currentPosition];
        infoImage.src = data.image;
        infoImage.alt = data.title;
        infoText.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
        `;
    }

    let angle = 0;

    document.querySelector('.nav.left').addEventListener('click', () => {
        angle += 360 / quantity;
        slider.style.transform = `perspective(1000px) rotateY(${angle}deg)`;
        
        currentPosition = (currentPosition - 1 + quantity) % quantity;
        updateInfo();
    });

    document.querySelector('.nav.right').addEventListener('click', () => {
        angle -= 360 / quantity;
        slider.style.transform = `perspective(1000px) rotateY(${angle}deg)`;
        
        currentPosition = (currentPosition + 1) % quantity;
        updateInfo();
    });

    // Initialize with first item
    updateInfo();
});
