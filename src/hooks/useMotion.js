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
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let lenis;
        const stop = () => {
            if (!lenis) return;
            lenis.destroy();
            if (window.__lenis === lenis) delete window.__lenis;
            lenis = undefined;
            document.documentElement.classList.remove('lenis', 'lenis-smooth');
        };
        const sync = () => {
            if (preference.matches) { stop(); return; }
            if (lenis) return;
            lenis = new Lenis({
                duration: 1.1,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                autoRaf: true,
            });
            window.__lenis = lenis;
            lenis.on('scroll', ScrollTrigger.update);
        };
        sync();
        preference.addEventListener('change', sync);
        return () => {
            preference.removeEventListener('change', sync);
            stop();
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
