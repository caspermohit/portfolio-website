// src/components/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css'; 
import './Styles/styles.scss';  
import AnimatedBackground from './AnimatedBackground';


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && !e.target.closest('.header__nav') && !e.target.closest('.header__menu-btn')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__background">
                <AnimatedBackground 
                    color="var(--accent-color)"
                    particleCount={300}
                    particleSize={2}
                    speed={0.8}
                    zIndex={-1}
                />
            </div>

            <div className="container header__container">
                <a href="/" className="header__logo" data-cursor-text="Home">
                    MS.
                </a>

                <button 
                    className={`header__menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="header__nav-list">
                        <li><a href="#home" className="header__nav-link" data-cursor-text="Home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                        <li><a href="#about" className="header__nav-link" data-cursor-text="About Me" onClick={() => setIsMenuOpen(false)}>About</a></li>
                        <li><a href="#work" className="header__nav-link" data-cursor-text="My Work" onClick={() => setIsMenuOpen(false)}>Work</a></li>
                        <li><a href="#skills" className="header__nav-link" data-cursor-text="My Skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
                        <li><a href="#contact" className="header__nav-link" data-cursor-text="Get in Touch" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
