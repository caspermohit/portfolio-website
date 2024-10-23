// src/components/Skills.js
import React, { useEffect } from 'react';
import './Skills.css'; // Ensure this CSS file contains styles for the skills section
import './Styles/styles.scss';
import '../index.css';   // Corrected import path
import ScrollReveal from 'scrollreveal';

const Skills = () => {
    useEffect(() => {
        ScrollReveal().reveal('.skills__container', {
            origin: 'right',
            distance: '50px',
            duration: 2000,
            delay: 200,
        });
    }, []);

    return (
        <section className="skills section" id="skills">
            <h2 className="section-title">Skills</h2>
            <h2 className="skills__subtitle">Professional Skills</h2>
            <p className="skills__text">
                Here are my skills, I have gained knowledge in
            </p>
            <div className="skills__container bd-grid">
               
                <div className="skills__grid">
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-html5 skills__icon'></i>
                            <span className="skills__name">HTML5</span>
                        </div>
                        <div className="skills__bar skills__html"></div>
                        <div>
                            <span className="skills__percentage">95%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-css3 skills__icon'></i>
                            <span className="skills__name">CSS3</span>
                        </div>
                        <div className="skills__bar skills__css"></div>
                        <div>
                            <span className="skills__percentage">85%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-javascript skills__icon'></i>
                            <span className="skills__name">JavaScript</span>
                        </div>
                        <div className="skills__bar skills__js"></div>
                        <div>
                            <span className="skills__percentage">85%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxs-paint skills__icon'></i>
                            <span className="skills__name">UX/UI</span>
                        </div>
                        <div className="skills__bar skills__ux"></div>
                        <div>
                            <span className="skills__percentage">85%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-unity skills__icon'></i>
                            <span className="skills__name">Unity</span>
                        </div>
                        <div className="skills__bar skills__unity"></div>
                        <div>
                            <span className="skills__percentage">70%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-sass skills__icon'></i>
                            <span className="skills__name">sass</span>
                        </div>
                        <div className="skills__bar skills__sass"></div>
                        <div>
                            <span className="skills__percentage">40%</span>
                        </div>
                    </div>
                </div>

                <div className="skills__grid">
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-react skills__icon'></i>
                            <span className="skills__name">React.js</span>
                        </div>
                        <div className="skills__bar skills__react"></div>
                        <div>
                            <span className="skills__percentage">70%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-php skills__icon'></i>
                            <span className="skills__name">php</span>
                        </div>
                        <div className="skills__bar skills__php"></div>
                        <div>
                            <span className="skills__percentage">65%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-tailwind-css skills__icon'></i>
                            <span className="skills__name">Tailwind CSS</span>
                        </div>
                        <div className="skills__bar skills__tailwind"></div>
                        <div>
                            <span className="skills__percentage">70%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-figma skills__icon'></i>
                            <span className="skills__name">Figma</span>
                        </div>
                        <div className="skills__bar skills__figma"></div>
                        <div>
                            <span className="skills__percentage">70%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-adobe skills__icon'></i>
                            <span className="skills__name">Photoshop</span>
                        </div>
                        <div className="skills__bar skills__photoshop"></div>
                        <div>
                            <span className="skills__percentage">70%</span>
                        </div>
                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-blender skills__icon'></i>
                            <span className="skills__name">Blender</span>
                        </div>
                        <div className="skills__bar skills__blender"></div>
                        <div>
                            <span className="skills__percentage">70%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
