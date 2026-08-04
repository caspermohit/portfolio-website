import React, { useEffect, useRef, useState } from 'react';
import {
    shippedProjects,
    creativeProjects,
    githubOnly,
    GITHUB_PROFILE,
} from '../data/projects';
import './Work.css';

const Note = ({ project, index }) => (
    <article
        className={`work__note work__note--${project.paper}`}
        style={{
            '--r': `${project.rotate}deg`,
            '--i': index,
        }}
    >
        <span className="work__tape" aria-hidden="true" />
        <span className="work__pin" aria-hidden="true" />
        <span className="work__note-code">
            #{project.code}
            {(project.dateLabel || project.date) && (
                <span className="work__note-date">
                    {' '}
                    ·{' '}
                    {project.dateLabel ||
                        new Date(`${project.date}T12:00:00`).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                        })}
                </span>
            )}
        </span>
        <h3 className="work__note-title">{project.title}</h3>
        <p className="work__note-desc">{project.description}</p>
        <p className="work__note-tech">{project.technologies}</p>
        <ul className="work__note-links">
            {project.links.map((link) => (
                <li key={link.url + link.text}>
                    <a
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        data-cursor-text="Open"
                    >
                        {link.text}
                    </a>
                </li>
            ))}
        </ul>
    </article>
);

const Work = () => {
    const deskRef = useRef(null);
    const [repoCount, setRepoCount] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch('https://api.github.com/users/caspermohit')
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (!cancelled && data?.public_repos != null) {
                    setRepoCount(data.public_repos);
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const desk = deskRef.current;
        if (!desk) return undefined;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            desk.querySelectorAll('.work__note').forEach((n) => n.classList.add('is-in'));
            return undefined;
        }

        const notes = desk.querySelectorAll('.work__note');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        notes.forEach((n) => observer.observe(n));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="work section" id="work">
            <div className="work__desk" ref={deskRef}>
                <div className="container work__intro" data-reveal>
                    <span className="section__label">Pinned ideas → projects</span>
                    <h2 className="work__hand-title">Work</h2>
                    <p className="work__hand-sub">
                        Newest first — imported from GitHub &amp; Netlify with live demos and source.
                    </p>
                    <svg className="work__doodle" viewBox="0 0 220 24" aria-hidden="true">
                        <path
                            d="M2 14 C40 4, 80 22, 110 10 S180 4, 218 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    <p className="work__repo-meta">
                        {repoCount != null ? `${repoCount} public repos` : 'Public repos'} on{' '}
                        <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" data-cursor-text="GitHub">
                            github.com/caspermohit
                        </a>
                    </p>
                </div>

                <div className="container work__chapter" data-reveal>
                    <h3 className="work__chapter-title">Shipped on the web</h3>
                    <p className="work__chapter-sub">Sorted by last update · open the live build or the repo</p>
                </div>

                <div className="work__board" data-reveal>
                    {shippedProjects.map((project, index) => (
                        <Note project={project} index={index} key={project.code} />
                    ))}
                </div>

                <div className="container work__chapter" data-reveal>
                    <h3 className="work__chapter-title">Studio &amp; craft</h3>
                    <p className="work__chapter-sub">UX, writing, games, and motion outside the deploy list</p>
                </div>

                <div className="work__board work__board--studio" data-reveal>
                    {creativeProjects.map((project, index) => (
                        <Note project={project} index={index} key={project.code} />
                    ))}
                </div>

                <div className="container work__more" data-reveal>
                    <h3 className="work__chapter-title">More on GitHub</h3>
                    <ul className="work__gh-list">
                        {githubOnly.map((item) => (
                            <li key={item.github}>
                                <a href={item.github} target="_blank" rel="noopener noreferrer" data-cursor-text="Repo">
                                    {item.title}
                                </a>
                                <span>{item.description}</span>
                                <em>
                                    {item.technologies}
                                    {item.date
                                        ? ` · ${new Date(`${item.date}T12:00:00`).toLocaleDateString('en-US', {
                                              month: 'short',
                                              year: 'numeric',
                                          })}`
                                        : ''}
                                </em>
                            </li>
                        ))}
                    </ul>
                    <a
                        className="work__gh-all"
                        href={GITHUB_PROFILE}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-text="All repos"
                    >
                        See all repositories →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Work;
