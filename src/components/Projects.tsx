
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGitHubRepos, getDemoRepos, GitHubRepo } from '@/services/github';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const githubUsername = 'yaseminbicer';

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['github-repos', githubUsername],
    queryFn: () => fetchGitHubRepos(githubUsername),
    staleTime: 5 * 60 * 1000,
    retry: 1
  });

  let displayRepos = error ? getDemoRepos() : (repos || []);
  displayRepos = displayRepos.slice().sort((a, b) => {
    const dateA = new Date(a.pushed_at || a.updated_at).getTime();
    const dateB = new Date(b.pushed_at || b.updated_at).getTime();
    return dateB - dateA;
  });

  console.log('Projects component - repos:', displayRepos);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  return (
    <section id="projects" className="py-10 md:py-16 bg-slate-100 min-h-screen flex flex-col justify-start">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start">
        <div className="text-center mb-16 mt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
            Projects
          </h2>
        </div>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-slate-600">Projeler yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="text-center mb-8">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-800 text-sm">
                There was a problem accessing the GitHub API. Demo projects are shown.
              </p>
            </div>
          </div>
        )}

        {!isLoading && displayRepos.length === 0 && (
          <div className="text-center">
            <p className="text-slate-600">No projects found yet.</p>
          </div>
        )}

        {/* Pagination State */}
        {(() => {
          const [page, setPage] = React.useState(0);
          const perPage = 3;
          const totalPages = Math.ceil(displayRepos.length / perPage);
          const pagedRepos = displayRepos.slice(page * perPage, (page + 1) * perPage);
          return (
            <>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 min-h-[340px]">
                {pagedRepos.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
                {Array.from({ length: Math.max(0, 3 - pagedRepos.length) }).map((_, idx) => (
                  <div key={idx} className="invisible" />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mb-4">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    disabled={page === 0}
                    className={`px-4 py-2 rounded-lg border ${page === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                  >
                    Prev
                  </button>
                  <span className="px-2 py-2 text-slate-600">{page + 1} / {totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={page === totalPages - 1}
                    className={`px-4 py-2 rounded-lg border ${page === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          );
        })()}

      </div>
    </section>
  );
};

export default Projects;
