import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowUpRight, FiArrowDown, FiCode, FiLayers } from 'react-icons/fi';
import ProjectFileWindow from './ProjectFileWindow';
import { DesignStudy } from './DesignShowcase';
import { designWork } from '../data/designWork';
import './WorkGallery.css';

const discipline = project => project.group === 'Studio' ? 'Creative studio' : project.group === 'Shipped' ? 'Web & product' : 'Code experiment';

export default function WorkGallery({ projects }) {
    const ordered = useMemo(() => [...projects.filter(project => project.image), ...projects.filter(project => !project.image)], [projects]);
    const [activeId, setActiveId] = useState(null);
    const [selected, setSelected] = useState(null);
    const [limit, setLimit] = useState(8);
    const opener = useRef(null);
    const active = ordered.find(project => project.id === activeId) || ordered[0];
    useEffect(() => setLimit(8), [projects]);
    const open = (event, project = active) => { opener.current = event.currentTarget; setSelected(project); };
    return <>
        <div className="spotlight-summary"><p role="status">{projects.length} {projects.length === 1 ? 'project' : 'projects'} in the collection</p><span>Select a project. Get a closer look.</span></div>
        {active && <div className="project-spotlight">
            <article className="spotlight-stage" aria-label="Project spotlight">
                <button type="button" className={`spotlight-art ${active.image ? 'with-capture' : 'without-capture'}`} key={active.id} onClick={event => open(event)} aria-label={`Open preview for ${active.title}`} aria-haspopup="dialog">
                    <div className="spotlight-art-label"><span>{discipline(active)}</span><span>{active.date.slice(0, 4)}</span></div>
                    {active.image ? <div className="spotlight-browser"><div aria-hidden="true"><i /><i /><i /><span>{active.live ? new URL(active.live).hostname : active.title}</span></div><img src={active.image} alt={`${active.title} website preview`} width="1440" height="1000" /></div> : <div className="spotlight-symbol" aria-hidden="true">{active.group === 'Studio' ? <FiLayers /> : <FiCode />}<span>{active.title}</span></div>}
                    <span className="spotlight-art-foot">{active.image ? 'A glimpse of the experience' : 'Inside the project'}<span>↗</span></span>
                </button>
                <div className="spotlight-detail"><p className="eyebrow">In the spotlight</p><h3>{active.title}</h3><p className="spotlight-description">{active.description}</p><p className="spotlight-tools">{active.technologies}</p>{active.status && <p className="project-availability">{active.status}</p>}<button className="spotlight-explore" onClick={event => open(event)} aria-haspopup="dialog" aria-label={`Explore ${active.title}`}>Explore project <FiArrowUpRight /></button></div>
            </article>
            <div className="spotlight-directory" data-lenis-prevent><div className="spotlight-list-heading"><span>The project index</span><span>01 — {String(ordered.length).padStart(2, '0')}</span></div><div className="spotlight-list" role="group" aria-label="Choose a project">{ordered.slice(0, limit).map((project, index) => <button className="spotlight-choice" key={project.id} aria-pressed={active.id === project.id} onPointerEnter={event => { if (event.pointerType === 'mouse') setActiveId(project.id); }} onFocus={() => setActiveId(project.id)} onClick={event => { setActiveId(project.id); open(event, project); }} aria-haspopup="dialog" aria-label={`Open ${project.title} project`}><span className="spotlight-number">{String(index + 1).padStart(2, '0')}</span><span className="spotlight-choice-copy"><strong>{project.title}</strong><span>{discipline(project)}<span> / {project.date.slice(0, 4)}</span></span></span><FiArrowUpRight aria-hidden="true" /></button>)}</div>{ordered.length > limit && <button className="spotlight-more" onClick={() => setLimit(limit + 12)}>More projects <span>{ordered.length - limit} more</span><FiArrowDown /></button>}<p className="spotlight-tip">Hover or focus to preview. Select a project to open its details.</p></div>
        </div>}
        {selected && (selected.designId ? <DesignStudy key={selected.id} project={designWork.find(project => project.id === selected.designId)} opener={opener.current} onClose={() => setSelected(null)} /> : <ProjectFileWindow key={selected.id} project={selected} opener={opener.current} onClose={() => setSelected(null)} />)}
    </>;
}
