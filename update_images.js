const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');
const imagesDir = path.join(__dirname, 'images', 'propiedades');

// Extensions to look for
const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Read data.json
fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data.json:', err);
        return;
    }

    let properties;
    try {
        properties = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing data.json:', parseErr);
        return;
    }

    // Check if images directory exists
    if (!fs.existsSync(imagesDir)) {
        console.log('Creating images directory structure...');
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Iterate over each property in JSON to check for local folders
    let updatedCount = 0;
    const propertyIds = Object.keys(properties);

    propertyIds.forEach(id => {
        const propFolder = path.join(imagesDir, id);

        if (fs.existsSync(propFolder)) {
            // Read files in folder
            const files = fs.readdirSync(propFolder);

            // Filter image files
            const imageFiles = files.filter(file => {
                const ext = path.extname(file).toLowerCase();
                return validExtensions.includes(ext);
            });

            // SORTING: Prioritize images named "portada" or "cover"
            imageFiles.sort((a, b) => {
                const nameA = a.toLowerCase();
                const nameB = b.toLowerCase();
                const isCoverA = nameA.includes('portada') || nameA.includes('cover');
                const isCoverB = nameB.includes('portada') || nameB.includes('cover');

                if (isCoverA && !isCoverB) return -1;
                if (!isCoverA && isCoverB) return 1;
                return nameA.localeCompare(nameB);
            });

            if (imageFiles.length > 0) {
                // Construct paths for web usage (relative to index.html)
                // path: "images/propiedades/ID/filename"
                const newImages = imageFiles.map(file => `images/propiedades/${id}/${file}`);

                // Update the property's images array
                properties[id].images = newImages;
                updatedCount++;
                console.log(`[ID ${id}] Local images found: ${newImages.length} images updated.`);
            } else {
                console.log(`[ID ${id}] Folder exists but no images found. Keeping existing data.`);
            }
        } else {
            // Optional: Create folder if it doesn't exist?
            // fs.mkdirSync(propFolder);
            // console.log(`[ID ${id}] Created folder for future images.`);
        }
    });

    if (updatedCount > 0) {
        // Write back to data.json
        fs.writeFile(dataPath, JSON.stringify(properties, null, 4), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing data.json:', writeErr);
            } else {
                console.log('data.json updated successfully.');

                // ALSO WRITE data.js for local file usage (bypassing CORS)
                const jsContent = `const properties = ${JSON.stringify(properties, null, 4)};`;
                const jsPath = path.join(__dirname, 'data.js');

                fs.writeFile(jsPath, jsContent, 'utf8', (jsErr) => {
                    if (jsErr) {
                        console.error('Error writing data.js:', jsErr);
                    } else {
                        console.log('------------------------------------------------');
                        console.log('SUCCESS! data.json AND data.js updated.');
                        console.log('------------------------------------------------');
                    }
                });
            }
        });
    } else {
        console.log('No local image updates found.');
    }
});
