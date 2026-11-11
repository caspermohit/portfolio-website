import ScrollInk from './ScrollInk';
import Doodle from './Doodle';
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiArrowRight, FiX, FiPlay, FiMaximize2, FiArrowLeft } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { designWork } from '../data/designWork';
import './DesignShowcase.css';

export function DesignStudy({ project, onClose, opener, initialView = 0 }) {
    const dialog = useRef(null);
    const titleId = useId();
    const [index, setIndex] = useState(initialView);
    const media = project.media[index];
    useEffect(() => {
        const element = dialog.current;
        const previousOverflow = document.body.style.overflow;
        const lenis = window.__lenis;
        const wasStopped = lenis?.isStopped;
        lenis?.stop(); document.body.style.overflow = 'hidden'; element.showModal();
        return () => { element.close(); document.body.style.overflow = previousOverflow; if (!wasStopped) lenis?.start(); if (opener?.isConnected) opener.focus({ preventScroll: true }); };
    }, [opener]);
    return <dialog className="design-study" ref={dialog} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} data-lenis-prevent>
        <div className="study-topbar"><span>{project.title}<span className="study-topbar-discipline"> / {project.category}</span></span><button onClick={onClose} aria-label={`Close ${project.title} design study`} autoFocus><FiX size={22} /></button></div>
        <div className="study-body"><header><p className="eyebrow">{project.status}</p><h2 id={titleId}>{project.title}</h2><p>{project.summary}</p><dl className="study-facts"><div><dt>Discipline</dt><dd>{project.category}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Presentation</dt><dd>{project.kind === 'ux' ? 'Responsive design study' : project.kind === 'print' ? 'Multi-format artwork' : 'Two 15-second films'}</dd></div></dl><div className="study-scope">{project.scope.map(item => <span key={item}>{item}</span>)}</div></header>
            <div className="study-story"><div><h3>The context</h3><p>{project.context}</p></div><div><h3>The design direction</h3><p>{project.approach}</p></div></div>
            <div className="study-screen-options" role="group" aria-label={`${project.title} views`}>{project.media.map((item, i) => <button key={item.src} aria-pressed={index === i} onClick={() => setIndex(i)}>{String(i + 1).padStart(2, '0')} / {item.label}</button>)}</div>
            <div className="study-viewer-bar"><span role="status">{String(index + 1).padStart(2, '0')} / {String(project.media.length).padStart(2, '0')} · {media.label}</span><div><button disabled={index === 0} onClick={() => setIndex(index - 1)} aria-label="Previous design view"><FiArrowLeft /></button><button disabled={index === project.media.length - 1} onClick={() => setIndex(index + 1)} aria-label="Next design view"><FiArrowRight /></button>{media.type !== 'video' && <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${media.label} image at full size`}><FiMaximize2 /></a>}</div></div><figure className={`study-media study-media-${project.kind}${media.label === 'Mobile' ? ' study-mobile-screen' : ''}`} key={media.src}>{media.type === 'video' ? <video controls playsInline preload="none" poster={media.poster} aria-label={media.alt}><source src={media.src} type="video/mp4" />Your browser does not support this video.</video> : <img src={media.src} alt={media.alt} />}<figcaption>{media.caption}</figcaption></figure>
            <div className="study-bottom"><p>{project.boundary}</p>{project.links.map(link => <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}<FiArrowUpRight /></a>)}</div>
        </div>
    </dialog>;
}

export default function DesignShowcase() {
    const [filter, setFilter] = useState('all');
    const [motionView, setMotionView] = useState(0);
    const [selected, setSelected] = useState(null);
    const [initialView, setInitialView] = useState(0);
    const opener = useRef(null);
    const root = useRef(null);
    const open = (event, project, view = 0) => { setInitialView(view); root.current?.querySelectorAll('video').forEach(video => video.pause()); opener.current = event.currentTarget; setSelected(project); };
    useEffect(() => {
        const video = root.current?.querySelector('video');
        if (!video) return undefined;
        const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) video.pause(); });
        observer.observe(video);
        const pause = () => { if (document.hidden) video.pause(); };
        document.addEventListener('visibilitychange', pause);
        return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', pause); };
    }, [filter, motionView]);
    useEffect(() => {
        const followSection = () => {
            if (['#design', '#ux-design', '#brand-design', '#motion-design'].includes(window.location.hash)) setFilter('all');
        };
        window.addEventListener('hashchange', followSection);
        return () => window.removeEventListener('hashchange', followSection);
    }, []);
    useLayoutEffect(() => {
        const motion = gsap.matchMedia();
        motion.add('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
            gsap.utils.toArray('.exhibera-cover, .relyup-cover, .design-motion-player', root.current).forEach(surface => {
                gsap.fromTo(surface, { y: 24 }, { y: 0, ease: 'none', scrollTrigger: { trigger: surface, start: 'top 95%', end: 'top 45%', scrub: 1 } });
            });
        }, root);
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => { cancelAnimationFrame(frame); motion.revert(); };
    }, [filter]);
    const ux = designWork[0], print = designWork[1], motion = designWork[2];
    return <section className="design-showcase folio-section" id="design" aria-labelledby="design-heading" ref={root}>
        <header className="design-intro"><div><p className="eyebrow">Selected design work</p><h2 id="design-heading"><ScrollInk>From screens<br />to <em>spaces.</em></ScrollInk></h2></div><div className="doodle-section-note"><Doodle name="pencil" className="section-ink-doodle" /><p>Interfaces to explore.<br />Design to hold. Stories that move.<br /><span>UX / UI · Visual design · Motion</span></p></div></header>
        <div className="design-filters" role="group" aria-label="Browse design disciplines">{[{ id: 'all', label: 'All design' }, { id: 'ux', label: 'UX / UI' }, { id: 'print', label: 'Brand & print' }, { id: 'motion', label: 'Motion' }].map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
        {(filter === 'all' || filter === 'ux') && <article className="exhibera-feature" id="ux-design"><button className="exhibera-cover" onClick={event => open(event, ux)} aria-label="Explore Exhibera UX and UI design" aria-haspopup="dialog"><span className="design-cover-label">Exhibera / Responsive product design</span><div className="exhibera-desktop"><div aria-hidden="true"><i /><i /><i /></div><img src={ux.media[0].src} alt={ux.media[0].alt} width="1400" height="974" loading="lazy" /></div><div className="exhibera-mobile"><img src={ux.media[1].src} alt={ux.media[1].alt} loading="lazy" /></div><span className="design-cover-action">Explore the design <FiArrowUpRight /></span></button><div className="design-project-info"><div><p className="eyebrow">UX / UI · Design prototype</p><h3>Exhibera</h3><p>{ux.summary}</p></div><div><p>{ux.description}</p><button onClick={event => open(event, ux)} aria-haspopup="dialog">View the design story <FiArrowRight /></button></div></div><div className="exhibera-journeys"><button onClick={event => open(event, ux, 0)}>01 <span>Discover opportunities</span><FiArrowUpRight /></button><button onClick={event => open(event, ux, 3)}>02 <span>Artist workspace</span><FiArrowUpRight /></button><button onClick={event => open(event, ux, 5)}>03 <span>Jury review</span><FiArrowUpRight /></button></div></article>}
        <div className={`design-secondary ${filter !== 'all' ? 'single-discipline' : ''}`}>
            {(filter === 'all' || filter === 'print') && <article className="relyup-feature" id="brand-design"><button className="relyup-cover" onClick={event => open(event, print)} aria-label="Explore RelyUp flyers banners and backdrop" aria-haspopup="dialog"><span className="design-cover-label">RelyUp / Brand & print</span><div className="relyup-backdrop"><img src={print.media[3].src} alt={print.media[3].alt} loading="lazy" /></div><div className="relyup-flyer"><img src={print.media[0].src} alt={print.media[0].alt} loading="lazy" /></div><div className="relyup-banner"><img src={print.media[2].src} alt={print.media[2].alt} loading="lazy" /></div><span className="design-cover-action">See each format <FiMaximize2 /></span></button><div className="design-card-info"><p className="eyebrow">Visual design · Client work</p><h3>Built to be seen.</h3><p>Flyers, banners, and a backdrop.<br />A consistent presence at every scale.</p><button onClick={event => open(event, print)} aria-haspopup="dialog">Explore RelyUp design <FiArrowUpRight /></button></div></article>}
            {(filter === 'all' || filter === 'motion') && <article className="design-motion-feature" id="motion-design"><div className="design-motion-player"><div><span>RelyUp / Motion graphics</span><FiPlay aria-hidden="true" /></div><video controls playsInline key={motion.media[motionView].src} preload="none" poster={motion.media[motionView].poster} aria-label={motion.media[motionView].alt}><source src={motion.media[motionView].src} type="video/mp4" />Your browser does not support this video.</video><div className="motion-film-options" role="group" aria-label="Choose a RelyUp film">{motion.media.map((film, i) => <button key={film.src} aria-pressed={motionView === i} onClick={() => setMotionView(i)}>{film.label}</button>)}<p className="motion-film-meta">15 seconds · Silent film</p></div></div><div className="design-card-info"><p className="eyebrow">Motion graphics · Client work</p><h3>Made to move.</h3><p>Two 15-second films for trade-show screens.<br />Type, rhythm, and brand storytelling.</p><button onClick={event => open(event, motion, motionView)} aria-haspopup="dialog">Explore both films <FiArrowUpRight /></button></div></article>}
        </div>
        {selected && <DesignStudy key={selected.id} project={selected} initialView={initialView} opener={opener.current} onClose={() => setSelected(null)} />}
    </section>;
}
