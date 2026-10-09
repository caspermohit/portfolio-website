import { useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth inertia scroll (wodniack-style). Respects prefers-reduced-motion.
 */
export function useLenis() {
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return undefined;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            autoRaf: true,
        });

        document.documentElement.classList.add('lenis', 'lenis-smooth');
        window.__lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        // Anchor links: use Lenis scrollTo when available
        const onClick = (e) => {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            lenis.scrollTo(el, { offset: -72 });
        };
        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('click', onClick);
            lenis.destroy();
            delete window.__lenis;
            document.documentElement.classList.remove('lenis', 'lenis-smooth');
        };
    }, []);
}

/**
 * Adds .is-in-view to [data-reveal] elements when they enter the viewport.
 */
export function useSectionReveal() {
    useLayoutEffect(() => {
        const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
        if (!nodes.length) return undefined;

        const reveal = (n) => n.classList.add('is-in-view');

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            nodes.forEach(reveal);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        reveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
        );

        nodes.forEach((n) => observer.observe(n));

        // Safety: never leave content permanently invisible
        const safety = window.setTimeout(() => {
            nodes.forEach(reveal);
        }, 2500);

        return () => {
            observer.disconnect();
            window.clearTimeout(safety);
        };
    }, []);
}
