import React from 'react';
import { Play } from 'lucide-react';

const MovieCard = ({ movie, onOpen }) => {
  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg border border-transparent hover:border-indigo-500/40 transition bg-white dark:bg-zinc-900 shadow hover:shadow-lg"
      onClick={() => onOpen(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="flex items-center gap-2 rounded-full bg-indigo-600/90 text-white px-3 py-1.5 text-sm font-medium">
            <Play size={16} /> Play
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm line-clamp-1">{movie.title}</h3>
          <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">{movie.language}</span>
        </div>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">{movie.category}</p>
      </div>
    </div>
  );
};

export default MovieCard;
