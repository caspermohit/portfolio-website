import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const root = sectionRef.current;
        if (!root) return undefined;

        const mm = gsap.matchMedia();
        mm.add('(min-width: 800px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            const layout = root.querySelector('.hero__layout');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
            tl.to(layout, { y: -72, ease: 'none' }, 0);
            return () => tl.kill();
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="hero" id="home" ref={sectionRef}>
            <div className="container hero__layout">
                <p className="hero__index">01 — Full stack</p>
                <p className="hero__brand">Mohit Shah</p>
                <h1>Digital designer and developer</h1>
                <p className="hero__status">
                    Available for freelance and product work
                    {' '}
                    <a href="#contact">Contact</a>
                </p>
            </div>
        </section>
    );
};

export default Home;
