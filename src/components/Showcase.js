import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shippedProjects } from '../data/projects';
import './Showcase.css';

gsap.registerPlugin(ScrollTrigger);

const picks = ['Shade & Shine', 'Expense Tracker', 'Sharecare']
    .map((title) => shippedProjects.find((project) => project.title === title))
    .filter(Boolean);

const Showcase = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return undefined;

        const mm = gsap.matchMedia();
        mm.add('(min-width: 800px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            const chapters = root.querySelectorAll('.chapter');
            const triggers = [];

            chapters.forEach((chapter) => {
                const title = chapter.querySelector('h2');
                const points = chapter.querySelectorAll('.chapter__point');
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: chapter,
                        pin: true,
                        start: 'top top',
                        end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                });
                tl.fromTo(title, { scale: 0.86 }, { scale: 1, ease: 'none', duration: 0.65 }, 0);
                tl.fromTo(
                    points,
                    { y: 28, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, stagger: 0.16, duration: 0.2, ease: 'none', immediateRender: true },
                    0.28,
                );
                triggers.push(tl);
            });

            ScrollTrigger.refresh();
            return () => triggers.forEach((tl) => tl.kill());
        });

        return () => mm.revert();
    }, []);

    return (
        <div ref={rootRef}>
            {picks.map((project, index) => (
                <section className="chapter" key={project.title} aria-labelledby={`chapter-${index}`}>
                    <div className="chapter__stage">
                        <p className="chapter__kicker">
                            {String(index + 1).padStart(2, '0')}
                            {' — '}
                            {project.dateLabel}
                        </p>
                        <h2 id={`chapter-${index}`}>{project.title}</h2>
                        <ol className="chapter__points">
                            <li className="chapter__point">{project.description}</li>
                            <li className="chapter__point">{project.technologies}</li>
                            <li className="chapter__point">
                                <a href={project.live} target="_blank" rel="noopener noreferrer">Live demo</a>
                            </li>
                        </ol>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Showcase;
