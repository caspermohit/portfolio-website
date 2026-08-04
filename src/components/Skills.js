import React from 'react';
import './Skills.css';

const skillCategories = [
    {
        title: 'Frameworks & Libraries',
        skills: ['React.js', 'Node.js', 'Laravel', 'Next.js', 'Bootstrap', 'Tailwind CSS'],
    },
    {
        title: 'Databases & Backend',
        skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Express', 'Redux', 'REST APIs'],
    },
    {
        title: 'Web Technologies',
        skills: ['HTML5/CSS3', 'JavaScript', 'TypeScript', 'Three.js', 'Web Sockets', 'Responsive Design'],
    },
    {
        title: 'Development Tools',
        skills: ['Git/GitHub', 'Docker', 'CI/CD', 'Jira', 'Figma', 'Jest/Testing'],
    },
    {
        title: 'Cloud Services',
        skills: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Cloudflare Workers', 'Netlify', 'Cloud Deploy'],
    },
    {
        title: 'Best Practices',
        skills: ['WCAG/AODA', 'ARIA', 'Performance', 'SEO', 'Security'],
    },
];

const Skills = () => (
    <section className="skills section" id="skills">
        <div className="skills-content">
            <div className="container">
                <div className="skills__header" data-reveal>
                    <span className="section__label">Capabilities</span>
                    <h2 className="section__title">Skills & Expertise</h2>
                    <p className="section__subtitle">
                        Tools and practices I use to ship accessible, performant products.
                    </p>
                </div>

                <div className="skills__rows" data-reveal>
                    {skillCategories.map((category) => (
                        <div className="skills__row" key={category.title}>
                            <h3 className="skills__row-title">{category.title}</h3>
                            <div className="skills__chips">
                                {category.skills.map((skill) => (
                                    <span className="skills__chip" key={skill}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Skills;
