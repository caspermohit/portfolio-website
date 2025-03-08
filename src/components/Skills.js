// src/components/Skills.js
import React, { useEffect } from 'react';
import './Skills.css';
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCode, 
    faDatabase, 
    faTools, 
    faCloud,
    faMobile,
    faUniversalAccess
} from '@fortawesome/free-solid-svg-icons';
import penLed from './assets/img/penled.png';
import wholePen from './assets/img/wholepen.png';

const Skills = () => {
    useEffect(() => {
        ScrollReveal().reveal('.skills__category', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            interval: 100
        });

        // Custom parallax effect
        const handleScroll = () => {
           
            const windowHeight = window.innerHeight;
            const penContainer = document.querySelector('.pen-split');

            if (penContainer) {
                const containerRect = penContainer.getBoundingClientRect();
                const containerTop = containerRect.top;
                const containerHeight = containerRect.height;
                
                // Calculate scroll percentage with delay
                const scrollPercentage = Math.max(0, Math.min(1, 
                    (windowHeight - containerTop) / (windowHeight + containerHeight)
                ));

                // Add delay by starting the split effect later and making it more gradual
                const delayedPercentage = Math.max(0, (scrollPercentage - 0.2) * 1.25);
                const easedPercentage = delayedPercentage * delayedPercentage; // Square for smoother start

                // Apply transformations to pen images
                const wholePenImg = document.querySelector('.whole-pen');
                const penLedImg = document.querySelector('.pen-led');

                if (wholePenImg && penLedImg) {
                    // Start with no offset and gradually move apart
                    wholePenImg.style.transform = `
                        translate3d(calc(-50% + ${easedPercentage * 100}%), -50%, 0)
                        scale(${1 + easedPercentage * 0.1})
                    `;

                    // Move pen LED to the left from center
                    penLedImg.style.transform = `
                        translate3d(calc(-50% + ${-easedPercentage * 100}%), -50%, 0)
                        scale(${1 - easedPercentage * 0.1})
                    `;
                }
            }
        };

        // Initial call
        handleScroll();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const skillCategories = [
        {
            icon: faCode,
            title: "Frameworks & Libraries",
            skills: [
                "React.js",
                "Node.js",
                "Laravel",
                "Next.js",
                "Bootstrap",
                "Tailwind CSS"
            ]
        },
        {
            icon: faDatabase,
            title: "Databases & Backend",
            skills: [
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "Express",
                "Redux",
                "REST APIs"
            ]
        },
        {
            icon: faMobile,
            title: "Web Technologies",
            skills: [
                "HTML5/CSS3",
                "JavaScript",
                "TypeScript",
                "Three.js",
                "Web Sockets",
                "Responsive Design"
            ]
        },
        {
            icon: faTools,
            title: "Development Tools",
            skills: [
                "Git/GitHub",
                "Docker",
                "CI/CD",
                "Jira",
                "Figma",
                "Jest/Testing"
            ]
        },
        {
            icon: faCloud,
            title: "Cloud Services",
            skills: [
                "AWS EC2",
                "AWS S3",
                "AWS Lambda",
                "Cloud Deploy",
                "AWS Services"
            ]
        },
        {
            icon: faUniversalAccess,
            title: "Best Practices",
            skills: [
                "WCAG/AODA",
                "ARIA",
                "Performance",
                "SEO",
                "Security"
            ]
        }
    ];

    return (
        <section className="skills section" id="skills">
            {/* Pen Split Section */}
            <div className="pen-split">
                <div className="div-block">
                    {/* Pen Images */}
                    <img src={wholePen} alt="Pen" className="c-pen--1-2 tablet whole-pen" />
                    <img src={penLed} alt="Pen LED" className="new-parallax-image pen-led" />
                </div>
            </div>

            {/* Main Content */}
            <div className="skills-content">
                <div className="container">
                    <div className="skills__header">
                        <h2 className="section__title">Skills & Expertise</h2>
                        <p className="section__subtitle">
                            A comprehensive overview of my technical capabilities and tools I work with
                        </p>
                    </div>

                    <div className="skills__grid">
                        {skillCategories.map((category, index) => (
                            <div 
                                key={index}
                                className="skills__category"
                            >
                                <div className="skills__category-header">
                                    <FontAwesomeIcon icon={category.icon} className="skills__category-icon" />
                                    <h3 className="skills__category-title">{category.title}</h3>
                                </div>
                                <div className="skills__list">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div 
                                            className="skills__item" 
                                            key={skillIndex}
                                            style={{
                                                transitionDelay: `${skillIndex * 0.1}s`
                                            }}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
