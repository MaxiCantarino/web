# 🏡 Emma Asesor Inmobiliario - Web Portfolio

Bienvenido al repositorio del sitio web oficial de **Emma Asesor Inmobiliario**. Este proyecto es una plataforma moderna y elegante diseñada para exhibir propiedades de lujo con una experiencia de usuario premium.

![Preview](preview.jpg)
*(Opcional: Podés agregar una captura de pantalla de la web aquí)*

## ✨ Características Principales

*   **Premium Dark Mode:** Diseño sofisticado en modo oscuro con fondo negro sólido y tipografías modernas para resaltar la fotografía.
*   **Carga Dinámica de Propiedades:** Sistema optimizado que lee la información de las propiedades desde `data.json` y `data.js`, permitiendo actualizaciones rápidas sin tocar el HTML.
*   **Gestión Automatizada de Imágenes:** Script personalizado en Node.js (`update_images.js`) que escanea las carpetas locales y actualiza automáticamente las galerías de fotos.
*   **Galería Interactiva (Lightbox):** Visor de imágenes en pantalla completa sin recortes, con navegación táctil y soporte para teclado.
*   **Diseño Responsive:** Totalmente adaptado a móviles, tablets y escritorio.
*   **Integración con WhatsApp:** Botones de contacto directo pre-configurados con mensajes personalizados para cada propiedad.

## 🛠️ Tecnologías Utilizadas

*   **HTML5** - Estructura semántica.
*   **CSS3** - Variables CSS, Flexbox, Grid y animaciones personalizadas.
*   **JavaScript (Vanilla)** - Lógica del frontend, carrusel y carga de datos.
*   **Node.js** - Script de automatización para gestión de archivos (`update_images.js`).
*   **Font Awesome** - Iconografía.
*   **Google Fonts** - Tipografía 'Outfit'.

## 🚀 Cómo usar este proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/emma-real-estate.git
```

### 2. Ejecutar localmente
Simplemente abre el archivo `index.html` en tu navegador web. No se requiere servidor para la visualización básica.

> **Nota:** Para que las imágenes carguen correctamente en local sin problemas de seguridad (CORS), el proyecto utiliza un archivo `data.js` generado automáticamente.

### 3. Actualizar Propiedades y Fotos
El proyecto incluye un sistema inteligente para gestionar las fotos.

1.  **Agregar Fotos:** Coloca las nuevas imágenes en la carpeta `images/propiedades/[ID_DE_PROPIEDAD]/`.
2.  **Actualizar Datos:**
    *   Si tienes Node.js instalado, ejecuta el script de actualización:
        ```bash
        node update_images.js
        ```
    *   O simplemente haz doble clic en el archivo `actualizar_fotos.bat` (en Windows).
3.  **Resultado:** El script escaneará las carpetas, ordenará las imágenes (priorizando `portada.jpg`) y actualizará automáticamente `data.json` y `data.js`.

### 4. Publicar Cambios (Despliegue)
El proyecto cuenta con un script automatizado para publicar los cambios en Vercel de forma segura.

1.  Asegúrate de haber guardado todos tus archivos.
2.  Ejecuta el script de publicación:
    *   **En PowerShell:** `./publicar.ps1`
    *   **Clic Derecho:** "Ejecutar con PowerShell" sobre el archivo.
3.  **¿Qué hace este script?**
    *   Guarda tus cambios en la rama de desarrollo (`developer`).
    *   Te pregunta qué hiciste hoy (para el historial).
    *   Fusiona los cambios con la rama principal (`main`).
    *   Sube todo a la nube, donde **Vercel** detecta el cambio y actualiza la web automáticamente.

## 📁 Estructura del Proyecto

```
/
├── index.html            # Página de inicio
├── property.html         # Plantilla de detalle de propiedad
├── styles.css            # Estilos globales (Dark Mode)
├── script.js             # Lógica principal y renderizado
├── data.json             # Base de datos de propiedades
├── data.js               # Versión JS de los datos (para evitar CORS)
├── update_images.js      # Script de automatización de imágenes
├── actualizar_fotos.bat  # Acceso directo para actualizar imágenes
└── images/               # Recursos gráficos
    └── propiedades/      # Carpetas por ID de propiedad
```

## ✍️ Autor

Desarrollado para **Emma Asesor Inmobiliario**.
*Diseño y Desarrollo Web enfocado en Real Estate.*
