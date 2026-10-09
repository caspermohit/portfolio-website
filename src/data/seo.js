const origin = 'https://mohitshah.com.np';
const pages = {
    '/': {
        title: 'Mohit Shah | Freelance Web Developer & Digital Designer',
        description: 'Mohit Shah is an independent digital designer and full stack developer. Explore React websites, web applications, UI design, motion studies, and freelance work.',
    },
    '/client-guide/': {
        title: 'Web Design & Development Services | Mohit Shah',
        description: 'Work with Mohit Shah on responsive websites, UI/UX prototypes, React web apps, and dashboards. Explore freelance services, project process, and starting prices.',
    },
};
function structuredData(path) {
    const person = { '@type': 'Person', '@id': `${origin}/#person`, name: 'Mohit Shah', url: `${origin}/`, jobTitle: 'Independent digital designer and full stack developer', email: 'mailto:mohitshah.ms77@gmail.com', sameAs: ['https://github.com/caspermohit', 'https://www.linkedin.com/in/mohitshah7/'], knowsAbout: ['Web development', 'UI design', 'React', 'TypeScript', 'Laravel', 'Motion design'] };
    return { '@context': 'https://schema.org', '@graph': [person, { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'Mohit Shah — Portfolio', publisher: { '@id': person['@id'] } }, { '@type': path === '/' ? 'ProfilePage' : 'WebPage', '@id': `${origin}${path}#page`, url: `${origin}${path}`, name: pages[path].title, description: pages[path].description, inLanguage: 'en', isPartOf: { '@id': `${origin}/#website` }, ...(path === '/' ? { mainEntity: { '@id': person['@id'] } } : { about: { '@id': person['@id'] } }) }] };
}
module.exports = { origin, pages, structuredData };
