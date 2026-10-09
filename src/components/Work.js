import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FiArrowUpRight, FiPlus, FiSearch } from 'react-icons/fi';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shippedProjects, creativeProjects, githubOnly, GITHUB_PROFILE } from '../data/projects';
import './WorkIndex.css';

const disciplines = { Shipped: 'Web product', Studio: 'Creative study', Repository: 'Code experiment' };
const previews = { 'Shade & Shine': 'shade', 'E-commerce': 'ecommerce', 'Entertainment Review': 'entertainment' };
const catalog = [
    ...creativeProjects.map(project => ({ ...project, key: project.code, group: 'Studio' })),
    ...shippedProjects.map(project => ({ ...project, key: project.code, group: 'Shipped' })),
    ...githubOnly.map(project => ({ ...project, key: project.github, group: 'Repository', links: [{ url: project.github, text: 'GitHub' }] })),
].sort((a, b) => b.date.localeCompare(a.date));
const filters = [{ id: 'all', label: 'Everything' }, { id: 'Shipped', label: 'Web & products' }, { id: 'Studio', label: 'Creative studio' }, { id: 'Repository', label: 'Code experiments' }];

function ProjectPreview({ project }) {
    const image = previews[project.title];
    if (image) return <div className="index-preview"><img src={`/projects/${image}.jpg`} alt={`${project.title} website preview`} width="1440" height="1000" loading="lazy" /></div>;
    return <div className={`index-print print-${project.group.toLowerCase()}`} aria-hidden="true"><span>{project.group === 'Repository' ? '{ }' : project.group === 'Studio' ? 'Aa' : '</>'}</span><p>{project.title}</p><div className="print-lines"><i /><i /><i /></div></div>;
}

export default function Work() {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(null);
    const visible = useMemo(() => catalog.filter(project => (filter === 'all' || project.group === filter) && `${project.title} ${project.description} ${project.technologies}`.toLowerCase().includes(query.trim().toLowerCase())), [filter, query]);
    useLayoutEffect(() => {
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(frame);
    }, [expanded, filter, query]);

    return <section className="project-index-section" id="project-index" aria-labelledby="index-title">
        <div className="index-heading"><div><p className="eyebrow">The ongoing collection</p><h2 id="index-title">An archive of<br /><em>curiosity.</em></h2></div><p>Products, creative studies, and code.<br />Pick a title. See what’s inside.</p></div>
        <div className="index-controls"><div className="index-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); setExpanded(null); }}>{item.label}<span>{item.id === 'all' ? catalog.length : catalog.filter(project => project.group === item.id).length}</span></button>)}</div><label className="index-search"><FiSearch size={17} /><input type="search" aria-label="Search projects" placeholder="Find something…" value={query} onChange={event => { setQuery(event.target.value); setExpanded(null); }} /></label></div>
        <div className="index-column-labels" aria-hidden="true"><span>Project</span><span>Discipline</span><span>Year</span><span /></div>
        <p className="index-result-count" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
        <ul className="project-index-list">{visible.map((project, index) => {
            const open = expanded === project.key;
            const panelId = `project-panel-${catalog.indexOf(project)}`;
            return <li className={`index-entry ${open ? 'is-expanded' : ''}`} key={project.key}>
                <h3><button className="index-row" aria-expanded={open} aria-controls={panelId} onClick={() => setExpanded(open ? null : project.key)}><span className="index-project-name"><span className="index-number">{String(index + 1).padStart(2, '0')}</span>{project.title}</span><span className="index-discipline">{disciplines[project.group]}</span><span className="index-year">{project.date.slice(0, 4)}</span><FiPlus className="index-plus" size={22} /></button></h3>
                <div className="index-panel" id={panelId} hidden={!open}><ProjectPreview project={project} /><div className="index-detail"><p className="eyebrow">A closer look</p><p className="index-description">{project.description}</p><p className="index-technologies">{project.technologies}</p><ul className="index-links">{project.links.map(link => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}<FiArrowUpRight size={18} /></a></li>)}</ul></div></div>
            </li>;
        })}</ul>
        {!visible.length && <div className="index-empty"><p>No projects match “{query}”.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>Show all projects <FiArrowUpRight /></button></div>}
        <a className="index-github" href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">Keep exploring on GitHub <FiArrowUpRight size={19} /></a>
    </section>;
}
