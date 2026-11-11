import { mergeGitHubProjects } from './githubProjects';
const repo = (name, extra = {}) => ({ id: name, name, owner: { login: 'caspermohit' }, html_url: `https://github.com/caspermohit/${name}`, pushed_at: '2026-11-06T00:00:00Z', language: 'JavaScript', ...extra });
test('imports new original repositories, deduplicates curated work and excludes forks/hidden/profile repositories', () => {
    const saved = [{ id: 'existing', date: '2026-01-01', github: 'https://github.com/caspermohit/existing', githubExtra: 'https://github.com/caspermohit/backend', title: 'Curated name' }];
    const result = mergeGitHubProjects(saved, [repo('existing'), repo('backend'), repo('new-project'), repo('fork', { fork: true }), repo('archived', { archived: true }), repo('caspermohit'), repo('hidden', { topics: ['portfolio-hidden'] }), repo('other', { owner: { login: 'other' } })]);
    expect(result.map(item => item.title)).toEqual(['New Project', 'Curated name']);
});
test('uses only valid website URLs and never guesses deployments', () => {
    const result = mergeGitHubProjects([], [repo('no-homepage'), repo('unsafe', { homepage: 'javascript:alert(1)' }), repo('valid', { homepage: 'https://example.com' })]);
    expect(result.find(item => item.title === 'No Homepage').live).toBe('');
    expect(result.find(item => item.title === 'Unsafe').links).toHaveLength(1);
    expect(result.find(item => item.title === 'Valid').live).toBe('https://example.com/');
});
