import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CreateLink from './components/CreateLink';
import Valentine from './components/Valentine';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('create');
  const [darkMode, setDarkMode] = useState(false);
  const [urlParams, setUrlParams] = useState({ from: '', to: '', msg: '' });

  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash;
      const search = window.location.search || (hash.includes('?') ? '?' + hash.split('?')[1] : '');
      const params = new URLSearchParams(search);

      const from = params.get('from') || '';
      const to = params.get('to') || '';
      const msg = params.get('msg') || '';

      if (from && to) {
        setUrlParams({ from, to, msg });
        setCurrentPage('valentine');
      } else if (hash.startsWith('#valentine')) {
        setCurrentPage('valentine');
      } else {
        setCurrentPage('create');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <>
      <BackgroundEffects />

      {/* Dark Mode Toggle */}
      <button
        className="dark-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title={darkMode ? 'Light Mode' : 'Dark Mode'}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Music Player */}
      <MusicPlayer />

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {currentPage === 'create' ? (
          <CreateLink key="create" darkMode={darkMode} />
        ) : (
          <Valentine key="valentine" from={urlParams.from} to={urlParams.to} customMsg={urlParams.msg} darkMode={darkMode} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
