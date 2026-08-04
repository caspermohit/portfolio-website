/**
 * Shipped work mapped from GitHub (caspermohit) + live Netlify / custom hosts.
 * Sorted newest → oldest by last meaningful activity (GitHub pushed_at).
 */

const papers = ['yellow', 'sky', 'mint', 'blush', 'lilac', 'cream'];
const rotates = [-4.5, 3.2, -2.1, 5.4, -5.8, 2.6, -3.4, 4.1, -1.8, 3.8, -4.2, 2.2];

const rawShipped = [
    {
        title: 'Shade & Shine',
        description: 'Detailing & tinting business site — booking-ready marketing presence.',
        technologies: 'TypeScript, React, Netlify',
        live: 'https://carppf.netlify.app/',
        github: 'https://github.com/caspermohit/shadeandshine.ca',
        date: '2026-07-30',
    },
    {
        title: 'E-commerce',
        description: 'Full CRUD storefront frontend paired with a Laravel API.',
        technologies: 'React, JavaScript, Laravel',
        live: 'https://e-commerce-frontend.netlify.app/',
        github: 'https://github.com/caspermohit/e-commerce-frontend',
        githubExtra: 'https://github.com/caspermohit/e-commerce-backend',
        date: '2026-01-17',
    },
    {
        title: 'Expense Tracker',
        description: 'Expense & income workbook — live on Cloudflare Workers.',
        technologies: 'React, TypeScript, Cloudflare Workers',
        live: 'https://expense-tracker.mohitshah-ms77.workers.dev/',
        github: 'https://github.com/caspermohit/expense-tracker',
        githubExtra: 'https://github.com/caspermohit/expense-tracker-backend',
        date: '2026-07-08',
    },
    {
        title: 'Entertainment Review',
        description: 'Movie, TV, and anime discovery — React + TypeScript product UI.',
        technologies: 'React, TypeScript, Vite',
        live: 'https://entertainment-review.netlify.app/',
        github: 'https://github.com/caspermohit/Movie-review',
        date: '2025-08-13',
    },
    {
        title: 'Blog App',
        description: 'Personal blogging front-end deployed on Netlify.',
        technologies: 'PHP, Web App',
        live: 'https://blog-app-app.netlify.app/',
        github: 'https://github.com/caspermohit/blog-app',
        date: '2025-07-31',
    },
    {
        title: 'Secure Notes',
        description: 'Private note-taking app with a focus on secure personal writing.',
        technologies: 'PHP, Web App',
        live: 'https://secure-notes-app.netlify.app/',
        github: 'https://github.com/caspermohit/Secure-Notes-App',
        date: '2025-07-15',
    },
    {
        title: 'Currency Converter',
        description: 'Convert currencies with a simple React interface.',
        technologies: 'PHP, React',
        live: 'https://currency-converter-app.netlify.app/',
        github: 'https://github.com/caspermohit/Currency_Converter-App',
        date: '2025-07-10',
    },
    {
        title: 'Quiz Quest',
        description: 'Interactive quiz app — questions, scoring, and snappy feedback.',
        technologies: 'React, Node.js',
        live: 'https://quiz-quest.netlify.app/',
        github: 'https://github.com/caspermohit/quiz-quest',
        date: '2025-04-11',
    },
    {
        title: 'Weather News',
        description: 'React weather + news dashboard with live conditions and headlines.',
        technologies: 'React, JavaScript, APIs',
        live: 'https://weather-news7-app.netlify.app/',
        github: 'https://github.com/caspermohit/weather-news-app',
        date: '2025-04-09',
    },
    {
        title: 'Multi Converter',
        description: 'Handy unit & format conversion tools in a clean React UI.',
        technologies: 'React, JavaScript',
        live: 'https://multi-converter-app.netlify.app/',
        github: 'https://github.com/caspermohit/conversion-app',
        date: '2025-04-08',
    },
    {
        title: 'Chess Game',
        description: 'Modern chess board with drag-and-drop pieces and polished UI.',
        technologies: 'React, TypeScript, React DnD',
        live: 'https://mchessgame.netlify.app/',
        github: 'https://github.com/caspermohit/chess-game',
        date: '2025-03-25',
    },
    {
        title: 'Sharecare',
        description: 'UX case study for a care platform — research, flows, and interface design.',
        technologies: 'HTML, UX Research, Figma',
        live: 'https://sharecare-case-study.netlify.app/',
        github: 'https://github.com/caspermohit/sharecare-ux-case-study',
        date: '2025-03-03',
    },
    {
        title: 'Valentine Cards',
        description: 'Flip-card Valentine experience — playful micro-interaction UI.',
        technologies: 'JavaScript',
        live: 'https://valentine.netlify.app/',
        github: 'https://github.com/caspermohit/Valentine',
        date: '2025-02-11',
    },
    {
        title: 'AI Voice Chat',
        description: 'Voice-driven chat experience built with modern web APIs.',
        technologies: 'React, JavaScript, Speech APIs',
        live: 'https://ai-voice-chat.netlify.app/',
        github: 'https://github.com/caspermohit/ai-voice-chat',
        date: '2024-10-28',
    },
    {
        title: 'Food Recipe',
        description: 'Browse and cook from recipes in a React recipe explorer.',
        technologies: 'React, JavaScript',
        live: 'https://food-recipe-react.netlify.app/',
        github: 'https://github.com/caspermohit/food-recipe-react',
        date: '2024-10-23',
    },
    {
        title: 'Food Menu',
        description: 'Restaurant-style menu UI built in React.',
        technologies: 'React, JavaScript',
        live: 'https://food-menu-react.netlify.app/',
        github: 'https://github.com/caspermohit/food-menu-react',
        date: '2020-10-31',
    },
    {
        title: 'Snake Game',
        description: 'Classic snake — pure JavaScript fun in the browser.',
        technologies: 'HTML, JavaScript',
        live: 'https://javascript-snakegame.netlify.app/',
        github: 'https://github.com/caspermohit/javascript-snakegame',
        date: '2020-10-28',
    },
    {
        title: 'Todo List',
        description: 'Lightweight task list with vanilla JavaScript.',
        technologies: 'JavaScript, HTML, CSS',
        live: 'https://todo-list-javascript.netlify.app/',
        github: 'https://github.com/caspermohit/todo-list-javascript',
        date: '2020-10-24',
    },
];

/** Sticky notes for creative / non-Netlify work — newest activity first */
export const creativeProjects = [
    {
        code: 'studio/write',
        title: 'Content Writing',
        description: 'SEO and tech articles for gadget audiences.',
        technologies: 'SEO, Copywriting, Blogging',
        paper: 'mint',
        rotate: -2.1,
        date: '2024-05-11',
        links: [
            {
                url: 'https://gogadgets77.wordpress.com/2024/05/11/14-essential-smartphone-accessories-to-elevate-your-tech-game-in-2024/',
                text: 'Essential Accessories · May 2024',
            },
            {
                url: 'https://gogadgets77.wordpress.com/2024/04/19/the-best-fast-chargers-of-2024-a-comprehensive-review/',
                text: 'Best Fast Charger · Apr 2024',
            },
        ],
    },
    {
        code: 'studio/ux',
        title: 'UX / UI',
        description: 'Case studies and product design beyond the shipped apps.',
        technologies: 'Figma, Adobe XD, Sketch',
        paper: 'yellow',
        rotate: -4.5,
        date: '2025-03-03',
        links: [
            { url: 'https://sharecare-case-study.netlify.app/', text: 'Sharecare (live) · 2025' },
            { url: 'https://www.behance.net/gallery/216560557/glu-care', text: 'glu care' },
            { url: 'https://github.com/caspermohit/sharecare-ux-case-study', text: 'Case study repo' },
        ],
    },
    {
        code: 'studio/game',
        title: 'Level Design',
        description: 'Environments and VR-ready game builds.',
        technologies: 'Unity, Unreal, Blender',
        paper: 'blush',
        rotate: 5.4,
        date: '2024-01-01',
        links: [
            { url: 'https://www.behance.net/gallery/215923707/Enviroment-design', text: 'Environment Design' },
            { url: 'https://www.behance.net/gallery/215970037/Game-build-for-VR-devices', text: 'Games Teaser' },
        ],
    },
    {
        code: 'studio/motion',
        title: 'Illustration & Motion',
        description: 'Brand posters, film, and logo explorations.',
        technologies: 'Illustrator, After Effects, Photoshop',
        paper: 'cream',
        rotate: 2.6,
        date: '2023-01-01',
        links: [
            { url: 'https://www.behance.net/gallery/215922739/client-branding-poster', text: 'Client Branding' },
            { url: 'https://www.behance.net/gallery/204814325/360-fliming', text: '360 Film' },
            { url: 'https://www.behance.net/gallery/202959411/Arbys-promotion', text: "Arby's Promotion" },
            { url: 'https://www.behance.net/gallery/215939795/Royal-bank-logo-redesign', text: 'Logo Redesign' },
        ],
    },
].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

/** Extra GitHub repos (no verified Netlify live URL) — newest first */
export const githubOnly = [
    {
        title: 'Talk Chat',
        description: 'Group chat around topics — Laravel backend + React client.',
        github: 'https://github.com/caspermohit/talk-chat-frontend',
        technologies: 'React, PHP, Laravel',
        date: '2025-11-11',
    },
    {
        title: 'Object Detection',
        description: 'Computer-vision experiments in Python.',
        github: 'https://github.com/caspermohit/Object_detection',
        technologies: 'Python',
        date: '2025-03-13',
    },
    {
        title: 'PaLm AI Chatbot',
        description: 'AI chat experiment powered by Google PaLM.',
        github: 'https://github.com/caspermohit/PaLm-AI-chatbot',
        technologies: 'JavaScript, AI',
        date: '2025-01-12',
    },
    {
        title: 'Deccani Nawab',
        description: 'Brand / web project on GitHub.',
        github: 'https://github.com/caspermohit/deccani-nawab',
        technologies: 'JavaScript',
        date: '2024-11-15',
    },
    {
        title: 'Social Media Assistant',
        description: 'Chrome extension to assist social workflows.',
        github: 'https://github.com/caspermohit/social-media-assistant',
        technologies: 'JavaScript, Extension',
        date: '2024-10-28',
    },
].sort((a, b) => b.date.localeCompare(a.date));

export const GITHUB_PROFILE = 'https://github.com/caspermohit';

const formatDateLabel = (iso) => {
    if (!iso) return '';
    const d = new Date(`${iso}T12:00:00`);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const shippedProjects = [...rawShipped]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p, i) => ({
        ...p,
        code: `ship/${String(i + 1).padStart(2, '0')}`,
        paper: papers[i % papers.length],
        rotate: rotates[i % rotates.length],
        dateLabel: formatDateLabel(p.date),
        links: [
            ...(p.live ? [{ url: p.live, text: 'Live demo' }] : []),
            ...(p.github ? [{ url: p.github, text: 'GitHub' }] : []),
            ...(p.githubExtra ? [{ url: p.githubExtra, text: 'API repo' }] : []),
        ],
    }));
