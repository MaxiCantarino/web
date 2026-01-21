// Emma Real Estate SPA Interaction Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE PROPIEDADES (Desde JSON) ---
    // --- DATOS DE PROPIEDADES (Desde data.js) ---
    function loadPropertyData() {
        // 'properties' viene de data.js que debe cargarse antes en el HTML
        if (typeof properties === 'undefined') {
            console.error('Error: properties de data.js no está definido.');
            return;
        }

        try {
            // 1. CARGA DE DETALLE (Property Page)
            if (window.location.pathname.includes('property.html')) {
                const urlParams = new URLSearchParams(window.location.search);
                const propId = urlParams.get('id');
                const data = properties[propId];

                if (data) {
                    document.title = `${data.title} | Emma Asesor Inmobiliario`;
                    // Carousel Init
                    initCarousel(data.images);

                    document.getElementById('propTitle').innerText = data.title;
                    document.getElementById('propLocation').innerText = data.location;
                    document.getElementById('propDesc').innerText = data.desc;
                    document.getElementById('propRefInput').value = data.ref;

                    if (document.getElementById('propPrice')) document.getElementById('propPrice').innerText = data.price;
                    if (document.getElementById('propBeds')) document.getElementById('propBeds').innerText = data.beds;
                    if (document.getElementById('propBaths')) document.getElementById('propBaths').innerText = data.baths;
                    if (document.getElementById('propArea')) document.getElementById('propArea').innerText = data.area;

                    const waText = `Hola Emma, vi la propiedad "${data.title}" en tu web y quisiera más info.`;
                    const waLink = document.getElementById('waLink');
                    if (waLink) waLink.href = `https://wa.me/5493512607315?text=${encodeURIComponent(waText)}`;
                } else {
                    console.warn('Property ID not found.');
                }
            }

            // 2. CARGA DE TARJETAS (Index Page)
            if (!window.location.pathname.includes('property.html') || window.location.pathname.includes('index.html')) {
                // Find all cards with data-id
                const cards = document.querySelectorAll('.property-card[data-id]');
                cards.forEach(card => {
                    const id = card.getAttribute('data-id');
                    const data = properties[id];
                    if (data) {
                        // Update Image (Use first image as cover)
                        if (data.images && data.images.length > 0) {
                            const img = card.querySelector('.card-image');
                            if (img) img.src = data.images[0]; // La primera es la portada
                        }
                        // Update Texts
                        if (card.querySelector('.card-title')) card.querySelector('.card-title').innerText = data.title;
                        if (card.querySelector('.card-location')) card.querySelector('.card-location').innerText = data.location;
                        if (card.querySelector('.card-price')) card.querySelector('.card-price').innerText = data.price;
                    }
                });
            }

        } catch (error) {
            console.error('Error processing property data:', error);
        }
    }

    // Call the function
    loadPropertyData();

    // --- CAROUSEL LOGIC WITH THUMBNAILS ---
    function initCarousel(images) {
        const heroContainer = document.getElementById('propHero');
        const thumbContainer = document.getElementById('propThumbnails');

        if (!heroContainer || !images || images.length === 0) return;

        // Clear existing
        heroContainer.innerHTML = '';
        if (thumbContainer) thumbContainer.innerHTML = '';
        heroContainer.style.backgroundImage = 'none';

        // Create Slides (Main)
        images.forEach((imgUrl, index) => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            if (index === 0) slide.classList.add('active');
            slide.style.backgroundImage = `url('${imgUrl}')`;
            heroContainer.appendChild(slide);
        });

        // Create Thumbnails
        if (thumbContainer) {
            images.forEach((imgUrl, index) => {
                const thumb = document.createElement('div');
                thumb.classList.add('thumbnail');
                if (index === 0) thumb.classList.add('active');
                thumb.style.backgroundImage = `url('${imgUrl}')`;
                thumb.addEventListener('click', () => showSlide(index));
                thumbContainer.appendChild(thumb);
            });
        }

        // If only one image, stop here
        if (images.length <= 1) return;

        // Create Controls (Arrows)
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('carousel-btn', 'prev-btn');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('carousel-btn', 'next-btn');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

        heroContainer.appendChild(prevBtn);
        heroContainer.appendChild(nextBtn);

        let currentSlide = 0;
        const slides = heroContainer.querySelectorAll('.carousel-slide');

        function showSlide(index) {
            // Wrap around
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            // Main Slides
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');

            // Thumbnails
            if (thumbContainer) {
                const thumbs = thumbContainer.querySelectorAll('.thumbnail');
                thumbs.forEach(t => t.classList.remove('active'));
                if (thumbs[index]) {
                    thumbs[index].classList.add('active');
                    // Auto scroll thumbnail into view
                    thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }

            currentSlide = index;
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening lightbox
            showSlide(currentSlide - 1);
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening lightbox
            showSlide(currentSlide + 1);
        });

        // --- LIGHTBOX LOGIC ---
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const lbClose = document.querySelector('.lightbox-close');
        const lbPrev = document.querySelector('.lightbox-prev');
        const lbNext = document.querySelector('.lightbox-next');

        if (lightbox && lightboxImg) {
            // Open Lightbox on Slide Click
            heroContainer.addEventListener('click', (e) => {
                if (e.target.closest('.carousel-btn')) return; // Ignore buttons
                lightbox.classList.add('active');
                updateLightboxImage();
            });

            // Close Lightbox
            lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.classList.remove('active');
            });

            // Update Image
            function updateLightboxImage() {
                lightboxImg.src = images[currentSlide];
            }

            // Lightbox Navigation
            lbPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentSlide - 1);
                updateLightboxImage();
            });

            lbNext.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentSlide + 1);
                updateLightboxImage();
            });

            // Keyboard Nav
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') lightbox.classList.remove('active');
                if (e.key === 'ArrowLeft') {
                    showSlide(currentSlide - 1);
                    updateLightboxImage();
                }
                if (e.key === 'ArrowRight') {
                    showSlide(currentSlide + 1);
                    updateLightboxImage();
                }
            });
        }
    }


    // --- MANEJO DE FORMULARIOS (Global) ---
    // Asegurarse de seleccionar todos los formularios de tasación (inicio y página de propiedad)
    const forms = document.querySelectorAll('.appraisal-form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;

            const formData = new FormData(form);

            submitBtn.innerText = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                    form.reset();
                } else {
                    alert('Hubo un error. Por favor contáctanos por WhatsApp.');
                }
            } catch (error) {
                console.error(error);
                alert('Error de conexión.');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }
        });
    });

    // --- DESPLAZAMIENTO SUAVE (Solo para inicio) ---
    // Si estamos en index.html (o raíz), habilitar desplazamiento suave para enlaces #
    if (!window.location.pathname.includes('property.html')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // SCROLL REVEAL ANIMATION
        const revealElements = document.querySelectorAll('section, header, footer, .property-card, .menu-toggle');

        // Add initial class
        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    // Stop observing once revealed? 
                    // Usually better for performance, but if they want it to re-trigger, keep it.
                    // Let's stop observing for a cleaner "reveal once" effect.
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // 10% visible to trigger

        revealElements.forEach(el => observer.observe(el));
    }

    // --- MENÚ MÓVIL ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- TYPEWRITER EFFECT (HERO) ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const line1 = "Inversiones Inmobiliarias";
        const line2 = "de Alto Nivel";

        // Clear logic for typing
        heroTitle.innerHTML = '';

        // Create wrappers
        const span1 = document.createElement('span');
        span1.classList.add('typewriter-text');
        heroTitle.appendChild(span1);

        // Br tag
        const br = document.createElement('br');

        // Logic to type string into element
        async function typeText(element, text, speed = 50) {
            for (let i = 0; i < text.length; i++) {
                element.textContent += text.charAt(i);
                await new Promise(r => setTimeout(r, speed));
            }
        }

        async function startTyping() {
            // Type first line
            await typeText(span1, line1, 50);

            // Remove cursor from line 1
            span1.classList.remove('typewriter-text');

            // Add break and line 2
            heroTitle.appendChild(br);
            const span2 = document.createElement('span');
            span2.classList.add('typewriter-text');
            heroTitle.appendChild(span2);

            // Type second line
            await typeText(span2, line2, 50);

            // Keep cursor blinking on end for a bit or leave it?
            // "Simulando máquina de escribir" usually keeps it or fades it.
            // Let's leave it for a professional feel, or maybe remove it after a few seconds.
            // User asked for "suave", so maybe remove it gently?
            // Let's leave it for now as it's active.
        }

        // Start a bit after load
        setTimeout(startTyping, 500);
    }

    // --- PARALLAX EFFECT ---
    const parallaxElements = document.querySelectorAll('.hero, .property-hero');

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;

            parallaxElements.forEach(el => {
                // Check if element is in viewport effectively? 
                // Simple version: background position moves at 0.5 speed to create depth
                // Default position center usually means 50%. We need to modify the Y axis.
                // We'll use 50% for X and a calculation for Y.
                // Initial Y is center, but we want it to move.

                const speed = 0.5;
                const yPos = -(scrolled * speed);

                // Keep the gradient? 
                // The gradient is part of the background-image property in CSS.
                // Changing backgroundPosition works on top of that.
                // Standard center is 50% 50%.

                el.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }
});
