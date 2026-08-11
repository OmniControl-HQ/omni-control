import React from 'react';
import { Github, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black pt-32 pb-12 px-6 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <div>
            <h2 className="text-6xl md:text-8xl font-serif text-white leading-tight mb-12">
              LET'S CREATE <br />
              <span className="italic text-white/40">TOGETHER</span>
            </h2>
            <a 
              href="mailto:hello@aetheric.studio" 
              className="text-2xl md:text-4xl font-light text-white hover:text-white/60 transition-colors flex items-center gap-4 group"
            >
              hello@aetheric.studio
              <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" size={32} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#work" className="text-white/60 hover:text-white transition-colors">Work</a></li>
                <li><a href="#studio" className="text-white/60 hover:text-white transition-colors">Studio</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-8">Social</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><Instagram size={16} /> Instagram</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><Twitter size={16} /> Twitter</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors flex items-center gap-2"><Github size={16} /> Github</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
            © 2026 AETHERIC STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;