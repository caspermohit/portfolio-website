// src/components/Home.js
import React, { useEffect } from 'react';
import './Home.css'; // Ensure this CSS file contains styles for the home section
import './Styles/styles.scss';
import '../index.css'; // Corrected import path
import ScrollReveal from 'scrollreveal';

const Home = () => {
    // Initialize ScrollReveal
    useEffect(() => {
        ScrollReveal().reveal('.hero__content', {
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 400
        });
    }, []);

    return (
        <section className="hero" id="home">
            <div className="container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        Hi, I'm <span className="hero__name">Mohit Shah</span>
                    </h1>
                    <h2 className="hero__subtitle">
                        Digital Designer & Developer
                    </h2>
                    <p className="hero__description">
                        Crafting innovative digital experiences through design and development. 
                        Specializing in UI/UX design, web development, and creative solutions.
                    </p>
                    <div className="hero__cta">
                        <a href="#work" className="hero__button">View My Work</a>
                        <a href="#contact" className="hero__button hero__button--outline">Contact Me</a>
                    </div>
                </div>
            </div>
            <div className="hero__background">
                <div className="hero__gradient"></div>
            </div>
        </section>
    );
};

export default Home;
