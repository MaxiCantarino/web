// Emma Real Estate SPA Interaction Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE PROPIEDADES ---
    // --- DATOS DE PROPIEDADES ---
    // --- DATOS DE PROPIEDADES ---
    const properties = {
        '1': {
            title: "Casa de Lujo en Causana",
            location: "Causana, Malagueño",
            images: [
                "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1613545325268-b2714cb295ad?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
            ],
            desc: "Impresionante residencia de diseño moderno en uno de los barrios cerrados más exclusivos. Cuenta con amplios espacios luminosos, jardín parquizado y terminaciones de primera categoría.",
            price: "USD 330.000",
            beds: "4 Dorm",
            baths: "3 Baños",
            area: "450m²",
            ref: "CAUSANA-764"
        },
        '2': {
            title: "Residencia Costa Azul",
            location: "Costa Azul, Villa Carlos Paz",
            images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
            ],
            desc: "Disfruta de las mejores vistas al lago desde esta propiedad única. Arquitectura pensada para maximizar el paisaje, con terrazas panorámicas y piscina infinita.",
            price: "USD 225.000",
            beds: "3 Dorm",
            baths: "3 Baños",
            area: "320m²",
            ref: "COSTAZUL-715"
        },
        '3': {
            title: "Oportunidad Villa Lago Azul",
            location: "Villa Santa Cruz del Lago",
            images: [
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
            ],
            desc: "Equilibrio perfecto entre naturaleza y confort. Una casa ideal para descanso o vivienda permanente, rodeada de un entorno tranquilo y seguro.",
            price: "USD 120.000",
            beds: "3 Dorm",
            baths: "2 Baños",
            area: "280m²",
            ref: "LAGOAZUL-667"
        },
        '4': {
            title: "Casa Minimalista La Arbolada",
            location: "La Arbolada, Malagueño",
            images: [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
            ],
            desc: "Estilo minimalista y funcional. Seguridad 24hs, amenities de lujo y una ubicación estratégica cerca de la ciudad pero con la paz de las sierras.",
            price: "USD 350.000",
            beds: "3 Dorm",
            baths: "3 Baños",
            area: "320m²",
            ref: "ARBOLADA-726"
        },
        '5': {
            title: "Joya Histórica Villa Edén",
            location: "Villa Edén, La Falda",
            images: [
                "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop"
            ],
            desc: "Una propiedad con carácter e historia en la zona más exclusiva de La Falda. Detalles arquitectónicos únicos restaurados para la vida moderna.",
            price: "USD 220.000",
            beds: "4 Dorm",
            baths: "2 Baños",
            area: "250m²",
            ref: "EDEN-675"
        },
        '6': {
            title: "Inversión Comercial Hotelería",
            location: "Valle de Punilla",
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop"
            ],
            desc: "Excelente oportunidad de inversión en el sector turístico. Hotel funcionando con cartera de clientes y potencial de expansión.",
            price: "Consultar",
            beds: "10 Dorm",
            baths: "8 Baños",
            area: "1200m²",
            ref: "HOTEL-INV"
        }
    };

    // --- COMPROBAR SI ESTAMOS EN LA PÁGINA DE PROPIEDAD ---
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

            // New dynamic fields
            if (document.getElementById('propPrice')) document.getElementById('propPrice').innerText = data.price;
            if (document.getElementById('propBeds')) document.getElementById('propBeds').innerText = data.beds;
            if (document.getElementById('propBaths')) document.getElementById('propBaths').innerText = data.baths;
            if (document.getElementById('propArea')) document.getElementById('propArea').innerText = data.area;

            // Update WhatsApp Link knowing current property context
            const waText = `Hola Emma, vi la propiedad "${data.title}" en tu web y quisiera más info.`;
            const waLink = document.getElementById('waLink');
            if (waLink) waLink.href = `https://wa.me/5493512607315?text=${encodeURIComponent(waText)}`;
        } else {
            // Redirect home if invalid ID
            console.warn('Property ID not found, redirecting...');
        }
    }

    // --- CAROUSEL LOGIC ---
    function initCarousel(images) {
        const heroContainer = document.getElementById('propHero');
        if (!heroContainer || !images || images.length === 0) return;

        // Clear existing
        heroContainer.innerHTML = '';
        heroContainer.style.backgroundImage = 'none';

        // Create Slides
        images.forEach((imgUrl, index) => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            if (index === 0) slide.classList.add('active');
            slide.style.backgroundImage = `url('${imgUrl}')`;
            heroContainer.appendChild(slide);
        });

        // If only one image, don't add controls
        if (images.length <= 1) return;

        // Create Controls
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('carousel-btn', 'prev-btn');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('carousel-btn', 'next-btn');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

        // Dots Container
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('carousel-dots');
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });

        heroContainer.appendChild(prevBtn);
        heroContainer.appendChild(nextBtn);
        heroContainer.appendChild(dotsContainer);

        let currentSlide = 0;
        const slides = heroContainer.querySelectorAll('.carousel-slide');
        const dots = heroContainer.querySelectorAll('.dot');

        function showSlide(index) {
            // Wrap around
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

        // Auto advance (optional)
        // setInterval(() => showSlide(currentSlide + 1), 5000); 
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
