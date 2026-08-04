import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isMenuOpen &&
                !e.target.closest('.header__nav') &&
                !e.target.closest('.header__menu-btn')
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const close = () => setIsMenuOpen(false);

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="container header__container">
                <Link to="/" className="header__logo" data-cursor-text="Home" onClick={close}>
                    MS.
                </Link>

                <button
                    className={`header__menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="header__nav-list">
                        <li>
                            <a href="#about" className="header__nav-link" data-cursor-text="About" onClick={close}>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#work" className="header__nav-link" data-cursor-text="Work" onClick={close}>
                                Work
                            </a>
                        </li>
                        <li>
                            <a href="#skills" className="header__nav-link" data-cursor-text="Skills" onClick={close}>
                                Skills
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="header__nav-link" data-cursor-text="Contact" onClick={close}>
                                Contact
                            </a>
                        </li>
                        <li className="header__nav-secondary">
                            <Link
                                to="/client-guide"
                                className="header__nav-link header__nav-link--quiet"
                                data-cursor-text="Guide"
                                onClick={close}
                            >
                                Client Guide
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
