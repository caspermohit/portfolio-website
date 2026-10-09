import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ business = false }) => {
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

    useEffect(() => {
        const onEscape = (event) => {
            if (event.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
                document.querySelector('.header__menu-btn')?.focus();
            }
        };
        document.addEventListener('keydown', onEscape);
        return () => document.removeEventListener('keydown', onEscape);
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
                    aria-controls="main-navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav aria-label="Main navigation" id="main-navigation" className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="header__nav-list">
                        {(business ? [
                            ['#crm-flow', 'How it works'],
                            ['#crm-about', 'About Mohit'],
                            ['#crm-demo', '10-minute demo'],
                        ] : [
                            ['#about', 'About'], ['#work', 'Work'],
                            ['#skills', 'Skills'], ['#contact', 'Contact'],
                        ]).map(([href, label]) => (
                            <li key={href}>
                                <a href={href} className="header__nav-link" onClick={close}>{label}</a>
                            </li>
                        ))}
                        <li className="header__nav-secondary">
                            <Link to={business ? '/' : '/client-guide'} className="header__nav-link header__nav-link--quiet" onClick={close}>
                                {business ? 'Portfolio' : 'Client Guide'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
