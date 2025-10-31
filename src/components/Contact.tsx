import React, { useState } from 'react';
import { Github, Projector } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID!,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
    ).then(
      (result) => {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I will get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      },
      (error) => {
        toast({
          title: "Error!",
          description: "Your message could not be sent. Please try again later.",
          variant: "destructive"
        });
      }
    );
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
            Contact
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Feel free to reach out for collaboration, job opportunities, or any questions you may have!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-700 mb-6">
              Let's Connect
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              I am open to new projects, job opportunities, or any questions you may have. I will get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Projector size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-slate-700">Email</div>
                  <div className="text-slate-600">yaseminbicer.dev@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Github size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-slate-700">GitHub</div>
                  <div className="text-slate-600">github.com/yaseminbicer</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-slate-700 mb-4">Social Media</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/yaseminbicer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Github size={20} className="text-slate-600" />
                </a>
                <a
                  href="https://x.com/YasemnBicer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-600"><path d="M17.53 2.47a2.75 2.75 0 0 1 3.89 3.89l-5.06 5.06 5.06 5.06a2.75 2.75 0 0 1-3.89 3.89l-5.06-5.06-5.06 5.06a2.75 2.75 0 0 1-3.89-3.89l5.06-5.06-5.06-5.06a2.75 2.75 0 0 1 3.89-3.89l5.06 5.06 5.06-5.06z" /></svg>
                </a>
                <a
                  href="http://linkedin.com/in/yaseminbicer12/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-slate-600"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.87 0-2.156 1.46-2.156 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.76 1.379-1.561 2.838-1.561 3.036 0 3.599 2 3.599 4.591v5.603z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-none bg-white"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600">
            &copy; 2024 Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
