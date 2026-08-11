import React from 'react';
import SmokeCursor from '../components/SmokeCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Studio from '../components/Studio';
import Services from '../components/Services';
import Process from '../components/Process';
import Awards from '../components/Awards';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      <SmokeCursor />
      <Navbar />
      <main>
        <Hero />
        <Studio />
        <Services />
        <Work />
        <Process />
        <Awards />
      </main>
      <Footer />
    </div>
  );
}