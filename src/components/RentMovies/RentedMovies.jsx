import React from "react";

export default function RentedMovies({ rentedMovies }) {
  return (
    rentedMovies.length > 0 && (
      <div className="mt-10 w-full max-w-5xl relative">
        <h2 className="text-3xl font-bold text-white mb-4">
          Tus Películas Rentadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentedMovies.map((movie, index) => (
            <div
              key={index}
              className="bg-[#222] rounded-lg p-4 flex items-center gap-4"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
