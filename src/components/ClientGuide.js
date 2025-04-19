import React from 'react';
import { FaCode, FaFileAlt, FaCodeBranch, FaRocket, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import './ClientGuide.css';

const ClientGuide = () => {
    return (
        <section className="client-guide">
            <div className="container">
                <div className="client-guide__header">
                    <h2>Client Guide</h2>
                    <p>Everything you need to know about working with me</p>
                </div>

                {/* Services Offered */}
                <div className="client-guide__section" id="services">
                    <h3><FaCode /> Services Offered</h3>
                    <div className="services-grid">
                        <div className="service-card">
                            <h4>Web Development</h4>
                            <ul>
                                <li>Custom Website Development</li>
                                <li>E-commerce Solutions</li>
                                <li>Web Application Development</li>
                                <li>API Integration</li>
                            </ul>
                        </div>
                        <div className="service-card">
                            <h4>UI/UX Design</h4>
                            <ul>
                                <li>User Interface Design</li>
                                <li>User Experience Design</li>
                                <li>Wireframing & Prototyping</li>
                                <li>Design Systems</li>
                            </ul>
                        </div>
                        <div className="service-card">
                            <h4>Mobile Development</h4>
                            <ul>
                                <li>iOS App Development</li>
                                <li>Android App Development</li>
                                <li>Cross-platform Solutions</li>
                                <li>App Maintenance</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* What I Need From You */}
                <div className="client-guide__section">
                    <h3><FaFileAlt /> What I Need From You</h3>
                    <div className="requirements-list">
                        <div className="requirement-item">
                            <h4>Project Brief</h4>
                            <ul>
                                <li>Project goals and objectives</li>
                                <li>Target audience</li>
                                <li>Key features and functionality</li>
                                <li>Timeline expectations</li>
                            </ul>
                        </div>
                        <div className="requirement-item">
                            <h4>Brand Assets</h4>
                            <ul>
                                <li>Logo files (AI, EPS, PNG)</li>
                                <li>Brand colors and typography</li>
                                <li>Brand guidelines (if available)</li>
                                <li>Reference websites</li>
                            </ul>
                        </div>
                        <div className="requirement-item">
                            <h4>Content</h4>
                            <ul>
                                <li>Text content for all pages</li>
                                <li>High-quality images</li>
                                <li>Contact information</li>
                                <li>Social media links</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* My Process */}
                <div className="client-guide__section" id="process">
                    <h3><FaCodeBranch /> My Process</h3>
                    <div className="process-timeline">
                        <div className="process-step">
                            <div className="step-number">1</div>
                            <h4>Discovery</h4>
                            <p>Initial consultation and project planning</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">2</div>
                            <h4>Design</h4>
                            <p>Wireframes and visual design</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">3</div>
                            <h4>Development</h4>
                            <p>Building and testing</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">4</div>
                            <h4>Review</h4>
                            <p>Client feedback and revisions</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">5</div>
                            <h4>Launch</h4>
                            <p>Deployment and handover</p>
                        </div>
                    </div>
                </div>

                {/* Pricing & Timeline */}
                <div className="client-guide__section" id="pricing">
                    <h3><FaRocket /> Pricing & Timeline</h3>
                    <div className="pricing-info">
                        <div className="pricing-card">
                            <h4>Basic Package</h4>
                            <p className="pricing-amount"> $540+ /project</p>
                            <p className="pricing-description">Perfect for small projects or startups needing quick solutions.</p>
                            <ul>
                                <li>UX/UI consultation</li>
                                <li>Wireframing & prototyping</li>
                                <li>Basic website design (up to 3 pages)</li>
                                <li>One round of revisions</li>
                            </ul>
                        </div>
                        <div className="pricing-card featured">
                            <h4>Standard Package</h4>
                            <p className="pricing-amount">$950+/project</p>
                            <p className="pricing-description">Ideal for businesses looking for full design and development support.</p>
                            <ul>
                                <li>Complete UX/UI design</li>
                                <li>Responsive web development</li>
                                <li>Branding elements (logos, typography, color schemes)</li>
                                <li>Two rounds of revisions</li>
                            </ul>
                        </div>
                        <div className="pricing-card">
                            <h4>Premium Package</h4>
                            <p className="pricing-amount">$1,500+ per project</p>
                            <p className="pricing-description">Best for companies seeking advanced, scalable digital solutions.</p>
                            <ul>
                                <li>Custom UX research & strategy</li>
                                <li>Full-stack web development</li>
                                <li>E-commerce integration</li>
                                <li>Social media branding assets</li>
                                <li>Three rounds of revisions</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pricing-note">
                        <p>All pricing is flexible and based on project complexity and scope. Contact me for a custom quote tailored to your specific needs.</p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="client-guide__section" id="faq">
                    <h3><FaQuestionCircle /> Frequently Asked Questions</h3>
                    <div className="faq-list">
                        <div className="faq-item">
                            <h4>How many revisions do I get?</h4>
                            <p>Each project includes 2 rounds of revisions to ensure you're completely satisfied with the final product.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What's your payment structure?</h4>
                            <p>I typically require a 50% deposit to start work, with the remaining 50% due upon project completion.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Do you provide hosting?</h4>
                            <p>While I can recommend hosting providers, I don't provide hosting services directly. I'll help you set up hosting if needed.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What kind of support do you offer after launch?</h4>
                            <p>I provide 30 days of post-launch support to ensure everything is working smoothly and to address any issues that may arise.</p>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="client-guide__section" id="contact">
                    <h3><FaEnvelope /> Ready to Start Your Project?</h3>
                    <p>Get in touch to discuss your project requirements and get a free quote.</p>
                    <a href="/contact" className="cta-button">Contact Me</a>
                </div>
            </div>
        </section>
    );
};

export default ClientGuide; 