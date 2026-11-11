import ScrollInk from './ScrollInk';
import Doodle from './Doodle';
import BendingArtwork from './BendingArtwork';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight as ArrowUpRight, FiArrowDown as ArrowDown, FiPlus as Plus, FiMinus as Minus } from 'react-icons/fi';
import Contact from './Contact';
import Work from './Work';
import FeaturedWork from './FeaturedWork';
import DesignShowcase from './DesignShowcase';
import MotionFilm from './MotionFilm';
import HairlineExperience from './HairlineExperience';
import FreelanceClients from './FreelanceClients';
import { creativeProjects } from '../data/projects';
import portrait from './assets/img/profile.png';
import { usePortfolioMotion } from '../hooks/usePortfolioMotion';
import './Portfolio.css';
import './PortfolioPolish.css';
import './PortfolioGallery.css';

const External = ({ href, children, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;


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
            {guide ? <><Link to="/">Portfolio</Link><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#process" onClick={() => setOpen(false)}>Process</a><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a><a className="nav-contact" href="#start" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={16} /></a></> : <><a href="#work" onClick={() => setOpen(false)}>Work</a><a href="#design" onClick={() => setOpen(false)}>Design</a><a href="#clients" onClick={() => setOpen(false)}>Clients</a><a href="#craft" onClick={() => setOpen(false)}>Approach</a><a href="#about" onClick={() => setOpen(false)}>About</a><Link to="/client-guide">Client guide</Link><a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a></>}
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
        <div className="about-top"><p className="eyebrow">A designer’s eye. A developer’s mind.</p><p>Independent designer & developer<br />Kitchener, Ontario, Canada</p></div>
        <h2 className="folio-statement" aria-label={statement}><ScrollInk>{statement.split(' ').map((word, i) => <span aria-hidden="true" key={i}>{word} </span>)}</ScrollInk></h2>
        <div className="about-bottom"><div className="portrait-wrap"><div className="hanging-id"><div className="id-lanyard" aria-hidden="true"><span>MOHIT SHAH / DESIGN &amp; CODE</span></div><div className="id-badge"><div className="id-clip" aria-hidden="true" /><div className="id-badge-top"><span className="id-monogram">ms.</span><span>DESIGN &amp; DEVELOPMENT<br />INDEPENDENT / KITCHENER</span></div><img src={portrait} alt="Mohit Shah" width="400" height="400" loading="lazy" /><div className="id-badge-name">Hi, I’m Mohit<span>Designer &amp; Developer</span></div><div className="id-badge-bottom"><span>mohitshah.com.np</span><span className="id-barcode" aria-hidden="true" /></div></div></div></div><div className="about-biography"><p>I’m an independent designer and full stack developer from Kitchener, Ontario, Canada. I connect the dots between design and code. From thoughtful interfaces to the systems behind them, I build digital experiences with equal parts curiosity and craft.</p><p>I’ve worked in web development since 2019 and independently since 2023. I studied Interactive Media Management and Virtual & Augmented Reality Production at Conestoga College. Together with my background in computing, those studies shape the way I approach every project.</p><External className="text-link" href="https://www.linkedin.com/in/mohitshah7/">More about my journey <ArrowUpRight size={18} /></External></div></div>
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
            <section className="folio-hero" id="home"><div className="hero-topline"><p>Independent designer & full stack developer<span className="hero-location">Based in Kitchener, Ontario</span></p><p className="availability"><span /> Open for collaborations</p></div>
                <div className="reference-hero-stage">
                    <p className="reference-kicker">Independent design &amp; development</p>
                    <h1 className="reference-hero-title"><span className="scroll-ink">MOHIT<span className="scroll-ink-fill" aria-hidden="true">MOHIT</span></span><span className="scroll-ink">SHAH<span className="scroll-ink-fill" aria-hidden="true">SHAH</span></span></h1>
                    <div className="reference-collage" aria-hidden="true"><div className="reference-print reference-print-back"><img src="/design/relyup/Flyer_Front.svg" alt="" width="500" height="700" /></div><div className="reference-print reference-print-main"><span>Selected work / Exhibera</span><img src="/design/exhibera/home.png" alt="" width="1440" height="1000" /></div><div className="reference-print reference-print-small"><img src="/projects/shade.jpg" alt="" width="1440" height="1000" /></div></div>
                    <span className="reference-note reference-note-left" aria-hidden="true">design meets code ↗</span><span className="reference-note reference-note-right" aria-hidden="true">from Kitchener,<br />with curiosity.</span>
                    <div className="reference-hero-byline"><p>Websites. Interfaces. Visual stories. <Doodle name="sprinting" className="hero-doodle" /></p><a href="#work">Explore my work <ArrowDown size={18} /></a></div>
                </div>
                <nav className="hero-work-grid" aria-label="Discover my work by discipline">
                    <a className="hero-work-tile hero-work-web" href="#featured-project-0"><div className="hero-work-image"><img src="/projects/shade.jpg" alt="Shade and Shine website with automotive brand design" width="1440" height="1000" fetchpriority="high" /></div><div className="hero-work-caption"><span><small>01 / Websites & products</small><strong>Shade &amp; Shine</strong><span className="hero-work-description">Brand presence · Web development</span></span><ArrowUpRight /></div></a>
                    <a className="hero-work-tile hero-work-ux" href="#design"><div className="hero-work-image"><img src="/design/exhibera/home.png" alt="Exhibera art opportunity platform interface" width="1440" height="1000" /></div><div className="hero-work-caption"><span><small>02 / UX & UI design</small><strong>Exhibera</strong><span className="hero-work-description">Product design · Responsive UX/UI</span></span><ArrowUpRight /></div></a>
                    <a className="hero-work-tile hero-work-brand" href="#brand-design"><div className="hero-work-image"><img src="/design/relyup/Backdrop_8x8.svg" alt="RelyUp exhibition backdrop artwork" width="1000" height="1000" /></div><div className="hero-work-caption"><span><small>03 / Brand & motion</small><strong>RelyUp</strong><span className="hero-work-description">Visual identity · Print &amp; motion</span></span><ArrowUpRight /></div></a>
                </nav>
                <div className="hero-baseline"><span>Design × Development × Motion</span><span>Available for selected projects</span></div>
            </section>
            <FreelanceClients />
            <section className="process-sketch folio-section" aria-labelledby="process-sketch-title">
                <p className="eyebrow">From the first thought to the final detail</p>
                <h2 id="process-sketch-title">A little curiosity. <Doodle name="coffee" label="creative process" className="process-doodle" /><br />A considered interface.<br />Code that brings it to life.</h2>
                <div className="process-sketch-bottom"><p>UX / UI, web development, and visual storytelling.<br />Different disciplines. One connected experience.</p><a className="text-link" href="#design">Explore the design work <ArrowUpRight size={18} /></a></div>
            </section>
            <FeaturedWork /><DesignShowcase /><HairlineExperience /><MotionFilm /><AboutSection />
            <section className="creative-strip folio-section"><p className="eyebrow">A little outside the lines</p><div className="creative-heading-row"><h2><ScrollInk>Curiosity is<br />part of the <em>process.</em></ScrollInk></h2><Doodle name="levitate" label="curiosity" className="curiosity-doodle" /></div><div className="creative-grid">{creativeProjects.filter(project => !project.designId).map(project => <External href={project.links[0].url} key={project.title}><h3>{project.title}</h3><p>{project.description}</p><ArrowUpRight size={22} /></External>)}</div></section>
            <div className="folio-archive" id="archive"><Work /></div>
            <div className="folio-contact"><Contact /></div>
        </main>
        <section className="reference-finale" aria-labelledby="finale-title"><p className="finale-invitation">Have something in mind? <Doodle name="sprinting" label="getting started" className="invitation-doodle" /></p><h2 id="finale-title"><span className="scroll-ink">LET’S MAKE<span className="scroll-ink-fill" aria-hidden="true">LET’S MAKE</span></span><em className="scroll-ink">IT WORK.<span className="scroll-ink-fill" aria-hidden="true">IT WORK.</span></em></h2><BendingArtwork className="finale-float finale-float-one" src="/design/relyup/Flyer_Front.svg" width={300} height={400} /><BendingArtwork className="finale-float finale-float-two" src="/design/exhibera/mobile.png" width={390} height={844} /><a className="finale-email" href="mailto:mohitshah.ms77@gmail.com">mohitshah.ms77@gmail.com <ArrowUpRight size={20} /></a></section>
        <footer className="folio-footer"><a href="#home">mohit shah.</a><p>© {new Date().getFullYear()} · Kitchener, Ontario</p><div><External href="https://github.com/caspermohit">GitHub <ArrowUpRight size={14} /></External><External href="https://www.linkedin.com/in/mohitshah7/">LinkedIn <ArrowUpRight size={14} /></External><a href="#home">Back to top ↑</a></div></footer>
    </div>;
}
