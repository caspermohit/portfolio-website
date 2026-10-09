const fs = require('fs');
const assert = require('assert/strict');
const path = require('path');
const { origin, pages } = require('../src/data/seo');
const build = path.resolve(__dirname, '../build');
for (const route of Object.keys(pages)) {
    const html = fs.readFileSync(path.join(build, route, 'index.html'), 'utf8');
    assert(html.includes(`<link rel="canonical" href="${origin}${route}"`), `Canonical missing: ${route}`);
    assert(/<div id="root">.+<h1/s.test(html), `Real HTML content missing: ${route}`);
    const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema['@graph'][2].url, origin + route);
    assert(!html.includes('%PUBLIC_URL%'));
    assert(html.includes('index,follow,max-image-preview:large'));
    assert(html.includes(pages[route].description.replace(/&/g, '&amp;')));
}
const robots = fs.readFileSync(path.join(build, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(robots.includes('Claude-SearchBot'));
const sitemap = fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8');
Object.keys(pages).forEach(route => assert(sitemap.includes(`<loc>${origin}${route}</loc>`)));
assert(fs.readFileSync(path.join(build, '_redirects'), 'utf8').includes('/404.html   404'));
console.log('SEO checks passed: static content, canonical URLs, metadata, schema, crawler access, sitemap.');
