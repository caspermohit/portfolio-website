import catalog from './catalog.json';

export const GITHUB_PROFILE = 'https://github.com/caspermohit';
export const allProjects = catalog.projects;
export const shippedProjects = allProjects.filter(project => project.group === 'Shipped');
export const creativeProjects = allProjects.filter(project => project.group === 'Studio');
export const githubOnly = allProjects.filter(project => project.group === 'Repository');
