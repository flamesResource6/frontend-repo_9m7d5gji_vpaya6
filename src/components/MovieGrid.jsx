import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ title, movies, onOpen }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <section className="mb-8">
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((m) => (
          <MovieCard key={m._id || m.id || m.title} movie={m} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
