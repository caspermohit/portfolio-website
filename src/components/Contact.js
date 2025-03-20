// src/components/Contact.js
import React, { useState, useEffect } from 'react';
import './Contact.css'; // Ensure this CSS file contains styles for the contact section
import './Styles/styles.scss'; 
import '../index.css'; // Corrected import path
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, 
    faHandshake,
    faBriefcase,
    faPaintBrush, 
    faStar, 
    faRocket,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [isAnimated, setIsAnimated] = useState(false);
    const [emailjsEnabled, setEmailjsEnabled] = useState(false);

    useEffect(() => {
        // Try to initialize EmailJS
        try {
            emailjs.init('QXLzBsqnZ2lujJnZD');
            setEmailjsEnabled(true);
        } catch (error) {
            console.log("EmailJS initialization failed, using fallback method");
            setEmailjsEnabled(false);
        }
        
        ScrollReveal().reveal('.contact__content', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200
        });

        ScrollReveal().reveal('.inspiration-quote', {
            origin: 'left',
            distance: '100px',
            duration: 1200,
            delay: 400
        });

        ScrollReveal().reveal('.contact__info-item', {
            origin: 'right',
            distance: '50px',
            duration: 800,
            interval: 200
        });

        setIsAnimated(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (emailjsEnabled) {
            setStatus('sending');
            
            // Make sure formData matches EmailJS template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: "Portfolio Owner"
            };
    
            emailjs.send(
                'service_7z6hd6v',
                'template_y8sv6na',
                templateParams,
                'QXLzBsqnZ2lujJnZD'
            )
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                setStatus('error');
                openMailClient();
            });
        } else {
            // Fallback to direct email client
            openMailClient();
        }
    };

    const openMailClient = () => {
        const subject = encodeURIComponent(`Portfolio Contact - ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`);
        window.open(`mailto:mohitshah.ms77@gmail.com?subject=${subject}&body=${body}`);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="contact__header">
                    <h2 className="section__title">
                        <FontAwesomeIcon icon={faRocket} className="title-icon" />
                        Let's Create Something Amazing Together
                    </h2>
                    <div className="inspiration-quote">
                        <FontAwesomeIcon icon={faStar} className="quote-icon" />
                        <p className="section__subtitle">
                            "Every great project starts with a conversation. Your vision combined with my expertise - 
                            let's turn ideas into reality!"
                        </p>
                    </div>
                </div>

                <div className="contact__grid">
                    <div className="contact__info">
                        <div className="contact__info-item animate-on-scroll">
                            <div className="info-icon-wrapper">
                                <FontAwesomeIcon icon={faPaintBrush} className="contact__info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Design & Strategy</h3>
                                <p>Creative Solutions</p>
                                <span className="info-description">Innovative designs that align with your business goals</span>
                            </div>
                        </div>
                        <div className="contact__info-item animate-on-scroll">
                            <div className="info-icon-wrapper">
                                <FontAwesomeIcon icon={faBriefcase} className="contact__info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Development</h3>
                                <p>Technical Excellence</p>
                                <span className="info-description">Clean, efficient code built for performance</span>
                            </div>
                        </div>
                        <div className="contact__info-item animate-on-scroll">
                            <div className="info-icon-wrapper">
                                <FontAwesomeIcon icon={faHandshake} className="contact__info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Collaboration</h3>
                                <p>Smooth Partnership</p>
                                <span className="info-description">Transparent communication throughout the project</span>
                            </div>
                        </div>
                    </div>

                    <form className={`contact__form ${isAnimated ? 'form-animated' : ''}`} onSubmit={handleSubmit}>
                        <div className="form-header">
                            <h3>Share Your Vision</h3>
                            <p>Every great project begins with a message</p>
                        </div>
                        <div className="contact__form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="What's your name?"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="animated-input"
                            />
                        </div>
                        <div className="contact__form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Where can I reach you?"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="animated-input"
                            />
                        </div>
                        <div className="contact__form-group">
                            <textarea
                                name="message"
                                placeholder="Tell me about your amazing idea..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="animated-input"
                            ></textarea>
                        </div>
                        <div className="contact__buttons">
                            <button 
                                type="submit" 
                                className={`contact__form-button ${status}`}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Making Magic Happen...' : 'Send Message →'}
                            </button>
                            <button 
                                type="button"
                                className="contact__email-button"
                                onClick={openMailClient}
                            >
                                <FontAwesomeIcon icon={faEnvelope} /> Open Email Client <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                            </button>
                        </div>
                        {status === 'success' && (
                            <p className="contact__form-success">
                                <FontAwesomeIcon icon={faStar} /> 
                                Message received! Let's create something extraordinary!
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="contact__form-error">
                                There was an issue sending your message. You can try using the direct email button instead.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
