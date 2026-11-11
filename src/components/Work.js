import ScrollInk from './ScrollInk';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GITHUB_PROFILE } from '../data/projects';
import useProjectCatalog from '../hooks/useProjectCatalog';
import WorkGallery from './WorkGallery';
import './WorkIndex.css';

const filters = [{ id: 'all', label: 'Everything' }, { id: 'Shipped', label: 'Web & products' }, { id: 'Studio', label: 'Creative studio' }, { id: 'Repository', label: 'Code experiments' }];

export default function Work() {
    const catalog = useProjectCatalog();
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const visible = useMemo(() => catalog.filter(project => (filter === 'all' || project.group === filter) && `${project.title} ${project.description} ${project.technologies}`.toLowerCase().includes(query.trim().toLowerCase())), [catalog, filter, query]);
    useLayoutEffect(() => {
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(frame);
    }, [catalog, filter, query]);

    return <section className="project-index-section" id="project-index" aria-labelledby="index-title">
        <div className="index-heading"><div><p className="eyebrow">The ongoing collection</p><h2 id="index-title"><ScrollInk>Ideas made<br /><em>real.</em></ScrollInk></h2></div><p>Websites, creative studies, and experiments.<br />A closer look at what I make.</p></div>
        <div className="index-controls"><div className="index-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => { setFilter(item.id);  }}>{item.label}<span>{item.id === 'all' ? catalog.length : catalog.filter(project => project.group === item.id).length}</span></button>)}</div><label className="index-search"><FiSearch size={17} /><input type="search" aria-label="Search projects" placeholder="Find something…" value={query} onChange={event => { setQuery(event.target.value);  }} /></label></div>
        <WorkGallery projects={visible} />
        {!visible.length && <div className="index-empty"><p>No projects match “{query}”.</p><button onClick={() => { setQuery(''); setFilter('all'); }}>Show all projects <FiArrowUpRight /></button></div>}
        <a className="index-github" href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">Keep exploring on GitHub <FiArrowUpRight size={19} /></a>
    </section>;
}
