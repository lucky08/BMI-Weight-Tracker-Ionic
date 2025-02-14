const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../.angular/cache/19.1.7/app/vite/deps/chunk-2TYK2BCW.js');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /return import\(\"\.\/\"\.concat\(a, \"\.entry\.js\"\)\.concat\(\"\"\)\)/,
    'return import(/* @vite-ignore */ "./".concat(a, ".entry.js").concat(""))',
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Successfully added @vite-ignore to import statement.');
} else {
  console.warn(`⚠️ File not found: ${filePath}`);
}
