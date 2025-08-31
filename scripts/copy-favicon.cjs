const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'src', 'assets', 'enginuitylogo.png');
const destDir = path.resolve(__dirname, '..', 'public');
const dest = path.join(destDir, 'favicon.png');

if (!fs.existsSync(src)) {
  console.error('Source logo not found:', src);
  process.exit(1);
}

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('favicon copied to', dest);
