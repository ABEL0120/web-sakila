import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MovieApp() {
  const [movies, setMovies] = useState({});
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMoviesByGenre = async (genreId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=es-ES&with_genres=${genreId}`
    );
    const data = await res.json();
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      trailer: `https://www.youtube.com/results?search_query=${movie.title} trailer`,
      description: movie.overview,
    }));
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      const genres = {
        Tendencias: "popular",
        "Lo Más Visto": "top_rated",
        "Nuevas Adiciones": "now_playing",
        Acción: 28,
        Drama: 18,
        "Ciencia Ficción": 878,
        Comedia: 35,
        Terror: 27,
      };
      const moviesByGenre = {};
      for (const [genre, id] of Object.entries(genres)) {
        if (typeof id === "string") {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=es-ES`
          );
          const data = await res.json();
          moviesByGenre[genre] = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            trailer: `https://www.youtube.com/results?search_query=${movie.title} trailer`,
            description: movie.overview,
          }));
        } else {
          moviesByGenre[genre] = await fetchMoviesByGenre(id);
        }
      }
      setMovies(moviesByGenre);
      setFeaturedMovie(
        moviesByGenre["Tendencias"][
          Math.floor(Math.random() * moviesByGenre["Tendencias"].length)
        ]
      );
    };
    fetchAllMovies();
  }, []);

  return (
    <div className="flex flex-col bg-black text-white w-full h-full overflow-hidden pt-20">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-4 bg-[#141414]"
      >
        <h1 className="text-3xl font-bold text-red-600">Inicio</h1>
      </motion.header>

      {featuredMovie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-h-[500px] bg-black flex justify-center items-center"
        >
          <img
            src={featuredMovie.image}
            alt={featuredMovie.title}
            className="w-full max-h-[500px] object-contain opacity-90"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-black bg-opacity-60">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold"
            >
              {featuredMovie.title}
            </motion.h2>
            <p className="text-lg text-gray-300">{featuredMovie.description}</p>
            <a
              href={featuredMovie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg inline-block"
            >
              Ver Trailer
            </a>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-6"
      >
        <h2 className="text-2xl font-bold mb-4">
          Recomendaciones Personalizadas
        </h2>
        <p className="text-gray-400 mb-4">Basado en tu historial y gustos</p>
        <div className="flex gap-4 overflow-x-auto">
          {movies["Drama"]?.slice(0, 5).map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="bg-[#222] rounded-lg overflow-hidden min-w-[200px] cursor-pointer"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">⭐ {movie.rating}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Explora por Categoría</h2>
        {Object.entries(movies).map(([genre, movieList]) => (
          <motion.div key={genre} className="mb-6">
            <h3 className="text-xl font-semibold text-red-600 mb-2">{genre}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movieList.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-[#141414] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-3 bg-black bg-opacity-60">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-300">
                      ⭐ {movie.rating} | 📅 {movie.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedMovie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#141414] p-6 rounded-lg max-w-lg text-center w-full"
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
              className="w-3/4 mx-auto h-auto object-cover rounded-lg mb-4"
            />
            <p className="text-gray-300 text-lg mb-2">
              {selectedMovie.description}
            </p>
            <p className="text-gray-400">
              ⭐ {selectedMovie.rating} | 📅 {selectedMovie.year}
            </p>
            <a
              href={selectedMovie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg inline-block"
            >
              Ver Trailer
            </a>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Noticias y Novedades</h2>
        <div className="bg-[#222] p-4 rounded-lg">
          <p className="text-gray-300">
            🎬 Nueva película anunciada: "Dune 3" se estrenará en 2026.
          </p>
          <p className="text-gray-300">
            🍿 Evento especial de proyección IMAX en cines seleccionados.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
