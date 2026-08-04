import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ClientGuideHeader.css';
import './Styles/styles.scss';

const ClientGuideHeader = () => {
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
            if (isMenuOpen && !e.target.closest('.client-guide-header__nav') && !e.target.closest('.client-guide-header__menu-btn')) {
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
        <header className={`client-guide-header ${isScrolled ? 'client-guide-header--scrolled' : ''}`}>
            <div className="container client-guide-header__container">
                <Link to="/" className="client-guide-header__logo" data-cursor-text="Home">
                    MS.
                </Link>

                <button 
                    className={`client-guide-header__menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`client-guide-header__nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="client-guide-header__nav-list">
                        <li>
                            <Link to="/" className="client-guide-header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="#services" className="client-guide-header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#process" className="client-guide-header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                Process
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="client-guide-header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#faq" className="client-guide-header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a href="#start" className="client-guide-header__nav-link" onClick={() => setIsMenuOpen(false)}>
                                Start
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default ClientGuideHeader; 