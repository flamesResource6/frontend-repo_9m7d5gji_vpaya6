import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import AdminPanel from './components/AdminPanel';
import PlayerModal from './components/PlayerModal';

// Example seed data
const seedMovies = [
  {
    id: '1',
    title: 'Edge of Tomorrow',
    description: 'A soldier relives the same day over and over, each time gaining skills to fight aliens.',
    category: 'Action',
    language: 'English',
    thumbnail: 'https://image.tmdb.org/t/p/w500/uUHvlkLavotfGsNtosDy8ShsIYF.jpg',
    driveId: '1J8tYEXAMPLEIDABC',
    previewUrl: 'https://drive.google.com/file/d/1J8tYEXAMPLEIDABC/preview',
  },
  {
    id: '2',
    title: 'Andhadhun',
    description: 'A blind pianist becomes embroiled in a series of mysterious events.',
    category: 'Thriller',
    language: 'Hindi',
    thumbnail: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    driveId: '1XYZ2EXAMPLEIDDEF',
    previewUrl: 'https://drive.google.com/file/d/1XYZ2EXAMPLEIDDEF/preview',
  },
  {
    id: '3',
    title: 'The Grand Budapest Hotel',
    description: 'The adventures of a legendary concierge and his lobby boy.',
    category: 'Comedy',
    language: 'English',
    thumbnail: 'https://image.tmdb.org/t/p/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg',
    driveId: '1LMN3EXAMPLEIDGHI',
    previewUrl: 'https://drive.google.com/file/d/1LMN3EXAMPLEIDGHI/preview',
  },
  {
    id: '4',
    title: 'Jawan',
    description: 'A man is driven by a personal vendetta to rectify the wrongs in society.',
    category: 'Latest',
    language: 'Hindi',
    thumbnail: 'https://image.tmdb.org/t/p/w500/6iJwG4c3aSNR9QHb6oJ2V8Y7x8Y.jpg',
    driveId: '1PQR4EXAMPLEIDJKL',
    previewUrl: 'https://drive.google.com/file/d/1PQR4EXAMPLEIDJKL/preview',
  },
];

const categories = ['Latest', 'Hindi', 'English', 'Action', 'Comedy', 'Drama', 'Thriller'];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [query, setQuery] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [movies, setMovies] = useState(seedMovies);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) =>
      [m.title, m.description, m.category, m.language]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [query, movies]);

  const byCategory = useMemo(() => {
    const map = {};
    for (const cat of categories) {
      map[cat] = filtered.filter((m) => (cat === 'English' || cat === 'Hindi') ? m.language === cat : m.category === cat);
    }
    return map;
  }, [filtered]);

  const handleAdminSubmit = (payload) => {
    setMovies((prev) => [
      { id: String(Date.now()), ...payload },
      ...prev,
    ]);
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar
        query={query}
        setQuery={setQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {showAdmin && (
          <div className="mb-8">
            <AdminPanel onSubmit={handleAdminSubmit} darkMode={darkMode} />
          </div>
        )}

        <MovieGrid title="Latest Movies" movies={byCategory['Latest']} onOpen={setActiveMovie} />
        <MovieGrid title="Hindi Movies" movies={byCategory['Hindi']} onOpen={setActiveMovie} />
        <MovieGrid title="English Movies" movies={byCategory['English']} onOpen={setActiveMovie} />
        <MovieGrid title="Action" movies={byCategory['Action']} onOpen={setActiveMovie} />
        <MovieGrid title="Comedy" movies={byCategory['Comedy']} onOpen={setActiveMovie} />
        <MovieGrid title="Drama" movies={byCategory['Drama']} onOpen={setActiveMovie} />
        <MovieGrid title="Thriller" movies={byCategory['Thriller']} onOpen={setActiveMovie} />
      </main>

      <PlayerModal movie={activeMovie} onClose={() => setActiveMovie(null)} darkMode={darkMode} />
    </div>
  );
}

export default App;
