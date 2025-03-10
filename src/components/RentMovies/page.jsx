import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RentMovies() {
  const [rentedMovies, setRentedMovies] = useState([]);

  const moviesForRent = [
    {
      id: 1,
      title: "Dune: Parte Dos",
      price: "$3.99",
      image: "/images/dune2.jpg",
      description:
        "La continuación de la épica historia de Paul Atreides en un mundo desértico lleno de intrigas y poder.",
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      price: "$2.99",
      image: "/images/spiderman.jpg",
      description:
        "El multiverso se descontrola cuando Peter Parker enfrenta a villanos de diferentes realidades.",
    },
    {
      id: 3,
      title: "The Batman",
      price: "$3.49",
      image: "/images/batman.jpg",
      description:
        "Un thriller oscuro y detectivesco con Robert Pattinson como el Caballero de la Noche.",
    },
    {
      id: 4,
      title: "Fast X",
      price: "$2.49",
      image: "/images/fastx.jpg",
      description:
        "La saga de Rápidos y Furiosos alcanza su máximo nivel de adrenalina y velocidad.",
    },
  ];

  const handlePrepareToRent = (movie) => {
    setRentedMovies([...rentedMovies, movie]);
    alert(`Has rentado la película: ${movie.title} por ${movie.price}`);
  };

  const handleRentMovies = () => {
    setRentedMovies([]);
    alert("¡Procesando pago de rentas! Disfruta tus películas.");
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
              <p className="text-sm text-gray-400 mb-4 flex-grow">
                {movie.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-red-500">
                  {movie.price}
                </span>
                <button
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all text-white shadow-md"
                  onClick={() => handlePrepareToRent(movie)}
                >
                  Rentar ahora
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {rentedMovies.length > 0 && (
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
          <button
            className="fixed bottom-5 right-5 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
            onClick={() => handleRentMovies()}
          >
            Pagar Rentas
          </button>
        </div>
      )}
    </div>
  );
}
