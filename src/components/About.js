import React from 'react';
import './About.css';
import aboutImg from './assets/img/profile.png';

const About = () => (
    <section className="about section" id="about">
        <div className="container about__layout">
            <div className="about__copy" data-reveal>
                <span className="section__label">About</span>
                <h2 className="section__title">About Me</h2>
                <p className="about__text">
                    I design the interface and build the product behind it. Freelance since 2023, six years shipping
                    the web.
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
                </div>

                <a
                    className="about__github-link"
                    href="https://github.com/caspermohit"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    github.com/caspermohit
                </a>
                <a
                    className="about__github-link"
                    href="https://www.conestogagigs.ca/mohit-shah/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Conestoga Gigs profile
                </a>
            </div>

            <div className="about__visual" data-reveal>
                <div className="about__frame">
                    <img src={aboutImg} alt="Mohit Shah" className="about__photo" />
                </div>
            </div>
        </div>
    </section>
);

export default About;
