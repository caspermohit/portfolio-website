// src/components/Header.js
import React, { useState } from 'react';
import './Header.css'; // Ensure this CSS file contains styles for the header section
import './Styles/styles.scss';  // Corrected import path
import logo from './assets/img/logo-transparent-png.png';
import '../index.css'; 
const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLinkClick = () => {
        setMenuVisible(false);
    };

    return (
        <header className="l-header">
            <nav className="nav bd-grid">
                <div>
                   <img src={logo} alt="" className="nav__logo" href="#home"/>
                </div>
                <div className={`nav__menu ${menuVisible ? 'show' : ''}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item"><a href="#home" className="nav__link" onClick={handleLinkClick}>Home</a></li>
                        <li className="nav__item"><a href="#about" className="nav__link" onClick={handleLinkClick}>About</a></li>
                        <li className="nav__item"><a href="#skills" className="nav__link" onClick={handleLinkClick}>Skills</a></li>
                        <li className="nav__item"><a href="#work" className="nav__link" onClick={handleLinkClick}>Work</a></li>
                        <li className="nav__item"><a href="#contact" className="nav__link" onClick={handleLinkClick}>Contact</a></li>
                    </ul>
                </div>
                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <i className='bx bx-menu'></i>
                </div>
            </nav>
        </header>
    );
};

export default Header;
