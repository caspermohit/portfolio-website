import React, { useState } from 'react';
import ClientGuideForm from './ClientGuideForm';
import './ClientGuide.css';

const services = [
    {
        title: 'Product & marketing sites',
        outcome: 'A site that explains what you sell and turns visits into inquiries.',
        includes: ['5–12 pages', 'Mobile-first UI', 'CMS or easy content edits', 'Forms & analytics'],
    },
    {
        title: 'UI/UX & prototypes',
        outcome: 'Clarity before code — flows, wireframes, and high-fidelity screens.',
        includes: ['User flows', 'Figma prototypes', 'Design system basics', 'Handoff-ready specs'],
    },
    {
        title: 'Web apps & dashboards',
        outcome: 'Custom React experiences built for speed, access, and growth.',
        includes: ['React / Node stacks', 'API integrations', 'Auth & roles', 'Performance polish'],
    },
];

const processSteps = [
    {
        n: '01',
        title: 'Discovery call',
        time: '30–45 min',
        you: 'Goals, audience, budget range, must-haves',
        me: 'Fit check, rough timeline, next steps',
    },
    {
        n: '02',
        title: 'Proposal & kickoff',
        time: '1–3 days',
        you: 'Sign SOW + 50% deposit + share assets',
        me: 'Scope, milestones, shared project board',
    },
    {
        n: '03',
        title: 'Design & build',
        time: '2–8 weeks',
        you: 'Consolidate feedback in writing each round',
        me: 'Wireframes → UI → development → staging',
    },
    {
        n: '04',
        title: 'Launch & handoff',
        time: '1 week',
        you: 'Final approval + content lock',
        me: 'Deploy, training notes, 30-day care window',
    },
];

const packages = [
    {
        name: 'Launch',
        price: 'From $2,400',
        blurb: 'Best for a focused presence — landing page or small brochure site.',
        popular: false,
        items: [
            'Up to 5 pages',
            'Responsive design + build',
            'Contact form & basic SEO setup',
            '2 revision rounds',
            'Typical timeline: 2–4 weeks',
        ],
    },
    {
        name: 'Growth',
        price: 'From $4,800',
        blurb: 'Most small businesses land here — strategy, design, and full build.',
        popular: true,
        items: [
            'Up to 10 pages + blog or CMS',
            'UI/UX + custom front-end',
            'Component system & accessibility pass',
            '2–3 revision rounds',
            'Typical timeline: 4–7 weeks',
        ],
    },
    {
        name: 'Custom',
        price: 'Quote',
        blurb: 'Apps, e-commerce, complex integrations, or multi-stakeholder builds.',
        popular: false,
        items: [
            'Scoped discovery workshop',
            'Custom architecture & APIs',
            'Milestone billing',
            'QA + launch plan',
            'Timeline set after discovery',
        ],
    },
];

const faqs = [
    {
        q: 'Do you start without a contract or deposit?',
        a: 'No. Industry best practice is a signed scope/SOW and a 50% deposit before design or development begins. That protects both of us and keeps the project prioritized.',
    },
    {
        q: 'How many revisions are included?',
        a: 'Launch includes 2 rounds; Growth includes up to 3. A round means consolidated written feedback on a deliverable — not unlimited one-off Slack tweaks. Extra rounds are billed as change requests.',
    },
    {
        q: 'What is a realistic budget in 2026?',
        a: 'Market data for freelance / boutique small-business sites typically lands around $1,500–$8,000 USD (often C$3,000–$15,000 in Canada for fuller scopes). Packages below are starting points; complexity, content readiness, and integrations move the number.',
    },
    {
        q: 'Who owns the files when we finish?',
        a: 'You own the final deliverables and source after final payment. I keep a portfolio right to show the work unless we agree otherwise in the SOW.',
    },
    {
        q: 'Do you include hosting?',
        a: 'Hosting is separate (Netlify, Vercel, Cloudflare, or your host). I set up deployment and hand you credentials. Optional monthly care plans cover updates and small fixes.',
    },
    {
        q: 'How fast do you reply?',
        a: 'Business hours replies within 1 business day. Decisions and approvals live in email or the shared board so nothing gets lost in chat threads.',
    },
];

const ClientGuide = () => {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <section className="cg">
            <div className="cg__hero">
                <div className="container cg__hero-inner">
                    <span className="section__label">Client guide</span>
                    <h1 className="cg__title">
                        How we build
                        <br />
                        together
                    </h1>
                    <p className="cg__lede">
                        Clear process, market-honest pricing, and zero mystery. Built so serious
                        clients know exactly what happens after “let&apos;s talk.”
                    </p>
                    <div className="cg__hero-actions">
                        <a href="#start" className="cg__btn" data-cursor-text="Start">
                            Start a project →
                        </a>
                        <a href="#pricing" className="cg__btn cg__btn--ghost" data-cursor-text="Pricing">
                            See packages
                        </a>
                    </div>
                    <ul className="cg__trust">
                        <li>Reply within 1 business day</li>
                        <li>50% deposit · SOW before build</li>
                        <li>30 days post-launch care</li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="cg__section" id="services">
                    <div className="cg__section-head">
                        <span className="section__label">Services</span>
                        <h2 className="cg__h2">What I help you ship</h2>
                        <p className="cg__muted">
                            Outcomes first — not a laundry list of tech buzzwords.
                        </p>
                    </div>
                    <div className="cg__services">
                        {services.map((s) => (
                            <article className="cg__service" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.outcome}</p>
                                <ul>
                                    {s.includes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="cg__section" id="process">
                    <div className="cg__section-head">
                        <span className="section__label">Process</span>
                        <h2 className="cg__h2">From hello to launch</h2>
                        <p className="cg__muted">
                            Structured onboarding cuts scope creep and keeps timelines real —
                            the same playbook top freelancers use in 2026.
                        </p>
                    </div>
                    <div className="cg__process">
                        {processSteps.map((step) => (
                            <article className="cg__step" key={step.n}>
                                <span className="cg__step-n">{step.n}</span>
                                <div>
                                    <h3>{step.title}</h3>
                                    <span className="cg__step-time">{step.time}</span>
                                    <p>
                                        <strong>You:</strong> {step.you}
                                    </p>
                                    <p>
                                        <strong>Me:</strong> {step.me}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="cg__section" id="ready">
                    <div className="cg__section-head">
                        <span className="section__label">Prep</span>
                        <h2 className="cg__h2">What helps you move faster</h2>
                    </div>
                    <div className="cg__prep">
                        <div>
                            <h3>Bring if you have it</h3>
                            <ul>
                                <li>Business goals &amp; success metrics</li>
                                <li>3–5 reference sites (what you like / dislike)</li>
                                <li>Logo, brand colors, fonts</li>
                                <li>Draft copy or a content outline</li>
                                <li>Must-have features vs nice-to-haves</li>
                            </ul>
                        </div>
                        <div>
                            <h3>How we communicate</h3>
                            <ul>
                                <li>One shared board for files &amp; status</li>
                                <li>Email for decisions · async by default</li>
                                <li>Weekly check-in on longer builds</li>
                                <li>Written feedback per revision round</li>
                                <li>No work starts without deposit + SOW</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="cg__section" id="pricing">
                    <div className="cg__section-head">
                        <span className="section__label">Investment</span>
                        <h2 className="cg__h2">Transparent starting points</h2>
                        <p className="cg__muted">
                            Aligned with 2026 freelance small-business ranges (roughly $1.5k–$8k+
                            for custom work). Final quotes follow discovery — never surprise
                            invoices mid-build.
                        </p>
                    </div>
                    <div className="cg__pricing">
                        {packages.map((pkg) => (
                            <article
                                className={`cg__price ${pkg.popular ? 'cg__price--hot' : ''}`}
                                key={pkg.name}
                            >
                                {pkg.popular && <span className="cg__badge">Most chosen</span>}
                                <h3>{pkg.name}</h3>
                                <p className="cg__amount">{pkg.price}</p>
                                <p className="cg__price-blurb">{pkg.blurb}</p>
                                <ul>
                                    {pkg.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <a href="#start" className="cg__btn cg__btn--small">
                                    Request this →
                                </a>
                            </article>
                        ))}
                    </div>
                    <p className="cg__fine">
                        Payment: 50% to start · 50% before launch (milestone billing on Custom).
                        Prices in USD; CAD quotes available. Content delays pause the clock.
                    </p>
                </div>

                <div className="cg__section" id="faq">
                    <div className="cg__section-head">
                        <span className="section__label">FAQ</span>
                        <h2 className="cg__h2">Straight answers</h2>
                    </div>
                    <div className="cg__faq">
                        {faqs.map((item, i) => (
                            <div
                                className={`cg__faq-item ${openFaq === i ? 'is-open' : ''}`}
                                key={item.q}
                            >
                                <button
                                    type="button"
                                    className="cg__faq-q"
                                    aria-expanded={openFaq === i}
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                >
                                    {item.q}
                                    <span aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                                </button>
                                {openFaq === i && <p className="cg__faq-a">{item.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cg__section" id="start">
                    <div className="cg__section-head">
                        <span className="section__label">Intake</span>
                        <h2 className="cg__h2">Tell me about the project</h2>
                        <p className="cg__muted">
                            Short form — I reply within one business day with fit, next steps, and
                            a rough range.
                        </p>
                    </div>
                    <ClientGuideForm />
                </div>
            </div>
        </section>
    );
};

export default ClientGuide;
