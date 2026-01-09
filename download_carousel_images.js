import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');
const publicAssetsDir = path.join(__dirname, 'public', 'assets');

const images = [
    { url: 'https://www.inspt.utn.edu.ar/wp-content/uploads/2023/12/fachada-utn-inspt.jpg', name: 'carousel_facade.jpg' },
    { url: 'https://noticias.frba.utn.edu.ar/wp-content/uploads/2016/06/Laboratorio-de-Electronica-1-1024x680.jpg', name: 'carousel_lab.jpg' },
    { url: 'https://www.frba.utn.edu.ar/wp-content/uploads/2019/02/campus-utn-ba.jpg', name: 'carousel_campus.jpg' },
    { url: 'https://www.frba.utn.edu.ar/wp-content/uploads/2018/10/Taller-de-Electronica.jpg', name: 'carousel_workshop.jpg' },
    { url: 'https://pbs.twimg.com/media/Ff15u5fXkAAQz1_.jpg', name: 'carousel_modern_labs.jpg' },
    { url: 'https://sanmiguelest.inspt.utn.edu.ar/wp-content/uploads/2025/05/DSC_0167-1-1-300x184.jpg', name: 'carousel_community.jpg' }
];

async function downloadImage(url, filename) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const destPath = path.join(assetsDir, filename);
        const writer = fs.createWriteStream(destPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                // Also copy to public/assets
                fs.copyFileSync(destPath, path.join(publicAssetsDir, filename));
                console.log(`Downloaded ${filename}`);
                resolve();
            });
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
    }
}

async function main() {
    for (const img of images) {
        await downloadImage(img.url, img.name);
    }
}

main();
