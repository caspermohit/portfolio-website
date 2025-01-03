// src/components/Work.js
import React, { useEffect } from 'react';
import './Work.css'; // Ensure this CSS file contains styles for the work section
import './Styles/styles.scss';
import '../index.css';  // Corrected import path
import ScrollReveal from 'scrollreveal';
import Swal from 'sweetalert2'; // Import SweetAlert
// Importing icons from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faCode, faPen, faChartLine, faMobileAlt, faCogs } from '@fortawesome/free-solid-svg-icons';

const Work = () => {
    useEffect(() => {
        ScrollReveal().reveal('.work__container', {
            origin: 'bottom',
            distance: '50px',
            duration: 2000,
            delay: 200,
        });
    }, []);

    const handleProjectClick = (projectName) => {
        let text = `some of my  ${projectName}.`;
        let links = '';

        switch (projectName) {
            case 'Website Design & Development':
                links = `
                    <ul>
                        <li><a href="https://weather-news7-app.netlify.app/" target="_blank" rel="noopener noreferrer">Weather News App</a></li>
                        <li><a href="https://multi-converter-app.netlify.app/" target="_blank" rel="noopener noreferrer">multi-converter</a></li>
                         <li><a href="https://ai-voice-chat.netlify.app" target="_blank" rel="noopener noreferrer">Ai voice chat</a></li>
                    </ul>`;
                break;
            case 'UI/UX Design':
                links = `
                    <ul>
                        <li><a href="https://your-uiux-project-link.com" target="_blank" rel="noopener noreferrer">UI/UX Project 1</a></li>
                        <li><a href="https://your-uiux-project-link-2.com" target="_blank" rel="noopener noreferrer">UI/UX Project 2</a></li>
                    </ul>`;
                break;
            case 'Content Writing':
                links = `
                    <ul>
                        <li><a href="https://gogadgets77.wordpress.com/2024/04/19/the-best-fast-chargers-of-2024-a-comprehensive-review/" target="_blank" rel="noopener noreferrer">best fast charger 2024</a></li>
                        <li><a href="https://gogadgets77.wordpress.com/2024/05/11/14-essential-smartphone-accessories-to-elevate-your-tech-game-in-2024/" target="_blank" rel="noopener noreferrer">Essential accessories</a></li>
                         <li><a href="https://gogadgets77.wordpress.com/2024/05/11/14-essential-smartphone-accessories-to-elevate-your-tech-game-in-2024/" target="_blank" rel="noopener noreferrer">best back-to-school accessories</a></li>
                    </ul>`;
                break;
            case 'Level Design':
                links = `
                    <ul>
                        <li><a href="https://www.behance.net/gallery/215923707/Enviroment-design" target="_blank" rel="noopener noreferrer">Enviroment design</a></li>
                        <li><a href="https://www.behance.net/gallery/215922739/client-branding-poster" target="_blank" rel="noopener noreferrer">Client branding poster</a></li>
                        <li><a href="https://www.behance.net/gallery/204814325/360-fliming" target="_blank" rel="noopener noreferrer">360 Flim making</a></li>
                        <li><a href="https://www.behance.net/gallery/202959411/Arbys-promotion" target="_blank" rel="noopener noreferrer">Arby's promotion</a></li>
                        <li><a href="https://www.behance.net/gallery/215939795/Royal-bank-logo-redesign" target="_blank" rel="noopener noreferrer">logo redesign</a></li>
                    </ul>`;
                break;
            case 'Mobile App Development':
                links = `
                    <ul>
                        <li><a href="https://your-mobile-app-project-link.com" target="_blank" rel="noopener noreferrer">Mobile App Project 1</a></li>
                        <li><a href="https://your-mobile-app-project-link-2.com" target="_blank" rel="noopener noreferrer">Mobile App Project 2</a></li>
                    </ul>`;
                break;
            case 'Game and Animation':
                links = `
                    <ul>
                        <li><a href="https://your-technical-support-project-link.com" target="_blank" rel="noopener noreferrer">Support Project 1</a></li>
                        <li><a href="https://your-technical-support-project-link-2.com" target="_blank" rel="noopener noreferrer">Support Project 2</a></li>
                    </ul>`;
                break;
            default:
                break;
        }

        Swal.fire({
            title: projectName,
            html: `${text} ${links}`, // Use 'html' to allow HTML content
            icon: 'info',
            confirmButtonText: 'Close',
        });
    };

    return (
        <section className="work section" id="work">
            <h2 className="section-title">My works</h2>
            <div className="work__container">
                <div className="work__item" onClick={() => handleProjectClick('UI/UX Design')}>
                    <FontAwesomeIcon icon={faDesktop} size="3x" />
                    <h3>UI/UX Design</h3>
                    <p>SEO improves website visibility, rankings, and organic traffic online.</p>
                </div>
                <div className="work__item" onClick={() => handleProjectClick('Website Design & Development')}>
                    <FontAwesomeIcon icon={faCode} size="3x" />
                    <h3>Website Design & Development</h3>
                    <p>Create functional, engaging, and user-friendly websites.</p>
                </div>
                <div className="work__item" onClick={() => handleProjectClick('Content Writing')}>
                    <FontAwesomeIcon icon={faPen} size="3x" />
                    <h3>Content Writing</h3>
                    <p>Delivers engaging, informative, and valuable content for audiences.</p>
                </div>
                <div className="work__item" onClick={() => handleProjectClick('Level Design')}>
                    <FontAwesomeIcon icon={faChartLine} size="3x" />
                    <h3>Level Design</h3>
                    <p>Enhance your website's visibility and ranking on search engines.</p>
                </div>
                <div className="work__item" onClick={() => handleProjectClick('Mobile App Development')}>
                    <FontAwesomeIcon icon={faMobileAlt} size="3x" />
                    <h3>Mobile App Development</h3>
                    <p>Build responsive and user-friendly mobile applications.</p>
                </div>
                <div className="work__item" onClick={() => handleProjectClick('Technical Support')}>
                    <FontAwesomeIcon icon={faCogs} size="3x" />
                    <h3>Technical Support</h3>
                    <p>Provide ongoing support and maintenance for your projects.</p>
                </div>
            </div>
        </section>
    );
};

export default Work;
