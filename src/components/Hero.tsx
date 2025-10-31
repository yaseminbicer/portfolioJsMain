
import React from 'react';
import { Github, Layout, Projector } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchGitHubRepos, getDemoRepos } from '@/services/github';

const Hero = () => {
  // Project count from GitHub
  const githubUsername = 'yaseminbicer';
  const { data: repos, isLoading: isReposLoading, error: reposError } = useQuery({
    queryKey: ['github-repos', githubUsername],
    queryFn: () => fetchGitHubRepos(githubUsername),
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
  const displayRepos = reposError ? getDemoRepos() : (repos || []);
  const projectCount = displayRepos.length;

  // Skills count from README.md
  const [skills, setSkills] = React.useState<string[]>([]);
  const [skillsLoading, setSkillsLoading] = React.useState(true);
  const [skillsError, setSkillsError] = React.useState<string | null>(null);
  React.useEffect(() => {
    setSkillsLoading(true);
    fetch('https://raw.githubusercontent.com/yaseminbicer/yaseminbicer/main/README.md')
      .then(res => res.text())
      .then(text => {
        const techStackSection = (() => {
          const start = text.indexOf('# 💻 Tech Stack:');
          if (start === -1) return '';
          const rest = text.slice(start);
          const nextHeaderIdx = rest.indexOf('\n#', 1);
          return nextHeaderIdx !== -1 ? rest.slice(0, nextHeaderIdx) : rest;
        })();
        if (techStackSection) {
          const badgeLabelRegex = /!\[(.*?)\]\(https:\/\/img\.shields\.io\/badge.*?\)/g;
          let match;
          let found: string[] = [];
          while ((match = badgeLabelRegex.exec(techStackSection)) !== null) {
            found.push(match[1]);
          }
          setSkills(Array.from(new Set(found.filter(Boolean))));
        } else {
          setSkills([]);
        }
        setSkillsLoading(false);
        setSkillsError(null);
      })
      .catch((err) => {
        setSkills([]);
        setSkillsLoading(false);
        setSkillsError('Could not fetch skills');
      });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <Layout size={48} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-700 mb-6">
            Hi, I'm <span className="text-blue-500">Yasemin</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            I’m passionate about artificial intelligence and machine learning, and enjoy exploring new technologies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Projector size={20} />
            View My Projects
          </button>
          <a 
            href="https://github.com/yaseminbicer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-700 border border-slate-300 px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            <Github size={20} />
            GitHub Profile
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-500 mb-2">1abou+</div>
            <div className="text-slate-600">Years Experience</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {isReposLoading ? <span className="animate-pulse">...</span> : reposError ? '—' : `${projectCount}+`}
            </div>
            <div className="text-slate-600">Completed Projects</div>
            {reposError && <div className="text-xs text-red-400 mt-1">Error loading projects</div>}
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {skillsLoading ? <span className="animate-pulse">...</span> : skillsError ? '—' : `${skills.length}+`}
            </div>
            <div className="text-slate-600">Technologies</div>
            {skillsError && <div className="text-xs text-red-400 mt-1">Error loading skills</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
