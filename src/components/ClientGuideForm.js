import React, { useState } from 'react';
import './ClientGuideForm.css';

const initial = {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    goals: '',
    description: '',
};

const ClientGuideForm = ({ requestedPackage = '' }) => {
    const [copyStatus, setCopyStatus] = useState('');
    const [formData, setFormData] = useState(initial);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const brief = [`Name: ${formData.name}`, `Email: ${formData.email}`, `Company: ${formData.company || '—'}`, `Package: ${requestedPackage || 'To discuss'}`, `Project type: ${formData.projectType}`, `Budget: ${formData.budget}`, `Timeline: ${formData.timeline}`, `Success looks like: ${formData.goals}`, '', 'Project notes:', formData.description].join('\n');
    const draftUrl = `mailto:mohitshah.ms77@gmail.com?subject=${encodeURIComponent(`Project inquiry — ${requestedPackage || formData.projectType || 'General'} — ${formData.name}`)}&body=${encodeURIComponent(brief)}`;
    const openMail = () => {
        window.location.href = draftUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            openMail();
            setSubmitStatus('draft');
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="cg-form">
            <form onSubmit={handleSubmit} noValidate={false}>
                {requestedPackage && <p className="cg-form__selection" role="status">Selected package: <strong>{requestedPackage}</strong></p>}<div className="cg-form__grid">
                    <label className="cg-form__field">
                        <span>Name *</span>
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
                    <label className="cg-form__field">
                        <span>Email *</span>
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
                    <label className="cg-form__field">
                        <span>Company</span>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            maxLength={80}
                            autoComplete="organization"
                        />
                    </label>
                    <label className="cg-form__field">
                        <span>Project type *</span>
                        <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select…</option>
                            <option value="Marketing / brochure site">Marketing / brochure site</option>
                            <option value="UI/UX & prototype">UI/UX &amp; prototype</option>
                            <option value="Web app / dashboard">Web app / dashboard</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Redesign / rebuild">Redesign / rebuild</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label className="cg-form__field">
                        <span>Budget range *</span>
                        <select name="budget" value={formData.budget} onChange={handleChange} required>
                            <option value="">Select…</option>
                            <option value="$2,000 – $4,000">$2,000 – $4,000</option>
                            <option value="$4,000 – $8,000">$4,000 – $8,000</option>
                            <option value="$8,000 – $15,000">$8,000 – $15,000</option>
                            <option value="$15,000+">$15,000+</option>
                            <option value="Not sure yet">Not sure yet</option>
                        </select>
                    </label>
                    <label className="cg-form__field">
                        <span>Ideal timeline *</span>
                        <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select…</option>
                            <option value="ASAP (2–4 weeks)">ASAP (2–4 weeks)</option>
                            <option value="1–2 months">1–2 months</option>
                            <option value="2–3 months">2–3 months</option>
                            <option value="Flexible">Flexible</option>
                        </select>
                    </label>
                </div>

                <label className="cg-form__field">
                    <span>What does success look like? *</span>
                    <input
                        type="text"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        required
                        maxLength={240}
                        placeholder="e.g. more qualified leads, launch MVP, refresh brand online"
                    />
                </label>

                <label className="cg-form__field">
                    <span>Project notes *</span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        maxLength={4000}
                        rows={5}
                        placeholder="Audience, must-have features, references, constraints…"
                    />
                </label>

                <button type="submit" className="cg__btn cg-form__submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Opening mail…' : 'Open email draft →'}
                </button>

                {submitStatus === 'draft' && <div className="cg-form__msg" role="status"><p>Your brief is ready for your email app. Nothing is sent from this page, and your answers are kept here.</p><a href={draftUrl}>Open the email draft again →</a></div>}
                {submitStatus === 'error' && <p className="cg-form__msg" role="alert">The email app could not open. Your answers are kept here; copy the brief and email it to mohitshah.ms77@gmail.com.</p>}
                <button type="button" className="cg__btn cg__btn--ghost" onClick={async () => { try { await navigator.clipboard.writeText(brief); setCopyStatus('Project brief copied.'); } catch { setCopyStatus('Copy is unavailable. Your answers remain in the form so you can select and copy them.'); } }}>Copy project brief</button>
                <p className="cg-form__msg" role="status">{copyStatus}</p>
            </form>
        </div>
    );
};

export default ClientGuideForm;
