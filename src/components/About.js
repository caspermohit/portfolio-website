// src/components/About.js
import React, { useEffect, useRef, useState } from 'react';
import './About.css'; // Ensure this CSS file contains styles for the about section
import './Styles/styles.scss';
import '../index.css'; // Correct import path
import ScrollReveal from 'scrollreveal';
import aboutImg from './assets/img/image2.JPEG'; // Make sure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGraduationCap, 
    faBriefcase, 
    faUser, 
    faCertificate 
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
    const imageRef = useRef(null);
    const sectionRef = useRef(null);
    const [activeTab, setActiveTab] = useState('about');

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

    const renderTabContent = () => {
        switch(activeTab) {
            case 'about':
                return (
                    <>
                        <h2 className="section__title">About Me</h2>
                        <p className="about__text">
                        Results-driven Web Developer with over 4+ years of experience in designing, developing, and optimizing high-performance web applications. Proficient in modern front-end and back-end frameworks, database management, and cloud computing. 
                        </p>
                        <p className="about__text">
                        Adept at building scalable systems, enhancing UI/UX, and improving system efficiency to drive business growth. Passionate about accessibility, automation, and optimizing web technologies to improve user experience. 
                        Strong problem-solving skills with a keen ability to collaborate across multidisciplinary teams.
                        </p>
                        <div className="about__stats">
                            <div className="about__stat">
                                <span className="about__stat-number">4+</span>
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
                    </>
                );
            case 'experience':
                return (
                    <>
                        <h2 className="section__title">Professional Experience</h2>
                        <div className="resume__item">
                            <div className="resume__title">
                                <h3>Front-End Web Developer</h3>
                                <p className="resume__place">Indigo Strategies - Sep 2021 to Aug 2023</p>
                            </div>
                            <ul className="resume__list">
                                <li>Developed responsive enterprise-level solutions from scratch and added a highly customizable project management module, increasing sales by 43%.</li>
                                <li>Designed and built scalable REST APIs for CRM, serving 23,000 requests per hour.</li>
                                <li>Built interactive modules, including Dashboards, Charts, and MUI, significantly improving customer experience.</li>
                                <li>Collaborated with medical experts to develop educational applications, reducing information retrieval time and enhancing patient empowerment.</li>
                            </ul>
                        </div>
                        <div className="resume__item">
                            <div className="resume__title">
                                <h3>E-commerce Web Developer</h3>
                                <p className="resume__place">Pixel Digital Agency - Sep 2019 to Aug 2021</p>
                            </div>
                            <ul className="resume__list">
                                <li>Built an ERP system from scratch, acquiring 1.1 million users.</li>
                                <li>Led design and development of enterprise and e-commerce applications, generating $1.3 million in annual revenue.</li>
                                <li>Developed an e-commerce platform using the MERN stack, resulting in a $1.4 million in sales and 30% increase in customer retention.</li>
                                <li>Created a headless CMS platform approach, improving user experience and increasing engagement by 40%.</li>
                            </ul>
                        </div>
                    </>
                );
            case 'education':
                return (
                    <>
                        <h2 className="section__title">Education</h2>
                        <div className="resume__item">
                            <div className="resume__title">
                                <h3>Postgraduate Degree, Interactive Media Management - Interaction Design</h3>
                                <p className="resume__place">Conestoga College - Sep 2024 to Mar 2025</p>
                            </div>
                            <ul className="resume__list">
                                <li>Designed user-centered, visually appealing interfaces.</li>
                                <li>Created prototypes and wireframes for validation.</li>
                            </ul>
                        </div>
                        <div className="resume__item">
                            <div className="resume__title">
                                <h3>Advanced Diploma, Virtual and Augmented Reality Production</h3>
                                <p className="resume__place">Conestoga College - Sep 2023 to Apr 2024</p>
                            </div>
                            <ul className="resume__list">
                                <li>Developed immersive 3D applications using Unity, Unreal Engine, and Blender.</li>
                                <li>Created realistic environments for enhanced user engagement.</li>
                            </ul>
                        </div>
                        <div className="resume__item">
                            <div className="resume__title">
                                <h3>Bachelor of Science (Hons) in Computing</h3>
                                <p className="resume__place">Leeds Beckett University - Sep 2017 to Nov 2021</p>
                            </div>
                            <ul className="resume__list">
                                <li>Designed information systems using industry-standard accessibility best practices.</li>
                                <li>Developed problem-solving and analytical skills through real-world projects.</li>
                            </ul>
                        </div>
                    </>
                );
            case 'certifications':
                return (
                    <>
                        <h2 className="section__title">Certifications</h2>
                        <div className="certifications__grid">
                            <div className="certification__item">
                                <h3 className="certification__title">W3C Accessibility Certificate</h3>
                                <p className="certification__date">Feb 2023</p>
                            </div>
                            <div className="certification__item">
                                <h3 className="certification__title">AODA (Accessibility for Ontarians with Disabilities Act) Certificate</h3>
                                <p className="certification__date">Apr 2023</p>
                            </div>
                            <div className="certification__item">
                                <h3 className="certification__title">TCPS2 Core Certificate </h3>
                                <p className="certification__date">Sep 2023</p>
                            </div>
                        </div>
                    </>
                );
            default:
                return <p>Select a tab to view content</p>;
        }
    };

    return (
        <section className="about section" id="about" ref={sectionRef}>
            <div className="container">
                <div className="about__tabs">
                    <button 
                        className={`about__tab ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        <FontAwesomeIcon icon={faUser} className="about__tab-icon" />
                        <span className="about__tab-text">About</span>
                    </button>
                    <button 
                        className={`about__tab ${activeTab === 'experience' ? 'active' : ''}`}
                        onClick={() => setActiveTab('experience')}
                    >
                        <FontAwesomeIcon icon={faBriefcase} className="about__tab-icon" />
                        <span className="about__tab-text">Experience</span>
                    </button>
                    <button 
                        className={`about__tab ${activeTab === 'education' ? 'active' : ''}`}
                        onClick={() => setActiveTab('education')}
                    >
                        <FontAwesomeIcon icon={faGraduationCap} className="about__tab-icon" />
                        <span className="about__tab-text">Education</span>
                    </button>
                    <button 
                        className={`about__tab ${activeTab === 'certifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('certifications')}
                    >
                        <FontAwesomeIcon icon={faCertificate} className="about__tab-icon" />
                        <span className="about__tab-text">Certifications</span>
                    </button>
                </div>
                
                <div className="about__grid">
                    <div className="about__content">
                        {renderTabContent()}
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
