import ScrollInk from './ScrollInk';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import emailjs from 'emailjs-com';
import { FiCopy, FiCheck } from 'react-icons/fi';
import HairlineFigure from './HairlineFigure';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [copyStatus, setCopyStatus] = useState('');
    useEffect(() => {
        if (!copyStatus) return undefined;
        const timer = window.setTimeout(() => setCopyStatus(''), 3500);
        return () => window.clearTimeout(timer);
    }, [copyStatus]);
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText('mohitshah.ms77@gmail.com');
            setCopyStatus('Email address copied.');
        } catch {
            setCopyStatus('Select the email address to copy it.');
        }
    };
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
        window.location.href = `mailto:mohitshah.ms77@gmail.com?subject=${subject}&body=${body}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailjsEnabled) {
            setStatus('error');
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
                    <h2 className="contact__headline"><ScrollInk>
                        Let&apos;s create something.
                    </ScrollInk></h2>
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
                    <button type="button" className="contact-copy" onClick={copyEmail}>{copyStatus === 'Email address copied.' ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />} Copy email address</button>
                    <p className="contact-copy-status" role="status">{copyStatus}</p>
                    <p className="contact__trust">
                        Prefer a scoped brief?{' '}
                        <Link to="/client-guide" data-cursor-text="Guide">
                            Client Guide →
                        </Link>
                    </p>
                    <div className="contact-connection"><HairlineFigure figure="hub" label="An isometric network of connected tiles that responds to your pointer" /><p><span>Good ideas connect.</span>Based in Kitchener,<br />Ontario, Canada.</p></div>
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
                            maxLength={80}
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
                            maxLength={120}
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
                            maxLength={2000}
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
                        <p className="contact__note" role="status">Got it — I&apos;ll reply within 1 business day.</p>
                    )}
                    {status === 'draft' && <p className="contact__note" role="status">Your email app has been opened with a draft. Send it there to get in touch.</p>}
                    {status === 'error' && (
                        <p className="contact__note contact__note--error" role="status">
                            Couldn’t send the message. Your text is kept here. Open an email draft or copy the message below.
                        </p>
                    )}
                    {status === 'error' && <div className="contact-recovery"><button type="button" onClick={openMailClient}>Open email draft →</button><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`); setCopyStatus('Message copied.'); } catch { setCopyStatus('Select your message above to copy it.'); } }}>Copy message</button></div>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
