import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJson(p) {
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const slug = process.argv[2] || 'take-a-wok';
const base = path.join(__dirname, '..', 'src', 'data', slug);

const files = ['carta.json','salsas.json','entradas.json','cocina.json','meta.json'];
let ok = true;

files.forEach(f => {
  const p = path.join(base, f);
  if (!fs.existsSync(p)) {
    console.error('Falta archivo:', p);
    ok = false;
    return;
  }
  try {
    loadJson(p);
  } catch (e) {
    console.error('JSON inválido en', p, e.message);
    ok = false;
  }
});

if (!ok) {
  console.error('Validación fallida para', slug);
  process.exit(1);
}
console.log('Validación OK para', slug);
process.exit(0);
"@ | Out-File -FilePath .\scripts\validate-data.js -Encoding utf8"