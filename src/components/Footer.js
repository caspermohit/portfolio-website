import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <p>© {new Date().getFullYear()} Mohit Shah</p>
        <nav aria-label="Elsewhere">
            <a href="https://github.com/caspermohit" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/mohitshah7/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.conestogagigs.ca/mohit-shah/" target="_blank" rel="noopener noreferrer">Conestoga Gigs</a>
            <a href="/#contact">Contact</a>
        </nav>
    </footer>
);

export default Footer;
