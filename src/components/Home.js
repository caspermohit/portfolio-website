import React, { useEffect, useMemo, useState } from 'react';
import BinaryField from './BinaryField';
import './Home.css';

const HERO_LINES = ['DIGITAL', 'DESIGNER', 'DEVELOPER'];

const Home = () => {
    const [ready, setReady] = useState(false);
    const [done, setDone] = useState(false);

    const letters = useMemo(
        () =>
            HERO_LINES.map((line) =>
                line.split('').map((ch, i) => ({
                    ch,
                    key: `${line}-${i}`,
                    delay: i * 28,
                }))
            ),
        []
    );

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setReady(true);
            setDone(true);
            return undefined;
        }

        const start = window.setTimeout(() => setReady(true), 40);
        // Guarantee final visible state even if CSS animations are paused/disabled
        const finish = window.setTimeout(() => setDone(true), 1100);
        return () => {
            window.clearTimeout(start);
            window.clearTimeout(finish);
        };
    }, []);

    return (
        <section
            className={`hero ${ready ? 'hero--ready' : ''} ${done ? 'hero--done' : ''}`}
            id="home"
        >
            <BinaryField density={20} />
            <div className="hero__glow" aria-hidden="true" />

            <div className="container hero__layout">
                <p className="hero__brand" data-cursor-text="Home">
                    Mohit Shah
                </p>

                <h1 className="hero__title" aria-label="Digital Designer and Developer">
                    {letters.map((line, lineIndex) => (
                        <span className="hero__line" key={HERO_LINES[lineIndex]}>
                            {line.map(({ ch, key, delay }) => (
                                <span
                                    className="hero__char"
                                    key={key}
                                    style={{ '--d': `${delay + lineIndex * 90}ms` }}
                                >
                                    {ch === ' ' ? '\u00A0' : ch}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>

                <p className="hero__status">
                    Full Stack Developer · Available for freelance &amp; product work
                    <a href="#contact" className="hero__hire" data-cursor-text="Contact">
                        → Contact
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Home;
