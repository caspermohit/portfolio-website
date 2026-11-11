const safeWebsite = value => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
};

export function mergeGitHubProjects(saved, repositories) {
    const represented = new Set(saved.flatMap(project => [project.github, project.githubExtra]).filter(Boolean).map(url => url.toLowerCase().replace(/\/$/, '')));
    const added = repositories.filter(repo => repo.owner?.login?.toLowerCase() === 'caspermohit' && !repo.fork && !repo.archived && !repo.disabled && !repo.topics?.includes('portfolio-hidden') && !['caspermohit', '.github'].includes(repo.name.toLowerCase()) && !represented.has(repo.html_url.toLowerCase().replace(/\/$/, ''))).map(repo => {
        const live = safeWebsite(repo.homepage);
        return { id: `github-${repo.id}`, title: repo.name.replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, letter => letter.toUpperCase()), description: repo.description || 'A code project from my GitHub collection. Explore the repository for the details.', technologies: repo.language || 'Code', github: repo.html_url, live, date: (repo.pushed_at || repo.created_at).slice(0, 10), group: 'Repository', source: 'GitHub', links: [{ url: repo.html_url, text: 'Source code' }, ...(live ? [{ url: live, text: 'Visit website' }] : [])] };
    });
    return [...saved, ...added].sort((a, b) => b.date.localeCompare(a.date));
}
