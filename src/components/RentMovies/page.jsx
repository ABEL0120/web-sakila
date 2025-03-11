import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PaymentModal from "./PaymentModal";
import RentedMovies from "./RentedMovies";

export default function RentMovies() {
  const [moviesForRent, setMoviesForRent] = useState([]);
  const [rentedMovies, setRentedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=es-ES`
    )
      .then((res) => res.json())
      .then((data) => {
        const shuffledMovies = data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 12);
        const movies = shuffledMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          price: `$${(Math.random() * (5.99 - 2.99) + 2.99).toFixed(2)}`,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          rating: movie.vote_average,
          releaseDate: movie.release_date,
        }));
        setMoviesForRent(movies);
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }, []);

  const handleRent = (movie) => {
    if (rentedMovies.some((rented) => rented.id === movie.id)) {
      alert("Ya has rentado esta película.");
      return;
    }
    setSelectedMovie(movie);
    setIsPaying(true);
  };

  const completePayment = (paymentMethod) => {
    if (!paymentMethod) {
      alert("Selecciona un método de pago");
      return;
    }
    setRentedMovies([...rentedMovies, selectedMovie]);
    setIsPaying(false);
    setSelectedMovie(null);
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen p-10 flex flex-col items-center relative">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-red-600 text-center mb-10 tracking-wide uppercase"
      >
        Rentas Exclusivas
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {moviesForRent.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#181818] rounded-xl overflow-hidden shadow-lg transform transition-all hover:shadow-2xl flex flex-col justify-between"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-2">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{movie.description}</p>
              <p className="text-gray-400 text-sm mb-2">
                ⭐ {movie.rating} | 📅 {movie.releaseDate}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-red-500">
                  {movie.price}
                </span>
                <button
                  className="px-3 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all text-white shadow-md"
                  onClick={() => handleRent(movie)}
                >
                  Rentar ahora
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isPaying && (
        <PaymentModal
          movie={selectedMovie}
          onComplete={completePayment}
          setIsPaying={setIsPaying}
        />
      )}

      <RentedMovies rentedMovies={rentedMovies} />
    </div>
  );
}
