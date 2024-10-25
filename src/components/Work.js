// src/components/Work.js
import React, { useEffect } from 'react';
import './Work.css'; // Ensure this CSS file contains styles for the work section
import './Styles/styles.scss';
import '../index.css';  // Corrected import path
import ScrollReveal from 'scrollreveal';
import work1 from './assets/img/portfolio-1.png';
import work2 from './assets/img/portfolio-2.png';
import work3 from './assets/img/portfolio-3.png';
import work4 from './assets/img/portfolio-4.png';
import work5 from './assets/img/portfolio-5.png';
import work6 from './assets/img/portfolio-6.png';

const Work = () => {
    useEffect(() => {
        ScrollReveal().reveal('.work__container', {
            origin: 'bottom',
            distance: '50px',
            duration: 2000,
            delay: 200,
        });
    }, []);

    return (
        <section className="work section" id="work">
            <h2 className="section-title">Work</h2>
            <div className="work__container bd-grid">
                <div className="work__img">
                    <a href='https://multi-converter-app.netlify.app/' >
                    <img src={work1}  alt="Work 1" />
                    </a>
                </div>
                <div className="work__img">
                    <img src={work2} alt="Work 2" />
                </div>
                <div className="work__img">
                    <img src={work3} alt="Work 3" />
                </div>
                <div className="work__img">
                    <img src={work4} alt="Work 4" />
                </div>
                <div className="work__img">
                    <img src={work5} alt="Work 5" />
                </div>
                <div className="work__img">
                    <img src={work6} alt="Work 6" />
                </div>
            </div>
        </section>
    );
};

export default Work;
