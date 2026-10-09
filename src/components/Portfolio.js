import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight as ArrowUpRight, FiArrowDown as ArrowDown, FiPlus as Plus, FiMinus as Minus } from 'react-icons/fi';
import Contact from './Contact';
import Work from './Work';
import FeaturedWork from './FeaturedWork';
import MotionFilm from './MotionFilm';
import FreelanceClients from './FreelanceClients';
import { creativeProjects } from '../data/projects';
import portrait from './assets/img/profile.png';
import { usePortfolioMotion } from '../hooks/usePortfolioMotion';
import './Portfolio.css';

const External = ({ href, children, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;

function Sculpture() {
    return <div className="sculpture" aria-hidden="true"><div className="sculpture-orbit"><div className="sculpture-core">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ '--slice': i }} />)}</div></div><div className="sculpture-shadow" /></div>;
}

export function Navigation({ guide = false }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const escape = event => { if (event.key === 'Escape') { setOpen(false); document.querySelector('.folio-menu')?.focus(); } };
        document.addEventListener('keydown', escape);
        return () => document.removeEventListener('keydown', escape);
    }, []);
    return <header className="folio-nav">
        <Link className="folio-brand" to="/" onClick={() => setOpen(false)}>mohit shah<span className="brand-dot">.</span></Link>
        <button className="folio-menu" aria-expanded={open} aria-controls="folio-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} {open ? <Minus size={16} /> : <Plus size={16} />}</button>
        <nav id="folio-navigation" aria-label="Main navigation" className={open ? 'is-open' : ''}>
            {guide ? <><Link to="/">Portfolio</Link><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#process" onClick={() => setOpen(false)}>Process</a><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a><a className="nav-contact" href="#start" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={16} /></a></> : <><a href="#work" onClick={() => setOpen(false)}>Work</a><a href="#clients" onClick={() => setOpen(false)}>Clients</a><a href="#about" onClick={() => setOpen(false)}>About</a><Link to="/client-guide">Client guide</Link><a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a></>}
        </nav>
    </header>;
}

const services = [
    { title: 'Digital experiences', text: 'Expressive interfaces, thoughtful user journeys, and responsive websites that feel as good as they look.', tools: 'Figma · React · TypeScript · GSAP' },
    { title: 'Products that work', text: 'The engineering behind the experience: APIs, databases, and complete web applications built to be useful.', tools: 'Laravel · PHP · Node.js · Cloudflare' },
    { title: 'Beyond the browser', text: 'Motion, illustration, immersive environments, and playful experiments that bring an idea to life.', tools: 'After Effects · Illustrator · Unity · Blender' },
];

function AboutSection() {
    const statement = 'Good design makes you feel something. Great development makes it work.';
    return <section className="folio-about folio-section" id="about">
        <div className="about-top"><p className="eyebrow">A designer’s eye. A developer’s mind.</p><p>Independent designer & developer<br />Working across the digital spectrum</p></div>
        <h2 className="folio-statement" aria-label={statement}>{statement.split(' ').map((word, i) => <span aria-hidden="true" key={i}>{word} </span>)}</h2>
        <div className="about-bottom"><div className="portrait-wrap"><img src={portrait} alt="Mohit Shah" width="400" height="400" loading="lazy" /><span>Hi, I’m Mohit.</span></div><div className="about-biography"><p>I connect the dots between design and code. From thoughtful interfaces to the systems behind them, I build digital experiences with equal parts curiosity and craft.</p><p>I’ve worked in web development since 2019 and independently since 2023. My studies in computing, interactive media, and VR production shape the way I approach every project.</p><External className="text-link" href="https://www.linkedin.com/in/mohitshah7/">More about my journey <ArrowUpRight size={18} /></External></div></div>
        <div className="folio-services" id="skills">{services.map((service, index) => <details key={service.title} open={index === 0}><summary><span>0{index + 1}</span><h3>{service.title}</h3><Plus className="service-plus" size={25} /></summary><div><p>{service.text}</p><span>{service.tools}</span></div></details>)}</div>
        <div className="experience-grid"><div><p className="eyebrow">Experience</p><p>Freelance <span>2023 — present</span></p><p>Guruinfosys <span>2021 — 2023</span></p><p>Green Computing <span>2019 — 2021</span></p></div><div><p className="eyebrow">Education</p><p>Interactive Media Management <span>Conestoga College</span></p><p>Virtual & Augmented Reality Production <span>Conestoga College</span></p><p>BSc (Hons) Computing <span>Leeds Beckett University</span></p></div></div>
    </section>;
}

export default function Portfolio() {
    const root = useRef(null);
    usePortfolioMotion(root);
    return <div className="portfolio" ref={root}>
        <a href="#work" className="folio-skip">Skip to work</a><div className="folio-progress" aria-hidden="true" /><Navigation />
        <main>
            <section className="folio-hero" id="home"><div className="hero-topline"><p>Independent designer & full stack developer</p><p className="availability"><span /> Open for collaborations</p></div>
                <div className="hero-composition"><h1><span>Thoughtfully</span><span>digital<em>.</em></span></h1><Sculpture /></div>
                <div className="hero-bottom"><a className="hero-scroll" href="#work" aria-label="Scroll to selected work"><ArrowDown size={24} /></a><p>I’m Mohit. I turn complex ideas into<br />distinctive digital experiences.</p><a className="hero-cta" href="#work">Discover my work <ArrowUpRight size={19} /></a></div>
                <div className="hero-baseline"><span>Design × Development × Motion</span><span>Made with intention</span></div>
            </section>
            <div className="folio-marquee" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>Creative thinking <b>✳</b> Precise execution <b>✳</b> </span>)}</div></div>
            <FreelanceClients /><FeaturedWork /><MotionFilm /><AboutSection />
            <section className="creative-strip folio-section"><p className="eyebrow">A little outside the lines</p><h2>Curiosity is<br />part of the <em>process.</em></h2><div className="creative-grid">{creativeProjects.map(project => <External href={project.links[0].url} key={project.title}><h3>{project.title}</h3><p>{project.description}</p><ArrowUpRight size={22} /></External>)}</div></section>
            <div className="folio-archive" id="archive"><Work /></div>
            <div className="folio-contact"><Contact /></div>
        </main>
        <footer className="folio-footer"><a href="#home">mohit shah.</a><p>© {new Date().getFullYear()} · Designed & built with care</p><div><External href="https://github.com/caspermohit">GitHub <ArrowUpRight size={14} /></External><External href="https://www.linkedin.com/in/mohitshah7/">LinkedIn <ArrowUpRight size={14} /></External><a href="#home">Back to top ↑</a></div></footer>
    </div>;
}
