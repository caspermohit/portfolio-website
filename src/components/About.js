import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import aboutImg from './assets/img/profile.png';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const About = () => {
    const imageRef = useRef(null);
    const sectionRef = useRef(null);
    const [githubStats, setGithubStats] = useState({
        repositories: '--',
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const response = await fetch('https://api.github.com/users/caspermohit');
                if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
                const data = await response.json();
                setGithubStats({ repositories: data.public_repos, loading: false, error: null });
            } catch (error) {
                setGithubStats({ repositories: 32, loading: false, error: error.message });
            }
        };
        fetchGithubData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current || !sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const slideRange = 120;
            const translateY = Math.max(-slideRange, Math.min(0, -slideRange + scrollProgress * slideRange * 2));
            const scale = 1.12 - scrollProgress * 0.12;
            imageRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${Math.max(1, scale)})`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="about section" id="about" ref={sectionRef}>
            <div className="container about__layout">
                <div className="about__copy" data-reveal>
                    <span className="section__label">About</span>
                    <h2 className="section__title">About Me</h2>
                    <p className="about__text">
                        Results-driven Full Stack Developer with over 6+ years of experience designing, developing, and
                        optimizing high-performance web applications. Proficient in modern front-end and back-end
                        frameworks, database management, and cloud computing.
                    </p>
                    <p className="about__text">
                        Adept at building scalable systems, enhancing UI/UX, and improving system efficiency to drive
                        business growth. Passionate about accessibility, automation, and optimizing web technologies to
                        improve user experience. Strong problem-solving skills with a keen ability to collaborate across
                        multidisciplinary teams.
                    </p>

                    <div className="about__meta">
                        <div className="about__meta-block">
                            <span className="about__meta-label">Experience</span>
                            <ul className="about__list">
                                <li>
                                    <strong>Full Stack Developer</strong> — Freelance · Sep 2023–Present
                                </li>
                                <li>
                                    <strong>Web Developer</strong> — Guruinfosys · Sep 2021–Aug 2023
                                </li>
                                <li>
                                    <strong>Full Stack Web Developer</strong> — Green Computing · Sep 2019–Aug 2021
                                </li>
                            </ul>
                        </div>
                        <div className="about__meta-block">
                            <span className="about__meta-label">Education</span>
                            <ul className="about__list">
                                <li>Interactive Media Management — Conestoga College</li>
                                <li>Virtual &amp; Augmented Reality Production — Conestoga College</li>
                                <li>BSc (Hons) Computing — Leeds Beckett University</li>
                            </ul>
                        </div>
                        <div className="about__meta-block">
                            <span className="about__meta-label">Certifications</span>
                            <ul className="about__list">
                                <li>W3C Accessibility Certificate</li>
                                <li>AODA Certificate</li>
                                <li>TCPS2 Core Certificate</li>
                            </ul>
                        </div>
                    </div>

                    <div className="about__github">
                        <a
                            href="https://github.com/caspermohit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about__github-link"
                            data-cursor-text="GitHub"
                        >
                            <FaGithub /> caspermohit <FiExternalLink />
                        </a>
                        <span className="about__github-stat">
                            {githubStats.loading ? '…' : githubStats.repositories} public repos · 6+ yrs
                        </span>
                    </div>
                </div>

                <div className="about__visual" data-reveal>
                    <div className="about__frame">
                        <img ref={imageRef} src={aboutImg} alt="Mohit Shah" className="about__photo" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
