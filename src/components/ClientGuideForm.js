import React, { useState } from 'react';
import './ClientGuideForm.css';

const ClientGuideForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                company: '',
                projectType: '',
                budget: '',
                timeline: '',
                description: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="client-guide-form">
            <h3>Start Your Project</h3>
            <p>Fill out the form below and I'll get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectType">Project Type *</label>
                    <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select project type</option>
                        <option value="web">Web Development</option>
                        <option value="ui">UI/UX Design</option>
                        <option value="mobile">Mobile Development</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="budget">Budget Range *</label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select budget range</option>
                        <option value="1000-3000">$1,000 - $3,000</option>
                        <option value="3000-5000">$3,000 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="timeline">Project Timeline *</label>
                    <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select timeline</option>
                        <option value="2-4">2-4 weeks</option>
                        <option value="4-8">4-8 weeks</option>
                        <option value="8+">8+ weeks</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Project Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Tell me about your project..."
                        rows="5"
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Submit Project Request'}
                </button>

                {submitStatus === 'success' && (
                    <div className="form-message success">
                        Thank you! Your project request has been submitted. I'll get back to you soon.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="form-message error">
                        Oops! Something went wrong. Please try again later.
                    </div>
                )}
            </form>
        </div>
    );
};

export default ClientGuideForm; 