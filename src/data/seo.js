const origin = 'https://mohitshah.com.np';
const pages = {
    '/': {
        title: 'Mohit Shah | Web Developer & Designer in Kitchener',
        description: 'Mohit Shah is a freelance web developer and digital designer from Kitchener, Ontario, Canada, who studied at Conestoga College. Explore his work and services.',
    },
    '/client-guide/': {
        title: 'Web Design & Development Services | Mohit Shah',
        description: 'Freelance web design and development with Mohit Shah in Kitchener, Ontario, Canada. Explore responsive websites, UI/UX prototypes, React apps, and project pricing.',
    },
};
function structuredData(path) {
    const person = { '@type': 'Person', '@id': `${origin}/#person`, name: 'Mohit Shah', url: `${origin}/`, jobTitle: 'Independent digital designer and full stack developer', email: 'mailto:mohitshah.ms77@gmail.com', homeLocation: { '@type': 'Place', name: 'Kitchener, Ontario, Canada', address: { '@type': 'PostalAddress', addressLocality: 'Kitchener', addressRegion: 'Ontario', addressCountry: 'CA' } }, alumniOf: { '@type': 'CollegeOrUniversity', name: 'Conestoga College' }, sameAs: ['https://github.com/caspermohit', 'https://www.linkedin.com/in/mohitshah7/'], knowsAbout: ['Web development', 'UI design', 'React', 'TypeScript', 'Laravel', 'Motion design'] };
    return { '@context': 'https://schema.org', '@graph': [person, { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'Mohit Shah — Portfolio', publisher: { '@id': person['@id'] } }, { '@type': path === '/' ? 'ProfilePage' : 'WebPage', '@id': `${origin}${path}#page`, url: `${origin}${path}`, name: pages[path].title, description: pages[path].description, inLanguage: 'en', isPartOf: { '@id': `${origin}/#website` }, ...(path === '/' ? { mainEntity: { '@id': person['@id'] } } : { about: { '@id': person['@id'] } }) }] };
}
module.exports = { origin, pages, structuredData };
