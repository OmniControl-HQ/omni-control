import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home.tsx';
import NotFound from './src/pages/NotFound.tsx';
import SmoothScroll from './src/components/SmoothScroll.tsx';

const App: React.FC = () => {
  return (
    <Theme appearance="dark" radius="none" scaling="100%">
      <SmoothScroll>
        <Router>
          <main className="min-h-screen font-sans bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="dark"
            />
          </main>
        </Router>
      </SmoothScroll>
    </Theme>
  );
}

export default App;