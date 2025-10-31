
import React from 'react';
import { motion } from 'framer-motion';
import { GitHubRepo } from '@/services/github';
import { Github, Link, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  repo: GitHubRepo;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-600',
      'React': 'bg-cyan-500',
      'Vue': 'bg-green-500',
      'Python': 'bg-green-600',
      'Java': 'bg-red-600',
      'CSS': 'bg-pink-500',
      'HTML': 'bg-orange-500'
    };
    return colors[language || ''] || 'bg-gray-500';
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group h-72 md:h-80 flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-700 group-hover:text-blue-500 transition-colors">
          {repo.name}
        </h3>
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
            title="GitHub'da Görüntüle"
          >
            <Github size={18} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
              title="Canlı Demo"
            >
              <Link size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {repo.description || 'Açıklama bulunmuyor'}
      </p>

      <div className="flex items-center justify-between mb-4">
        {repo.language && (
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
            <span className="text-sm text-slate-600">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🔀 {repo.forks_count}</span>
        </div>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {repo.topics.slice(0, 3).map((topic, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 3 && (
            <span className="text-xs text-slate-500">+{repo.topics.length - 3}</span>
          )}
        </div>
      )}

      <div className="text-xs text-slate-500 mb-4">
        Last updated: {formatDate(repo.pushed_at || repo.updated_at)}
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-sm group/link"
      >
        View Project
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export default ProjectCard;
