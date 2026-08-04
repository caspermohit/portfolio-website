import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [emailjsEnabled, setEmailjsEnabled] = useState(false);

    useEffect(() => {
        try {
            emailjs.init('QXLzBsqnZ2lujJnZD');
            setEmailjsEnabled(true);
        } catch {
            setEmailjsEnabled(false);
        }
    }, []);

    const openMailClient = () => {
        const subject = encodeURIComponent(`Portfolio Contact - ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
        );
        window.open(`mailto:mohitshah.ms77@gmail.com?subject=${subject}&body=${body}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailjsEnabled) {
            openMailClient();
            setStatus('success');
            return;
        }
        setStatus('sending');
        emailjs
            .send(
                'service_7z6hd6v',
                'template_y8sv6na',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Portfolio Owner',
                },
                'QXLzBsqnZ2lujJnZD'
            )
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch(() => {
                setStatus('error');
                openMailClient();
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="contact section" id="contact">
            <div className="container contact__layout">
                <div className="contact__cta" data-reveal>
                    <span className="section__label">Contact</span>
                    <h2 className="contact__headline">
                        Let&apos;s
                        <br />
                        create
                        <br />
                        something
                    </h2>
                    <p className="contact__pitch">
                        Full Stack Developer — open for freelance &amp; product work. I reply within
                        1 business day.
                    </p>
                    <a
                        href="mailto:mohitshah.ms77@gmail.com"
                        className="contact__mail"
                        data-cursor-text="Email"
                    >
                        mohitshah.ms77@gmail.com
                    </a>
                    <p className="contact__trust">
                        Prefer a scoped brief?{' '}
                        <Link to="/client-guide" data-cursor-text="Guide">
                            Client Guide →
                        </Link>
                    </p>
                </div>

                <form className="contact__form" onSubmit={handleSubmit} data-reveal>
                    <p className="contact__form-label">Say hello</p>
                    <label className="contact__field">
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                    </label>
                    <label className="contact__field">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </label>
                    <label className="contact__field contact__field--message">
                        <span>Message</span>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="What are you building?"
                        />
                    </label>
                    <div className="contact__actions">
                        <button type="submit" className="contact__submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending…' : 'Send message →'}
                        </button>
                    </div>
                    {status === 'success' && (
                        <p className="contact__note">Got it — I&apos;ll reply within 1 business day.</p>
                    )}
                    {status === 'error' && (
                        <p className="contact__note contact__note--error">
                            Couldn&apos;t send via form — mail client opened as fallback.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;
