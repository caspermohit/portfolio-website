import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(root) {
    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.reference-hero-title > span', { y: 70, opacity: 0, stagger: 0.12, duration: 1.15, ease: 'power3.out' });
            gsap.utils.toArray('.scroll-ink').forEach(line => {
                const hero = line.closest('.reference-hero-stage');
                const finale = line.closest('.reference-finale');
                gsap.fromTo(line.querySelector('.scroll-ink-fill'), { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: {
                    trigger: hero ? '.reference-hero-stage' : finale ? '.reference-finale' : line,
                    start: hero ? 'top top' : 'top 85%',
                    end: hero ? 'center top' : finale ? 'center 55%' : 'bottom 60%',
                    scrub: 0.5,
                } });
            });
            gsap.to('.folio-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true } });
        }, root);
        media.add('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            gsap.to('.reference-collage', { y: 45, rotation: 4, ease: 'none', scrollTrigger: { trigger: '.folio-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
            gsap.utils.toArray('.finale-float').forEach((piece, i) => gsap.fromTo(piece, { y: 85, rotation: i ? 12 : -16 }, { y: -85, rotation: i ? -6 : 6, ease: 'none', scrollTrigger: { trigger: '.reference-finale', start: 'top bottom', end: 'bottom top', scrub: 1 } }));
            gsap.fromTo('.reference-finale h2', { y: 65 }, { y: 0, ease: 'none', scrollTrigger: { trigger: '.reference-finale', start: 'top 90%', end: 'top 25%', scrub: 1 } });
            gsap.utils.toArray('.creative-grid a').forEach(card => gsap.from(card, { y: 50, opacity: 0, scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 75%', scrub: 1 } }));
        }, root);
        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(refresh);
        const images = root.current.querySelectorAll('img');
        images.forEach(image => image.addEventListener('load', refresh));
        return () => { images.forEach(image => image.removeEventListener('load', refresh)); media.revert(); };
    }, [root]);
}
