import React, { useEffect, useId, useRef, useState } from 'react';
import { FiArrowUpRight, FiFileText, FiX, FiMonitor, FiSmartphone } from 'react-icons/fi';
import HairlineFigure from './HairlineFigure';
import './ProjectFileWindow.css';

export const projectPreviews = { 'Shade & Shine': 'shade', 'Entertainment Review': 'entertainment' };
export const projectFilename = project => `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.project`;

export default function ProjectFileWindow({ project, onClose, opener }) {
    const dialog = useRef(null);
    const titleId = useId();
    const [device, setDevice] = useState('desktop');
    const image = projectPreviews[project.title];
    const customImage = !image && project.image;
    const links = project.links || [{ url: project.live, text: 'Live website' }, { url: project.github, text: 'Source code' }].filter(link => link.url);
    useEffect(() => {
        const element = dialog.current;
        const previousOverflow = document.body.style.overflow;
        const lenis = window.__lenis;
        const wasStopped = Boolean(lenis?.isStopped);
        lenis?.stop();
        document.body.style.overflow = 'hidden';
        element.showModal();
        return () => {
            element.close();
            document.body.style.overflow = previousOverflow;
            if (!wasStopped) lenis?.start();
            if (opener?.isConnected) opener.focus({ preventScroll: true });
        };
    }, [opener]);
    return <dialog className="project-file-window" ref={dialog} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} data-lenis-prevent>
        <div className="file-window-bar"><span><FiFileText aria-hidden="true" />{projectFilename(project)}</span><button type="button" onClick={onClose} aria-label={`Close ${project.title} project file`} autoFocus><FiX aria-hidden="true" size={20} /></button></div>
        <div className="file-window-content">
            <div className="file-window-preview">
                {image ? <><div className="file-device-options" role="group" aria-label={`${project.title} preview device`}><button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}><FiMonitor aria-hidden="true" />Desktop</button><button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}><FiSmartphone aria-hidden="true" />Mobile</button></div><div className={`file-device file-device-${device}`}><div className="file-preview-chrome" aria-hidden="true"><span /><span /><span /></div><img src={`/projects/${image}${device === 'mobile' ? '-mobile' : ''}.jpg`} alt={`${project.title} ${device} website preview`} width={device === 'mobile' ? 390 : 1440} height={device === 'mobile' ? 844 : 1000} /></div></> : customImage ? <img className="custom-project-preview" src={customImage} alt={`${project.title} preview`} /> : <HairlineFigure figure={project.group === 'Studio' ? 'riffle' : project.group === 'Repository' ? 'terminal' : 'exploded'} label={`Interactive line illustration for ${project.title}`} />}
            </div>
            <div className="file-window-detail"><p className="eyebrow">Project · {project.date.slice(0, 4)}</p>{project.status && <p className="project-availability">{project.status}</p>}<h3 id={titleId}>{project.title}</h3><p className="file-description">{project.description}</p><dl><div><dt>Discipline</dt><dd>{project.group === 'Studio' ? 'Creative study' : project.group === 'Repository' ? 'Code experiment' : 'Web & product'}</dd></div><div><dt>Built with</dt><dd>{project.technologies}</dd></div></dl><div className="file-destinations">{links.map(link => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.text}<FiArrowUpRight aria-hidden="true" /></a>)}</div><p className="file-window-note">Explore the live project or look behind the build.</p></div>
        </div>
        <div className="file-window-status"><span>mohit shah / work / {projectFilename(project)}</span><span>Esc to close</span></div>
    </dialog>;
}
