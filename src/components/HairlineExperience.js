import ScrollInk from './ScrollInk';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiPause, FiPlay, FiMove } from 'react-icons/fi';
import HairlineFigure, { useIllustrationMotion } from './HairlineFigure';
import './HairlineExperience.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function HairlineHero() {
    const motion = useIllustrationMotion();
    return <div className="hero-landscape">
        <div className="landscape-orbit"><HairlineFigure figure="terrain" playing={motion.playing} intensity={0.8} label="An isometric landscape of pillars that rise around your pointer" /></div>
        <div className="landscape-caption"><span><FiMove aria-hidden="true" size={13} /> Move to make a mark</span>
            {!motion.reduced && <button type="button" onClick={motion.toggle} aria-label={motion.playing ? 'Pause hero illustration' : 'Play hero illustration'}>{motion.playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}</button>}
        </div>
    </div>;
}

const studies = [
    { id: 'interface', label: 'The interface', figure: 'exploded', title: 'Clarity, layer by layer.', text: 'Good interfaces make the complicated feel simple. I shape the hierarchy, the interactions, and the details that bring a product together.', note: 'Move across the window to reveal its layers.', tags: 'UX / UI · Design systems · Responsive design' },
    { id: 'system', label: 'The system', figure: 'terminal', title: 'Beautiful outside. Considered inside.', text: 'The experience is only as good as what supports it. I connect thoughtful frontends with the APIs, data, and application logic behind them.', note: 'Move up and down to explore the terminal.', tags: 'React · Laravel · APIs & databases' },
    { id: 'feeling', label: 'The feeling', figure: 'laptop', title: 'A little delight goes a long way.', text: 'A response to a gesture. A transition that feels natural. I use motion to make digital experiences feel more intuitive, expressive, and alive.', note: 'Move vertically to open and close the laptop.', tags: 'Creative development · GSAP · Interaction' },
];

export default function HairlineExperience() {
    const [selected, setSelected] = useState(0);
    const buttons = useRef([]);
    const section = useRef(null);
    const sequence = useRef(null);
    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        media.add('(min-width: 900px) and (min-height: 680px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            const trigger = ScrollTrigger.create({
                trigger: section.current.querySelector('.craft-studio'),
                start: 'top 100px', end: () => `+=${window.innerHeight * 2.4}`,
                pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
                onUpdate: self => setSelected(Math.min(2, Math.floor(self.progress * 3))),
            });
            sequence.current = trigger;
            return () => { sequence.current = null; };
        }, section);
        return () => media.revert();
    }, []);
    const selectStudy = index => {
        const trigger = sequence.current;
        if (trigger?.isActive) {
            const position = trigger.start + (trigger.end - trigger.start) * ((index + 0.25) / 3);
            if (window.__lenis) window.__lenis.scrollTo(position);
            else window.scrollTo({ top: position, behavior: 'smooth' });
        }
        setSelected(index);
    };
    const motion = useIllustrationMotion();
    const study = studies[selected];
    const selectWithKeys = event => {
        const movement = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
        let next;
        if (movement) next = (selected + movement + studies.length) % studies.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = studies.length - 1;
        else return;
        event.preventDefault();
        selectStudy(next);
        buttons.current[next]?.focus();
    };
    return <section ref={section} className="craft-section folio-section" id="craft" aria-labelledby="craft-heading">
        <div className="craft-intro"><div><p className="eyebrow">The craft behind the click</p><h2 id="craft-heading"><ScrollInk>Thought through.<br /><em>Built to feel.</em></ScrollInk></h2></div><p>Design and development belong together.<br />Here’s a small, hands-on look at how I think.</p></div>
        <div className="craft-studio">
            <div className="craft-toolbar"><div role="tablist" aria-label="Explore my approach" onKeyDown={selectWithKeys}>{studies.map((item, index) => <button key={item.id} ref={node => { buttons.current[index] = node; }} type="button" id={`craft-tab-${item.id}`} role="tab" aria-selected={index === selected} aria-controls="craft-panel" tabIndex={index === selected ? 0 : -1} onClick={() => selectStudy(index)}><span className="craft-tab-dot" />{item.label}</button>)}</div><span className="craft-live"><span /> Interactive study</span></div>
            <div id="craft-panel" role="tabpanel" aria-labelledby={`craft-tab-${study.id}`} tabIndex={0} className="craft-panel">
                <div className="craft-drawing"><HairlineFigure figure={study.figure} playing={motion.playing} label={study.note} intensity={0.75} /><span className="craft-cross craft-cross-one" aria-hidden="true">+</span><span className="craft-cross craft-cross-two" aria-hidden="true">+</span></div>
                <div className="craft-copy" key={study.id}><span className="craft-small">Design × Code × Motion</span><h3>{study.title}</h3><p>{study.text}</p><span className="craft-tags">{study.tags}</span><a href="#contact">Let’s make something work <FiArrowUpRight aria-hidden="true" /></a></div>
            </div>
            <div className="craft-footer"><p><FiMove aria-hidden="true" />{study.note}</p>{motion.reduced ? <span>Reduced motion enabled</span> : <button type="button" onClick={motion.toggle} aria-label={motion.playing ? 'Pause studio illustration' : 'Play studio illustration'}>{motion.playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}{motion.playing ? 'Pause motion' : 'Play motion'}</button>}</div>
        </div>
        <div className="craft-signature"><span>Built with curiosity. Finished with care.</span><a href="https://github.com/lucasmarkes/hairline" target="_blank" rel="noopener noreferrer">Line studies powered by Hairline <FiArrowUpRight aria-hidden="true" size={13} /></a></div>
    </section>;
}
