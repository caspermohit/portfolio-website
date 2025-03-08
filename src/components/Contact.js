// src/components/Contact.js
import React, { useState, useEffect } from 'react';
import './Contact.css'; // Ensure this CSS file contains styles for the contact section
import './Styles/styles.scss'; 
import '../index.css'; // Corrected import path
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, 
    faMapMarker, 
    faPhone, 
    faStar, 
    faRocket
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

    useEffect(() => {
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
        setStatus('sending');

        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            formData,
            'YOUR_USER_ID'
        )
        .then(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        })
        .catch(() => {
            setStatus('error');
        });
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
                                <FontAwesomeIcon icon={faEnvelope} className="contact__info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Ready to Connect?</h3>
                                <p>your.email@example.com</p>
                                <span className="info-description">Drop me a line anytime!</span>
                            </div>
                        </div>
                        <div className="contact__info-item animate-on-scroll">
                            <div className="info-icon-wrapper">
                                <FontAwesomeIcon icon={faPhone} className="contact__info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Let's Talk</h3>
                                <p>+1 234 567 890</p>
                                <span className="info-description">Available Mon-Fri, 9AM-6PM</span>
                            </div>
                        </div>
                        <div className="contact__info-item animate-on-scroll">
                            <div className="info-icon-wrapper">
                                <FontAwesomeIcon icon={faMapMarker} className="contact__info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Visit Me</h3>
                                <p>Your City, Country</p>
                                <span className="info-description">Let's meet for coffee!</span>
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
                        <button 
                            type="submit" 
                            className={`contact__form-button ${status}`}
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Making Magic Happen...' : 'Start Our Journey Together →'}
                        </button>
                        {status === 'success' && (
                            <p className="contact__form-success">
                                <FontAwesomeIcon icon={faStar} /> 
                                Message received! Let's create something extraordinary!
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="contact__form-error">Oops! Let's try that again. Great things take persistence!</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
