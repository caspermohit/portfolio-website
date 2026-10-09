import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiPause, FiPlay, FiRotateCcw, FiArrowUpRight } from 'react-icons/fi';
import './MotionFilm.css';

const chapters = ['The spark', 'The shape', 'The build', 'The feeling'];

export default function MotionFilm() {
    const root = useRef(null);
    const animation = useRef(null);
    const playIntent = useRef(true);
    const visible = useRef(false);
    const [playing, setPlaying] = useState(true);
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [chapter, setChapter] = useState(0);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: reduce)', () => {
            setReduced(true);
            setChapter(0);
            gsap.set('.film-frame', { autoAlpha: 0 });
            gsap.set('.film-frame:first-child', { autoAlpha: 1 });
        }, root);
        media.add('(prefers-reduced-motion: no-preference)', () => {
            setReduced(false);
            const frames = root.current.querySelectorAll('.film-frame');
            const timeline = gsap.timeline({ paused: true, repeat: -1 });
            animation.current = timeline;
            gsap.set(frames, { autoAlpha: 0 });
            frames.forEach((frame, index) => {
                const start = index * 4;
                timeline.call(() => setChapter(index), [], start);
                timeline.fromTo(frame, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, immediateRender: false }, start);
                timeline.fromTo(frame.querySelectorAll('.film-word'), { yPercent: 105, rotation: 3 }, { yPercent: 0, rotation: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out', immediateRender: false }, start + 0.1);
                timeline.fromTo(frame.querySelectorAll('.film-object'), { scale: 0.5, rotation: -25, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, stagger: 0.12, duration: 0.75, ease: 'back.out(1.5)', immediateRender: false }, start + 0.2);
                timeline.to(frame.querySelectorAll('.film-object'), { y: -14, rotation: 8, stagger: 0.08, duration: 2.2, ease: 'sine.inOut' }, start + 1.1);
                timeline.to(frame, { autoAlpha: 0, duration: 0.25 }, start + 3.75);
            });
            timeline.fromTo('.film-time-progress', { scaleX: 0 }, { scaleX: 1, duration: 16, ease: 'none' }, 0);
            gsap.set(frames[0], { autoAlpha: 1 });
            const observer = new IntersectionObserver(([entry]) => {
                visible.current = entry.isIntersecting;
                if (entry.isIntersecting && playIntent.current && !document.hidden) timeline.play();
                else timeline.pause();
            }, { threshold: 0.2 });
            observer.observe(root.current);
            const onVisibility = () => {
                if (!document.hidden && visible.current && playIntent.current) timeline.play();
                else timeline.pause();
            };
            document.addEventListener('visibilitychange', onVisibility);
            return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); timeline.kill(); animation.current = null; };
        }, root);
        return () => media.revert();
    }, []);

    const toggle = () => {
        const next = !playIntent.current;
        playIntent.current = next;
        setPlaying(next);
        if (next && visible.current) animation.current?.play();
        else {
            if (animation.current && animation.current.time() < 1) animation.current.seek(1);
            animation.current?.pause();
        }
    };
    const replay = () => { playIntent.current = true; setPlaying(true); animation.current?.restart(); };

    return <section className="motion-film-section folio-section" ref={root} aria-labelledby="motion-film-title">
        <div className="film-intro"><div><p className="eyebrow">A little motion. A lot of intention.</p><h2 id="motion-film-title">Ideas deserve<br />to <em>move.</em></h2></div><p>Design, code, and a little creative mischief.<br />Here’s how I connect them.</p></div>
        <figure className="motion-film"><div className="film-stage" aria-hidden="true">
            <div className="film-frame frame-spark"><div className="film-type"><div><span className="film-word">It starts</span></div><div><span className="film-word">with an <em>idea.</em></span></div></div><div className="film-object film-asterisk">✳</div><svg className="film-object film-scribble" viewBox="0 0 240 140"><path d="M10 90C30 5 90 10 75 80S155 130 130 40S230 30 210 100" /></svg><span className="film-object film-cursor">↖</span><span className="film-object film-note">what if?</span></div>
            <div className="film-frame frame-shape"><div className="film-type"><div><span className="film-word">Give it</span></div><div><span className="film-word"><em>shape.</em></span></div></div><span className="film-object film-letter">Aa</span><div className="film-object film-grid">{Array.from({ length: 9 }, (_, i) => <span key={i} />)}</div><span className="film-object film-rule">↔</span></div>
            <div className="film-frame frame-build"><div className="film-type"><div><span className="film-word">Make it</span></div><div><span className="film-word"><em>work.</em></span></div></div><div className="film-object film-product"><div><i /><i /><i /></div><img src="/projects/shade.jpg" alt="" width="1440" height="1000" loading="lazy" /></div><div className="film-object film-code">{'{ build: true }'}</div><span className="film-object film-pointer">↗</span></div>
            <div className="film-frame frame-feeling"><div className="film-type"><div><span className="film-word">Make it</span></div><div><span className="film-word"><em>memorable.</em></span></div></div><div className="film-object film-seal">ms.</div><svg className="film-object film-loop" viewBox="0 0 280 120"><ellipse cx="140" cy="60" rx="125" ry="44" /></svg><span className="film-object film-signature">mohit shah / design + code</span></div>
            <span className="film-corner">MS / MOTION STUDY</span><span className="film-frame-count">0{chapter + 1} / 04</span>
        </div><div className="film-time-track" aria-hidden="true"><div className="film-time-progress" /></div>
        <figcaption className="film-controls"><p>{reduced ? 'A still from the motion study' : chapters[chapter]}<span>Original motion study · 16 seconds · No audio</span></p><div><button onClick={toggle} disabled={reduced} aria-label={playing ? 'Pause motion study' : 'Play motion study'}>{playing ? <FiPause /> : <FiPlay />}{playing ? 'Pause' : 'Play'}</button><button onClick={replay} disabled={reduced} aria-label="Replay motion study"><FiRotateCcw />Replay</button></div></figcaption></figure>
        <p className="film-description">An idea takes shape, becomes a working product, and leaves an impression. A short study in typography, composition, and motion.</p><a className="film-talk" href="#contact">Let’s bring your idea to life <FiArrowUpRight /></a>
    </section>;
}
