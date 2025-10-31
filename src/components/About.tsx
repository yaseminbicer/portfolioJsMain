
import React from 'react';
import { Square } from 'lucide-react';

const About = () => {
  const [skills, setSkills] = React.useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

React.useEffect(() => {
  // GitHub profil fotoğrafı çek
  fetch('https://api.github.com/users/yaseminbicer')
    .then(res => res.json())
    .then(data => {
      if (data.avatar_url) setAvatarUrl(data.avatar_url);
    });

  fetch('https://raw.githubusercontent.com/yaseminbicer/yaseminbicer/main/README.md')
    .then(res => res.text())
    .then(text => {
      // Sadece Tech Stack bölümünü ayıkla
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
      }
    });
  }, []);

  return (
    <section id="about" className="py-12 min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-16 mt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
            About Me
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            I’m a passionate software engineer with hands-on experience in C#, .NET Framework, and ASP.NET Core Web API. I build efficient and scalable applications using technologies like DevExpress, Entity Framework, SQLite, and MSSQL. I’m also deeply interested in machine learning and artificial intelligence, actively exploring and developing projects in these fields. I enjoy solving problems, improving code performance, and contributing to impactful software projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-center mt-2">
          <div className="flex justify-center">
            <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto md:ml-24">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="GitHub Avatar"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <Square size={160} className="text-blue-500" />
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-3">
            <div className="text-base text-slate-600 mb-1 space-y-0.5">
              <span className="block">Kadıköy, Istanbul</span>
              <span className="block">Phone: (000) 000-0000</span>
              <span className="block">Email: <a href="mailto:yaseminbicer.dev@gmail.com" className="text-blue-600 underline">yaseminbicer.dev@gmail.com</a></span>
              <span className="block">X: <a href="https://x.com/YasemnBicer" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">@YasemnBicer</a></span>
              <span className="block">LinkedIn: <a href="http://linkedin.com/in/yaseminbicer12/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">yaseminbicer12</a></span>
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-700 mb-1">Skills</h4>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
