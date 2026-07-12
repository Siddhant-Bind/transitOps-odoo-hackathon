const fs = require('fs');
const path = require('path');

const files = [
  { file: 'dashboard.html', out: 'src/pages/ExecutiveDashboard.jsx', componentName: 'ExecutiveDashboard' },
  { file: 'fleet.html', out: 'src/pages/Fleet.jsx', componentName: 'Fleet' },
  { file: 'trips.html', out: 'src/pages/Trips.jsx', componentName: 'Trips' },
  { file: 'drivers.html', out: 'src/pages/Drivers.jsx', componentName: 'Drivers' },
  { file: 'fuel.html', out: 'src/pages/Fuel.jsx', componentName: 'Fuel' },
  { file: 'maintenance.html', out: 'src/pages/Maintenance.jsx', componentName: 'Maintenance' },
  { file: 'reports.html', out: 'src/pages/Reports.jsx', componentName: 'Reports' },
  { file: 'settings.html', out: 'src/pages/Settings.jsx', componentName: 'Settings' }
];

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Minimal manual mapping for generic lucide icons from data-lucide attributes in HTML
// The parsing will just strip `<svg>` or `<i data-lucide="...">` and replace with `<span>icon</span>` or similar if needed.
// Even better: since lucide-react is installed, we can just replace `<i class="..." data-lucide="..."></i>` with `<i className="..." data-lucide="..."></i>` 
// and in the React component do a global `lucide.createIcons()` effect, OR we just let the browser extension `lucide` script do it.
// Actually, it's safer to just replace standard HTML things like `class="` to `className="` and `for="` to `htmlFor="`.

files.forEach(({ file, out, componentName }) => {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let html = fs.readFileSync(file, 'utf-8');
  
  // Extract just the <main> block
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.log(`No <main> found in ${file}`);
    return;
  }
  
  let jsx = mainMatch[1];
  
  // Basic HTML to JSX conversions
  jsx = jsx.replace(/class=/g, 'className=')
           .replace(/for=/g, 'htmlFor=')
           .replace(/<!--[\s\S]*?-->/g, '') // remove comments
           // Fix self-closing tags issues (input, img, br, hr)
           .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
           .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
           .replace(/<br([^>]*[^\/])>/g, '<br$1 />')
           .replace(/<hr([^>]*[^\/])>/g, '<hr$1 />')
           .replace(/\bon[a-z]+="[^"]*"/ig, '') // Remove all inline event handlers to prevent React string crashes
           .replace(/style="([^"]*)"/g, (match, p1) => {
             // Basic style inline convert, this might be tricky, skip full parse and just return null style or empty object
             return `style={{}}`;
           });

  // Material symbols are rendered as `<span class="material-symbols-outlined...">icon_name</span>`
  // We will leave them mostly as-is, just making sure they render properly.
  
  const componentStr = `
import React, { useEffect } from 'react';

const ${componentName} = () => {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      ${jsx}
    </>
  );
};

export default ${componentName};
`;

  ensureDir(out);
  fs.writeFileSync(out, componentStr);
  console.log(`Generated ${out}`);
});
