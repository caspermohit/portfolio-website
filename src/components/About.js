// src/components/About.js
import React, { useEffect, useRef } from 'react';
import './About.css'; // Ensure this CSS file contains styles for the about section
import './Styles/styles.scss';
import '../index.css'; // Correct import path
import ScrollReveal from 'scrollreveal';
import aboutImg from './assets/img/image2.JPEG'; // Make sure this path is correct


const About = () => {
    const imageRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current || !sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            
            // Calculate slide-in effect
            const slideRange = 200; // Total slide range in pixels
            const translateY = Math.max(-slideRange, Math.min(0, -slideRange + (scrollProgress * slideRange * 2)));
            
            // Calculate scale to fit
            const startScale = 1.2;
            const endScale = 1;
            const scale = startScale - (scrollProgress * (startScale - endScale));
            
            // Apply transforms
            imageRef.current.style.transform = `
                translate3d(0, ${translateY}px, 0)
                scale(${scale})
            `;
            
            // Adjust opacity for fade-in
            imageRef.current.style.opacity = Math.min(1, scrollProgress * 2);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        ScrollReveal().reveal('.about__content', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        const section = document.querySelector('.about');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <section className="about section" id="about" ref={sectionRef}>
            <div className="container">
                <div className="about__grid">
                    <div className="about__content">
                        <h2 className="section__title">About Me</h2>
                        <p className="about__text">
                            I'm a multidisciplinary designer and developer with a passion for creating 
                            engaging digital experiences. With expertise in UX/UI design, web development, 
                            and content creation, I bring a holistic approach to every project.
                        </p>
                        <p className="about__text">
                            My journey in digital design has led me to work on diverse projects, 
                            from intuitive user interfaces to immersive game environments. I believe 
                            in the power of thoughtful design to solve problems and create meaningful 
                            connections.
                        </p>
                        <div className="about__stats">
                            <div className="about__stat">
                                <span className="about__stat-number">5+</span>
                                <span className="about__stat-text">Years Experience</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number">50+</span>
                                <span className="about__stat-text">Projects Completed</span>
                            </div>
                            <div className="about__stat">
                                <span className="about__stat-number">20+</span>
                                <span className="about__stat-text">Happy Clients</span>
                            </div>
                        </div>
                    </div>
                    <div className="about__image">
                        <div className="phone-container">
                            <div className="profile-image-container" ref={imageRef}>
                                <img src={aboutImg} alt="About" className="profile-image" />
                            </div>
                            <div className="phone-frame"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
