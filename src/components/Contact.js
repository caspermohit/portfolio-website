// src/components/Contact.js
import React, { useEffect, useRef } from 'react';
import './Contact.css'; // Ensure this CSS file contains styles for the contact section
import './Styles/styles.scss'; 
import '../index.css'; // Corrected import path
import ScrollReveal from 'scrollreveal';
import emailjs from 'emailjs-com';

const Contact = () => {
    const form = useRef();

    useEffect(() => {
        ScrollReveal().reveal('.contact__container', {
            origin: 'left',
            distance: '50px',
            duration: 2000,
            delay: 200,
        });
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();
        console.log('Sending email...');

        emailjs.sendForm('service_1hbwmq6', 'template_t6xg3n6', form.current, 'v5DnbuQFWbo4qjEaW')
            .then((result) => {
                console.log('Email sent:', result.text);
                alert('Message sent successfully!');
            }, (error) => {
                console.error('Email send error:', error.text);
                alert('Failed to send the message, please try again.');
            });
    };

    return (
        <section className="contact section" id="contact">
            <h2 className="section-title">Contact</h2>
            <div className="contact__container bd-grid">
                <form ref={form} onSubmit={sendEmail} className="contact__form">
                    <input type="text" name="user_name" placeholder="Name" className="contact__input" required />
                    <input type="email" name="user_email" placeholder="Email" className="contact__input" required />
                    <textarea name="message" cols="0" rows="10" placeholder="Message" className="contact__input" required></textarea>
                    <input type="submit" value="Send" placeholder="send"className="contact__button button" />
                </form>
            </div>
        </section>
    );
};

export default Contact;
