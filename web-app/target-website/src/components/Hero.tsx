import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full text-center z-10">
        <div ref={subtitleRef} className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">Digital Craftsmanship</span>
        </div>
        
        <h1 ref={titleRef} className="text-[12vw] md:text-[10vw] font-serif font-bold leading-[0.9] tracking-tighter text-white mb-12">
          CRAFTING <br />
          <span className="italic text-white/40">EMOTIONS</span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-12 text-left">
          <div className="max-w-md">
            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
              We are a boutique creative studio specializing in high-end digital experiences that bridge the gap between art and technology.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-white transition-all duration-500">
              <ArrowDownRight className="text-white group-hover:text-black transition-colors" size={32} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default Hero;