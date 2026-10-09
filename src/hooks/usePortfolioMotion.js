import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(root) {
    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.hero-composition h1 span', { y: 70, opacity: 0, stagger: 0.12, duration: 1.15, ease: 'power3.out' });
            gsap.from('.sculpture', { scale: 0.8, opacity: 0, duration: 1.4, ease: 'power3.out' });
            gsap.to('.folio-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true } });
        }, root);
        media.add('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            gsap.to('.sculpture-orbit', { rotation: 75, y: 100, ease: 'none', scrollTrigger: { trigger: '.folio-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
            const spreads = gsap.utils.toArray('.work-spread');
            spreads.forEach((spread, index) => {
                gsap.fromTo(spread.querySelector('.spread-screen'), { rotation: index % 2 ? 4 : -5, y: 45 }, { rotation: 0, y: 0, ease: 'none', scrollTrigger: { trigger: spread, start: 'top 95%', end: 'top 35%', scrub: 1 } });
                const next = spreads[index + 1];
                if (next) gsap.to(spread.querySelector('.spread-card'), { scale: 0.94, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 40px', scrub: 1 } });
            });
            gsap.fromTo('.folio-statement span', { opacity: 0.18 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.folio-statement', start: 'top 80%', end: 'bottom 45%', scrub: 1 } });
            gsap.utils.toArray('.creative-grid a').forEach(card => gsap.from(card, { y: 50, opacity: 0, scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 75%', scrub: 1 } }));
        }, root);
        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(refresh);
        const images = root.current.querySelectorAll('img');
        images.forEach(image => image.addEventListener('load', refresh));
        return () => { images.forEach(image => image.removeEventListener('load', refresh)); media.revert(); };
    }, [root]);
}
