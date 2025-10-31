import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

// Not: TypeScript interface kaldırıldı, JS'de sadece JSDoc ile tip belirtildi
/**
 * @typedef {Object} GitHubRepo
 * @property {number} id
 * @property {string} name
 * @property {string|null} description
 * @property {string} html_url
 * @property {string|null} language
 * @property {number} stargazers_count
 * @property {number} forks_count
 * @property {string} updated_at
 * @property {string} pushed_at
 * @property {string[]} topics
 * @property {string|null} homepage
 */

/**
 * Fetch GitHub repositories for a user
 * @param {string} username
 * @returns {Promise<GitHubRepo[]>}
 */
export const fetchGitHubRepos = async (username) => {
  try {
    console.log('GitHub kullanıcı adı:', username);
    let allRepos = [];
    let page = 1;
    let fetched = 0;
    const perPage = 100;
    while (true) {
      const response = await octokit.rest.repos.listForUser({
        username,
        sort: 'updated',
        per_page: perPage,
        page
      });
      allRepos = allRepos.concat(response.data);
      fetched = response.data.length;
      if (fetched < perPage) break;
      page++;
    }
    console.log('GitHub API yanıtı:', allRepos);
    // Fork olmayan ve belirli şartları sağlayan repoları filtrele
    const filteredRepos = allRepos.filter(repo => 
      repo.description && repo.stargazers_count >= 0
    );
    return filteredRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at || repo.updated_at,
      topics: repo.topics || [],
      homepage: repo.homepage
    }));
  } catch (error) {
    console.error('GitHub repoları alınırken hata:', error);
    throw error;
  }
};

// Demo veriler (GitHub API çalışmazsa kullanılacak)
/**
 * @returns {GitHubRepo[]}
 */
export const getDemoRepos = () => [
  {
    id: 1,
    name: 'portfolio-website',
    description: 'A modern and responsive portfolio website',
    html_url: 'https://github.com/demo/portfolio-website',
    language: 'TypeScript',
    stargazers_count: 42,
    forks_count: 7,
    updated_at: '2024-06-01T12:00:00Z',
    pushed_at: '2024-06-01T12:00:00Z',
    topics: ['portfolio', 'website', 'react'],
    homepage: 'https://yaseminbicer.dev'
  }
  // ... diğer demo projeler
];
