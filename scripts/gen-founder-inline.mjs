import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** Prefer full-res source on disk; `francisco-alba.png` in src/assets must be a real PNG (not JPEG renamed). */
const candidates = [
  path.join(root, 'public', 'francisco-alba.jpg'),
  path.join(root, 'public', 'francisco-alba.png'),
  path.join(root, 'src', 'assets', 'francisco-alba.jpg'),
  path.join(root, 'src', 'assets', 'francisco-alba.png'),
];

const src = candidates.find((p) => fs.existsSync(p));
if (!src) {
  console.error(
    'No founder source image found. Add one of:\n',
    candidates.map((p) => '  - ' + path.relative(root, p)).join('\n'),
  );
  process.exit(1);
}

const out = path.join(root, 'public', 'founder.png');

await sharp(src)
  .rotate()
  .resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(out);

console.log('Wrote', out, '(' + fs.statSync(out).size + ' bytes) from', src);
console.log("Home.jsx should use FOUNDER_PHOTO_URL = '/founder.png'");
