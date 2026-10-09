import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { origin, pages, structuredData } from '../data/seo';

export default function SEO() {
    const { pathname } = useLocation();
    useEffect(() => {
        const path = pathname === '/client-guide' ? '/client-guide/' : pathname;
        const known = Boolean(pages[path]);
        const canonicalPath = known ? path : '/';
        const page = pages[canonicalPath];
        const setMeta = (attribute, name, content) => {
            let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
            if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, name); document.head.appendChild(tag); }
            tag.content = content;
        };
        document.title = page.title;
        setMeta('name', 'description', page.description);
        setMeta('name', 'robots', known ? 'index,follow,max-image-preview:large' : 'noindex,follow');
        ['og:title', 'twitter:title'].forEach(name => setMeta(name.startsWith('og:') ? 'property' : 'name', name, page.title));
        ['og:description', 'twitter:description'].forEach(name => setMeta(name.startsWith('og:') ? 'property' : 'name', name, page.description));
        setMeta('property', 'og:url', origin + canonicalPath);
        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
        canonical.href = origin + canonicalPath;
        let schema = document.getElementById('site-schema');
        if (!schema) { schema = document.createElement('script'); schema.id = 'site-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
        schema.textContent = JSON.stringify(structuredData(canonicalPath));
    }, [pathname]);
    return null;
}
