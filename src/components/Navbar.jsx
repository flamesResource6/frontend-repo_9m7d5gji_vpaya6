import React from 'react';
import { Film, Search, Moon, Sun, Plus } from 'lucide-react';

const Navbar = ({ query, setQuery, darkMode, setDarkMode, showAdmin, setShowAdmin }) => {
  return (
    <header className={`sticky top-0 z-40 w-full border-b ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-zinc-200'} backdrop-blur`}> 
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          <Film className={darkMode ? 'text-white' : 'text-zinc-900'} size={24} />
          <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-zinc-900'}`}>DriveFlix</span>
        </div>

        <div className="flex-1 flex items-center">
          <div className={`flex items-center gap-2 rounded-md px-3 py-2 w-full max-w-md ${darkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-100 text-zinc-700'}`}>
            <Search size={18} className="opacity-70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, categories, languages..."
              className={`w-full bg-transparent outline-none text-sm placeholder:opacity-70 ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => setShowAdmin((v) => !v)}
            className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
            title={showAdmin ? 'Hide Admin' : 'Open Admin'}
          >
            <Plus size={16} /> {showAdmin ? 'Close Admin' : 'Add Movie'}
          </button>
          <button
            onClick={() => setDarkMode((v) => !v)}
            className={`p-2 rounded-md border transition ${darkMode ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-100'}`}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-zinc-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
