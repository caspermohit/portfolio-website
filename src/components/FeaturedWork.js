import React from 'react';
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi';
import { shippedProjects } from '../data/projects';
import './FeaturedWork.css';

const highlights = [
    { title: 'Shade & Shine', image: 'shade', category: 'Brand presence', headline: 'A sharper\nfirst impression.', note: 'A booking-ready presence for a detailing and tinting business.', rotation: -5 },
    { title: 'E-commerce', image: 'ecommerce', category: 'Full stack product', headline: 'From browsing\nto buying.', note: 'A storefront frontend connected to a Laravel API.', rotation: 4 },
    { title: 'Entertainment Review', image: 'entertainment', category: 'Discovery experience', headline: 'Find your\nnext favourite.', note: 'An interface for exploring movies, television, and anime.', rotation: -3 },
].map(highlight => ({ ...shippedProjects.find(project => project.title === highlight.title), ...highlight }));

export default function FeaturedWork() {
    return <section className="work-exhibition folio-section" id="work" aria-labelledby="exhibition-title">
        <header className="exhibition-intro"><div><p className="eyebrow">Selected projects · Design & development</p><h2 id="exhibition-title">Work, in <em>motion.</em></h2></div><p>Different ideas.<br />The same attention to detail.</p></header>
        <div className="exhibition-rule"><span>Three projects worth a closer look</span><a href="#archive">Browse the full index <FiArrowDown /></a></div>
        <nav className="exhibition-project-nav" aria-label="Jump to featured project">{highlights.map((project, index) => <a href={`#featured-project-${index}`} key={project.title}><span>0{index + 1}</span>{project.title}<FiArrowDown size={15} /></a>)}</nav>
        <div className="spread-stack">{highlights.map((project, index) => <article className="work-spread" id={`featured-project-${index}`} key={project.title} style={{ '--order': index, '--rotation': `${project.rotation}deg` }} aria-labelledby={`spread-title-${index}`}>
            <div className="spread-card">
                <div className="spread-top"><p className="eyebrow">{project.category}</p><span>{project.date.slice(0, 4)} <span className="spread-edition">/ 0{index + 1}</span></span></div>
                <div className="spread-content">
                    <div className="spread-copy"><h3 id={`spread-title-${index}`}>{project.title}</h3><p className="spread-headline">{project.headline}</p><p className="spread-note">{project.note}</p><a href={project.live} target="_blank" rel="noopener noreferrer" className="spread-visit">Explore project <FiArrowUpRight size={20} /></a></div>
                    <a className="spread-art" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live website`}>
                        <span className="spread-preview-label" aria-hidden="true">Desktop + mobile</span>
                        <div className="spread-screen"><div className="screen-surface"><div className="spread-browser"><span /><span /><span /><p>{new URL(project.live).hostname}</p></div><img src={`/projects/${project.image}.jpg`} alt={`${project.title} desktop website`} width="1440" height="1000" loading="lazy" /></div></div>
                        <div className="spread-phone"><div className="phone-speaker" /><img src={`/projects/${project.image}-mobile.jpg`} alt={`${project.title} mobile website`} width="390" height="844" loading="lazy" /></div>
                        <span className="spread-view">View live <FiArrowUpRight size={18} /></span>
                    </a>
                </div>
                <div className="spread-bottom"><p>{project.technologies}</p><a href={project.github} target="_blank" rel="noopener noreferrer">Behind the build <FiArrowUpRight size={15} /></a></div>
            </div>
        </article>)}</div>
        <div className="exhibition-outro"><p>More experiments.<br />More possibilities.</p><a href="#archive">Step into the archive <FiArrowDown size={24} /></a></div>
    </section>;
}
