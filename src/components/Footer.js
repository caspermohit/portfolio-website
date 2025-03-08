// src/components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGithub, 
    faLinkedin, 
    faTwitter, 
    faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__grid">
                    <div className="footer__section">
                        <h3 className="footer__title">Let's Connect</h3>
                        <div className="footer__social">
                            <a href="https://github.com/caspermohit" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.linkedin.com/in/mohitshah7/" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a href="https://x.com/mohitsh54078806" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://www.instagram.com/mohit__shahh/" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>

                    <div className="footer__section">
                        <h3 className="footer__title">Quick Links</h3>
                        <ul className="footer__links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#work">Work</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer__section">
                        <h3 className="footer__title">Let's Create Magic</h3>
                        <p className="footer__text">
                            Ready to bring your ideas to life? Let's work together and create something extraordinary!
                        </p>
                        <a href="#contact" className="footer__cta">
                            Start a Project <FontAwesomeIcon icon={faStar} className="cta-icon" />
                        </a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} Mohit Shah. Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> and creativity
                    </p>
                    <p className="footer__tagline">
                        Turning Ideas into Digital Reality
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
