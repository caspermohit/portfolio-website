import { useEffect, useState } from 'react';
import { allProjects } from '../data/projects';
import { mergeGitHubProjects } from '../data/githubProjects';

export default function useProjectCatalog() {
    const [projects, setProjects] = useState(allProjects);
    useEffect(() => {
        const controller = new AbortController();
        async function sync() {
            try {
                const repositories = [];
                for (let page = 1; page <= 10; page += 1) {
                    const response = await fetch(`https://api.github.com/users/caspermohit/repos?sort=pushed&per_page=100&page=${page}`, { signal: controller.signal });
                    if (!response.ok) return;
                    const batch = await response.json();
                    if (!Array.isArray(batch)) return;
                    repositories.push(...batch);
                    if (batch.length < 100) break;
                }
                if (!controller.signal.aborted) setProjects(mergeGitHubProjects(allProjects, repositories));
            } catch { /* Keep the saved catalog available when GitHub is unavailable. */ }
        }
        sync();
        return () => controller.abort();
    }, []);
    return projects;
}
