const fs = require('fs');
const path = require('path');
function replace(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) replace(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) {
      let original = fs.readFileSync(p, 'utf8');
      let c = original;
      c = c.replace(/#F47140/gi, '#00236f')
           .replace(/#E06F47/gi, '#00236f')
           .replace(/#FFF0EB/gi, '#e5eeff')
           .replace(/#FCFBF8/gi, '#f8f9ff')
           .replace(/#3A312B/gi, '#0b1c30')
           .replace(/#D95A2B/gi, '#1a3d8c')
           .replace(/#FFE4E4/gi, '#ffdad6')
           .replace(/#FAD7CB/gi, '#dce1ff')
           .replace(/bg-orange-50/g, 'bg-blue-50')
           .replace(/bg-orange-500\/20/g, 'bg-blue-500/20')
           .replace(/bg-orange-500/g, 'bg-blue-600')
           .replace(/text-orange-500/g, 'text-blue-600')
           .replace(/text-orange-600/g, 'text-blue-600')
           .replace(/text-orange-100/g, 'text-blue-200')
           .replace(/text-orange-200/g, 'text-blue-300')
           .replace(/rgba\(244,\s*113,\s*64/g, 'rgba(0, 35, 111')
           .replace(/rgba\(224,\s*111,\s*71/g, 'rgba(0, 35, 111');
      
      if (c !== original) {
        fs.writeFileSync(p, c);
        console.log('Patched: ' + p);
      }
    }
  });
}
replace('./src');
console.log('Done.');
