import React, { useEffect, useRef } from 'react';
import spideyImg from './assets/img/spiderman.png';
import './SpiderMan.css';

/**
 * Upside-down Spider-Man that descends as you scroll down
 * and climbs back up as you scroll up.
 */
const SpiderMan = () => {
    const webRef = useRef(null);
    const figureRef = useRef(null);
    const rafRef = useRef(0);
    const targetY = useRef(0);
    const currentY = useRef(0);

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return undefined;

        const measure = () => {
            const maxScroll = Math.max(
                1,
                document.documentElement.scrollHeight - window.innerHeight
            );
            const scroll = window.__lenis?.scroll ?? window.scrollY;
            const progress = Math.min(1, Math.max(0, scroll / maxScroll));
            const travel = window.innerHeight * 0.62;
            // Slight peek at top, then drop through the viewport
            targetY.current = -40 + progress * travel;
        };

        const tick = () => {
            measure();
            currentY.current += (targetY.current - currentY.current) * 0.14;
            const sway = Math.sin(performance.now() / 850) * 3.5;
            const y = currentY.current;

            if (figureRef.current) {
                figureRef.current.style.transform =
                    `translate3d(${sway}px, ${y}px, 0) rotate(${sway * 0.28}deg)`;
            }
            if (webRef.current) {
                // Extend web from top of viewport to the top of the PNG (which has its own strand)
                const strand = Math.max(0, y + 4);
                webRef.current.style.height = `${strand}px`;
                webRef.current.style.transform = `translateX(${sway * 0.3}px)`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        measure();
        currentY.current = targetY.current;
        rafRef.current = requestAnimationFrame(tick);

        const onResize = () => measure();
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className="spiderman" aria-hidden="true">
            <div className="spiderman__web" ref={webRef} />
            <div className="spiderman__figure" ref={figureRef}>
                <img
                    className="spiderman__img"
                    src={spideyImg}
                    alt=""
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default SpiderMan;
