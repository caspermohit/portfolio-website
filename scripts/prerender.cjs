// Render the actual React pages at build time so crawlers need no JavaScript.
const fs = require('fs');
const path = require('path');
const Module = require('module');
const babel = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { origin, pages, structuredData } = require('../src/data/seo');
const project = path.resolve(__dirname, '..');
const originalLoader = require.extensions['.js'];
require.extensions['.js'] = (module, filename) => {
    if (!filename.startsWith(path.join(project, 'src') + path.sep)) return originalLoader(module, filename);
    const { code } = babel.transformSync(fs.readFileSync(filename, 'utf8'), { filename, babelrc: false, configFile: false, presets: [['@babel/preset-env', { targets: { node: 'current' } }], ['@babel/preset-react', { runtime: 'automatic' }]] });
    module._compile(code, filename);
};
for (const extension of ['.css', '.scss']) require.extensions[extension] = module => { module.exports = {}; };
for (const extension of ['.png', '.jpg', '.svg', '.webp']) require.extensions[extension] = (module, filename) => {
    const asset = `prerender-${path.basename(filename)}`;
    fs.copyFileSync(filename, path.join(project, 'build', asset));
    module.exports = '/' + asset;
};
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
    return originalLoad.call(this, request === 'gsap/ScrollTrigger' ? 'gsap/dist/ScrollTrigger' : request, parent, isMain);
};
// Effects run only after the browser mounts; the server must not emit their warnings.
React.useLayoutEffect = React.useEffect;
const App = require('../src/App').default;
const template = fs.readFileSync(path.join(project, 'build/index.html'), 'utf8');
const escape = text => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const [route, page] of Object.entries(pages)) {
    let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`);
    for (const [attribute, key, value] of [['name', 'description', page.description], ['property', 'og:title', page.title], ['property', 'og:description', page.description], ['property', 'og:url', origin + route], ['name', 'twitter:title', page.title], ['name', 'twitter:description', page.description]]) {
        html = html.replace(new RegExp(`<meta ${attribute}="${key}"[^>]*>`), `<meta ${attribute}="${key}" content="${escape(value)}"/>`);
    }
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${origin}${route}"/>`)
        .replace(/<script id="site-schema" type="application\/ld\+json">.*?<\/script>/s, `<script id="site-schema" type="application/ld+json">${JSON.stringify(structuredData(route)).replace(/</g, '\\u003c')}</script>`)
        .replace(/<noscript>.*?<\/noscript>/s, '')
        .replace('<div id="root"></div>', `<div id="root">${renderToString(React.createElement(App, { initialPath: route }))}</div>`);
    const destination = route === '/' ? path.join(project, 'build') : path.join(project, 'build', route.slice(1));
    fs.mkdirSync(destination, { recursive: true });
    fs.writeFileSync(path.join(destination, 'index.html'), html);
    console.log(`Rendered ${route}: ${html.length} bytes of HTML`);
}
fs.writeFileSync(path.join(project, 'build/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(route => `<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>\n`);
require('./check-seo.cjs');
