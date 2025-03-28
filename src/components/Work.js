// src/components/Work.js
import React, { useEffect } from 'react';
import './Work.css'; // Ensure this CSS file contains styles for the work section
import './Styles/styles.scss';
import '../index.css';  // Corrected import path
import ScrollReveal from 'scrollreveal';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
// Importing icons from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faCode, faPen, faGamepad, faMobileAlt,faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Work = () => {
    useEffect(() => {
        ScrollReveal().reveal('.work__grid', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200
        });
    }, []);

    const projects = [
        {
            title: 'UX/UI Design',
            description: 'Great UX/UI enhances user experience, making websites intuitive and engaging.',
            icon: faDesktop,
            technologies: 'Figma, Adobe XD, Sketch',
            links: [
                { url: 'https://sharecare-case-study.netlify.app/', text: 'UI/UX Project "Sharecare"' },
                { url: 'https://www.behance.net/gallery/216560557/glu-care', text: 'UI/UX Project "glu care"' }
            ]
        },
        {
            title: 'Website Development',
            description: 'Create functional, engaging, and user-friendly websites.',
            icon: faCode,
            technologies: 'HTML, CSS, JavaScript, React',
            links: [
                { url: 'https://weather-news7-app.netlify.app/', text: 'Weather News App' },
                { url: 'https://multi-converter-app.netlify.app/', text: 'Multi-converter' },
                { url: 'https://ai-voice-chat.netlify.app', text: 'AI Voice Chat' },
                { url: 'https://entertainment-review.netlify.app/', text: 'Entertainment Review' },
                { url: 'https://mchessgame.netlify.app/', text: 'Chess Game' }
            ]
        },
        {
            title: 'Content Writing',
            description: 'Delivers engaging, informative, and valuable content for audiences.',
            icon: faPen,
            technologies: 'SEO, Copywriting, Blogging',
            links: [
                { url: 'https://gogadgets77.wordpress.com/2024/04/19/the-best-fast-chargers-of-2024-a-comprehensive-review/', text: 'Best Fast Charger 2024' },
                { url: 'https://gogadgets77.wordpress.com/2024/05/11/14-essential-smartphone-accessories-to-elevate-your-tech-game-in-2024/', text: 'Essential Accessories' },
                { url: 'https://gogadgets77.wordpress.com/2024/05/11/14-essential-smartphone-accessories-to-elevate-your-tech-game-in-2024/', text: 'Back-to-School Accessories' }
            ]
        },
        {
            title: 'Level Design',
            description: 'Create immersive environments and strategic layouts to enhance gameplay.',
            icon: faGamepad,
            technologies: 'Unity, Unreal Engine, Blender',
            links: [
                { url: 'https://www.behance.net/gallery/215923707/Enviroment-design', text: 'Environment Design' },
                { url: 'https://www.behance.net/gallery/215970037/Game-build-for-VR-devices', text: 'Games Teaser' }
            ]
        },
        {
            title: 'Mobile App Development',
            description: 'Create responsive, user-friendly mobile apps tailored to your needs.',
            icon: faMobileAlt,
            technologies: 'React Native, Flutter, Swift',
            links: [
                { url: '#', text: 'working on it' }
            ]
        },
        {
            title: 'Illustration and Animation',
            description: 'Bring ideas to life with captivating visuals and dynamic animations.',
            icon: faPenToSquare,
            technologies: 'Adobe Illustrator, After Effects, Photoshop',
            links: [
                { url: 'https://www.behance.net/gallery/215922739/client-branding-poster', text: 'Client Branding Poster' },
                { url: 'https://www.behance.net/gallery/204814325/360-fliming', text: '360 Film Making' },
                { url: 'https://www.behance.net/gallery/202959411/Arbys-promotion', text: "Arby's Promotion" },
                { url: 'https://www.behance.net/gallery/215939795/Royal-bank-logo-redesign', text: 'Logo Redesign' }
            ]
        }
    ];

    return (
        <ParallaxProvider>
            <section className="work section" id="work">
                <div className="container">
                    <Parallax translateY={[-20, 20]} className="work__header">
                        <h2 className="section__title">My Work</h2>
                        <p className="section__subtitle">
                            A showcase of my latest projects and creative endeavors
                        </p>
                    </Parallax>
                    
                    <div className="work__grid">
                        {projects.map((project, index) => (
                            <Parallax 
                                key={index}
                                translateY={[30, -30]}
                                scale={[0.9, 1.1]}
                                easing="easeInQuad"
                                className="work__card"
                                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
                            >
                                <div className="work__card-icon">
                                    <FontAwesomeIcon icon={project.icon} />
                                </div>
                                <h3 className="work__card-title">{project.title}</h3>
                                <p className="work__card-description">{project.description}</p>
                                <div className="work__card-links">
                                    {project.links.map((link, linkIndex) => (
                                        <a 
                                            key={linkIndex}
                                            href={link.url}
                                            className="work__card-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cursor-text="View" 
                                            data-cursor-info={`${project.title}: ${project.technologies}`}
                                        >
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            </Parallax>
                        ))}
                    </div>
                </div>
            </section>
        </ParallaxProvider>
    );
};

export default Work;
