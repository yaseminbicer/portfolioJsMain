import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  homepage: string | null;
}

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    console.log('GitHub kullanıcı adı:', username);
    let allRepos: any[] = [];
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
export const getDemoRepos = (): GitHubRepo[] => [
  {
    id: 1,
    name: 'portfolio-website',
    description: 'A modern and responsive portfolio website',
    html_url: 'https://github.com/demo/portfolio-website',
    language: 'TypeScript',
    stargazers_count: 12,
    forks_count: 3,
    updated_at: '2024-01-15T10:30:00Z',
    pushed_at: '2024-01-15T10:30:00Z',
    topics: ['react', 'typescript', 'tailwindcss'],
    homepage: 'https://demo-portfolio.com'
  },
  {
    id: 2,
    name: 'task-manager-app',
    description: 'A task management app built with React',
    html_url: 'https://github.com/demo/task-manager-app',
    language: 'JavaScript',
    stargazers_count: 8,
    forks_count: 2,
    updated_at: '2024-01-10T14:20:00Z',
    pushed_at: '2024-01-10T14:20:00Z',
    topics: ['react', 'javascript', 'css'],
    homepage: null
  },
  {
    id: 3,
    name: 'weather-dashboard',
    description: 'A dashboard app displaying weather information',
    html_url: 'https://github.com/demo/weather-dashboard',
    language: 'TypeScript',
    stargazers_count: 15,
    forks_count: 5,
    updated_at: '2024-01-05T09:15:00Z',
    pushed_at: '2024-01-05T09:15:00Z',
    topics: ['react', 'typescript', 'api'],
    homepage: 'https://weather-demo.com'
  }
];
