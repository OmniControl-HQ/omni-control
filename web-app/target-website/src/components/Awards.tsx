import React from 'react';
import { motion } from 'framer-motion';

const awards = [
  { year: "2024", title: "Site of the Year", organization: "Awwwards", project: "Lumina Essence" },
  { year: "2023", title: "Mobile Excellence", organization: "FWA", project: "Obsidian Arch" },
  { year: "2023", title: "Best Visual Design", organization: "CSS Design Awards", project: "Velvet Void" },
  { year: "2022", title: "Innovation Award", organization: "Awwwards", project: "Aetheric Studio" },
];

const Awards: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Recognition</h2>
          <p className="text-5xl md:text-7xl font-serif text-white">Accolades</p>
        </div>

        <div className="border-t border-white/10">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4"
            >
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <span className="text-sm font-mono text-white/30">{award.year}</span>
                <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:translate-x-2 transition-transform duration-500">
                  {award.title}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">{award.organization}</span>
                <span className="text-sm italic text-white/60">{award.project}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;