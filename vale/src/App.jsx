import { useState, useEffect } from 'react';
import CreateLink from './components/CreateLink';
import Question from './components/Question';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('create');

  useEffect(() => {
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#question')) {
        setCurrentPage('question');
      } else {
        setCurrentPage('create');
      }
    };

    // Set initial page
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {currentPage === 'create' ? <CreateLink /> : <Question />}
    </>
  );
}

export default App;
