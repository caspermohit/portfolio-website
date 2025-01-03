// src/components/About.js
import React, { useEffect } from 'react';
import './About.css'; // Ensure this CSS file contains styles for the about section
import './Styles/styles.scss';
import '../index.css'; // Correct import path
import ScrollReveal from 'scrollreveal';
import profile from './assets/img/image2.JPG';

const About = () => {
    useEffect(() => {
        ScrollReveal().reveal('.about__container', {
            origin: 'left',
            distance: '50px',
            duration: 2000,
            delay: 200,
        });
    }, []);

    return (
        <section className="about section" id="about">
            <h2 className="section-title">About Me</h2>
            <div className="about__container bd-grid">
                <div className="about__img">
                    <img src={profile} alt="About" />
                </div>
                <div>
                    <h2 className="about__subtitle">I'am Mohit</h2>
                    <p className="about__text">
                         Passionate and ambitious, solid foundation in graphic design, web development, and virtual reality.
                          Gained experience in creating visually appealing designs, developing user-friendly websites,
                         and exploring the potential of immersive VR experiences through academic projects and personal work.
                         Proficient in using various design software, coding languages,
                         and VR tools, with knowledge in JavaScript, React, Laravel, PHP, HTML5, CSS, and API integration. 
                         Focused on front-end development and website design,
                         aiming to build responsive and engaging user interfaces that enhance the user experience (UX).
                         Eager to collaborate with teams and clients to contribute fresh perspectives and creative ideas. 
                         Committed to learning and growing in the fast-evolving fields of digital and virtual technology.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
