// src/components/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css'; // Ensure this CSS file contains styles for the header section
import './Styles/styles.scss';  // Corrected import path
import logo from './assets/img/logo-transparent-png.png';
import '../index.css'; 
// Import your resume file
const resumePDF = process.env.PUBLIC_URL + '/resume.pdf';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLinkClick = () => {
        setMenuVisible(false);
    };

    // Function to handle resume download
    const handleResumeDownload = () => {
        window.open(resumePDF, '_blank');
    };

    return (
        <header className="l-header">
            <nav className="nav bd-grid">
                <div className="nav__brand">
                   <img src={logo}  href ="#home" alt="" className="nav__logo" />
                </div>
                <div className={`nav__menu ${menuVisible ? 'show' : ''}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item"><a href="#home" className="nav__link" onClick={handleLinkClick}>Home</a></li>
                        <li className="nav__item"><a href="#about" className="nav__link" onClick={handleLinkClick}>About</a></li>
                        <li className="nav__item"><a href="#skills" className="nav__link" onClick={handleLinkClick}>Skills</a></li>
                        <li className="nav__item"><a href="#work" className="nav__link" onClick={handleLinkClick}>Work</a></li>
                        <li className="nav__item"><a href="#contact" className="nav__link" onClick={handleLinkClick}>Contact</a></li>
                        <li className="nav__item">
                            <button className=" resume-button" onClick={handleResumeDownload}>Resume</button>
                        </li>
                    </ul>
                </div>
                {isMobile && (
                    <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                        <i className='bx bx-menu'></i>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
