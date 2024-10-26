// src/components/Home.js
import React, { useEffect, useState } from 'react';
import './Home.css'; // Ensure this CSS file contains styles for the home section
import './Styles/styles.scss';
import '../index.css'; // Corrected import path
import ScrollReveal from 'scrollreveal';
import profile from './assets/img/image.png'; // Import your image here

function Home() {
    const [typingComplete, setTypingComplete] = useState(false);

    useEffect(() => {
        ScrollReveal().reveal('.home__data, .home__social, .home__img', {
            origin: 'top',
            distance: '30px',
            duration: 2000,
            interval: 200,
            reset: true
        });

        const typingElements = document.querySelectorAll('.typing-text');
        let currentElementIndex = 0;
        let currentIndex = 0;

        function typeNextCharacter() {
            if (currentElementIndex < typingElements.length) {
                const element = typingElements[currentElementIndex];
                const text = element.getAttribute('data-text') || element.textContent;
                element.setAttribute('data-text', text);
                element.textContent = text.substring(0, currentIndex + 1);
                currentIndex++;

                if (currentIndex < text.length) {
                    setTimeout(typeNextCharacter, 100);
                } else {
                    currentElementIndex++;
                    currentIndex = 0;
                    if (currentElementIndex < typingElements.length) {
                        setTimeout(typeNextCharacter, 500);
                    } else {
                        setTypingComplete(true);
                    }
                }
            }
        }

        typeNextCharacter();
    }, []);

    return (
        <section className="home bd-grid" id="home">
            <div className="home__data">
                <h1 className="home__title">
                    <span>Hi,</span><br />
                    <span className='typing-text'>I'm <span className="home__title-color">Mohit Shah</span></span><br />
                    <span className='typing-text'>Web Designer</span>
                </h1>
                <a href="#contact" className={`button ${typingComplete ? 'fade-in' : ''}`}>Contact</a>
                <div className={`home__social ${typingComplete ? 'fade-in' : ''}`}>
                    <a href="https://linkedin.com" className="home__social-icon" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-linkedin'></i>
                    </a>
                    <a href="https://www.behance.net/mohitshah8" className="home__social-icon" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-behance'></i>
                    </a>
                    <a href="https://github.com/caspermohit" className="home__social-icon" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-github'></i>
                    </a>
                    <a href="https://gogadgets77.wordpress.com/" className="home__social-icon" target="_blank" rel="noopener noreferrer">
                        <i className='bx bxl-wordpress'></i>
                    </a>
                </div>
            </div>
            <div className="home__img">
                <svg className="home__blob" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <mask id="mask0" mask-type="alpha">
                        <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                    </mask>
                    <g mask="url(#mask0)">
                        <path fill="rgba(78,136,143,255)" d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                        <image className="home__blob-img" x="50" y="60" href={profile} />
                    </g>
                </svg>
            </div>
        </section>
    );
}

export default Home;
