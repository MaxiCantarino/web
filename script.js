// Emma Real Estate SPA Interaction Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE PROPIEDADES ---
    const properties = {
        '1': {
            title: "Casa de Lujo en Causana",
            location: "Causana, Malagueño",
            image: "https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?q=80&w=800&auto=format&fit=crop",
            desc: "Impresionante residencia de diseño moderno en uno de los barrios cerrados más exclusivos. Cuenta con amplios espacios luminosos, jardín parquizado y terminaciones de primera categoría.",
            ref: "CAUSANA-764"
        },
        '2': {
            title: "Residencia Costa Azul",
            location: "Costa Azul, Villa Carlos Paz",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
            desc: "Disfruta de las mejores vistas al lago desde esta propiedad única. Arquitectura pensada para maximizar el paisaje, con terrazas panorámicas y piscina infinita.",
            ref: "COSTAZUL-715"
        },
        '3': {
            title: "Oportunidad Villa Lago Azul",
            location: "Villa Santa Cruz del Lago",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
            desc: "Equilibrio perfecto entre naturaleza y confort. Una casa ideal para descanso o vivienda permanente, rodeada de un entorno tranquilo y seguro.",
            ref: "LAGOAZUL-667"
        },
        '4': {
            title: "Casa Minimalista La Arbolada",
            location: "La Arbolada, Malagueño",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
            desc: "Estilo minimalista y funcional. Seguridad 24hs, amenities de lujo y una ubicación estratégica cerca de la ciudad pero con la paz de las sierras.",
            ref: "ARBOLADA-726"
        },
        '5': {
            title: "Joya Histórica Villa Edén",
            location: "Villa Edén, La Falda",
            image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop",
            desc: "Una propiedad con carácter e historia en la zona más exclusiva de La Falda. Detalles arquitectónicos únicos restaurados para la vida moderna.",
            ref: "EDEN-675"
        },
        '6': {
            title: "Inversión Comercial Hotelería",
            location: "Valle de Punilla",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
            desc: "Excelente oportunidad de inversión en el sector turístico. Hotel funcionando con cartera de clientes y potencial de expansión.",
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
            document.getElementById('propHero').style.backgroundImage = `url('${data.image}')`;
            document.getElementById('propTitle').innerText = data.title;
            document.getElementById('propLocation').innerText = data.location;
            document.getElementById('propDesc').innerText = data.desc;
            document.getElementById('propRefInput').value = data.ref;

            // Update WhatsApp Link knowing current property context
            const waText = `Hola Emma, vi la propiedad "${data.title}" en tu web y quisiera más info.`;
            const waLink = document.getElementById('waLink');
            if (waLink) waLink.href = `https://wa.me/5493512607315?text=${encodeURIComponent(waText)}`;
        } else {
            // Redirect home if invalid ID
            console.warn('Property ID not found, redirecting...');
            // Optional: window.location.href = 'index.html';
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

        // Observadores solo necesarios en inicio
        const fadeElements = document.querySelectorAll('.property-card, .section-title, .form-group');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => observer.observe(el));
    }
});
