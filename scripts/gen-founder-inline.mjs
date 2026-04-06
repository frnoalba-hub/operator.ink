import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const png = path.join(root, 'src', 'assets', 'francisco-alba.png');
const out = path.join(root, 'src', 'assets', 'founderPhotoInline.js');

const buf = fs.readFileSync(png);
const b64 = buf.toString('base64');
const isPng = buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
const mime = isPng ? 'image/png' : 'image/jpeg';
const body =
  `/* eslint-disable max-len */\n` +
  `// Auto-generated: npm run gen:founder (or run scripts/gen-founder-inline.mjs after updating src/assets/francisco-alba.png)\n` +
  `export const FOUNDER_INLINE_SRC = 'data:${mime};base64,${b64}';\n`;

fs.writeFileSync(out, body);
console.log('Wrote', out, '(' + fs.statSync(out).size + ' bytes) from', png, '(' + fs.statSync(png).size + ' bytes)');
