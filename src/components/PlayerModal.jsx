import React from 'react';
import { X } from 'lucide-react';

const PlayerModal = ({ movie, onClose, darkMode }) => {
  if (!movie) return null;
  const src = movie.previewUrl || `https://drive.google.com/file/d/${movie.driveId}/preview`;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 p-4 md:p-8 flex items-center justify-center">
        <div className={`w-full max-w-5xl rounded-lg overflow-hidden shadow-xl ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-sm md:text-base truncate">{movie.title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <X size={18} />
            </button>
          </div>
          <div className="aspect-video w-full bg-black">
            <iframe
              src={src}
              title={movie.title}
              allow="autoplay"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-4 text-sm text-zinc-600 dark:text-zinc-300">
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
