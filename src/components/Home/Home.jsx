import { useState } from "react";

export default function MovieApp() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const movies = [
    {
      id: 1,
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 9.0,
      year: 2014,
      image: "/images/interstellar.jpg",
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
      description: "Un viaje épico a través del espacio y el tiempo.",
    },
    {
      id: 2,
      title: "John Wick 4",
      genre: "Acción",
      rating: 8.7,
      year: 2023,
      image: "/images/johnwick4.jpg",
      trailer: "https://www.youtube.com/embed/qEVUtrk8_B4",
      description: "John Wick regresa con más acción y venganza imparable.",
    },
    {
      id: 3,
      title: "Oppenheimer",
      genre: "Drama",
      rating: 9.2,
      year: 2023,
      image: "/images/oppenheimer.jpg",
      trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
      description: "La historia del creador de la bomba atómica.",
    },
    {
      id: 4,
      title: "Avatar: The Way of Water",
      genre: "Fantasía",
      rating: 7.8,
      year: 2022,
      image: "/images/avatar2.jpg",
      trailer: "https://www.youtube.com/embed/d9MyW72ELq0",
      description: "La secuela de la película más taquillera de la historia.",
    },
  ];

  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = movies.filter((movie) => {
    return (
      (selectedGenre === "Todos" || movie.genre === selectedGenre) &&
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col bg-black text-white w-full h-full overflow-hidden">
      <header className="flex justify-between items-center p-4 bg-[#141414]">
        <h1 className="text-3xl font-bold text-red-600">Inicio</h1>
      </header>

      <div className="relative w-full h-[500px] bg-[#141414]">
        <img
          src="/images/interstellar.jpg"
          alt="Película destacada"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 bg-black bg-opacity-60">
          <h2 className="text-4xl font-bold">Interstellar</h2>
          <p className="text-lg text-gray-300">
            Un viaje épico a través del espacio y el tiempo.
          </p>
          <button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg">
            Ver más
          </button>
        </div>
      </div>

      <div className="p-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      <div className="flex justify-center mb-6">
        {["Todos", "Sci-Fi", "Acción", "Drama", "Fantasía"].map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`mx-2 px-4 py-2 rounded-lg transition ${
              selectedGenre === genre
                ? "bg-red-600"
                : "bg-[#333] hover:bg-[#444]"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Películas Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
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
                  {movie.rating} | {movie.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Recomendaciones para ti</h2>
        <p className="text-gray-400">
          Basado en tu historial de búsqueda y visualización.
        </p>
        <div className="flex gap-4 overflow-x-auto">
          {filteredMovies.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              className="min-w-[200px] bg-[#141414] rounded-lg overflow-hidden"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">📅 {movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Próximos Estrenos</h2>
        <p className="text-gray-400">Las películas más esperadas.</p>
        <div className="flex gap-4 overflow-x-auto">
          {filteredMovies
            .filter((movie) => movie.year >= 2024)
            .map((movie) => (
              <div
                key={movie.id}
                className="min-w-[200px] bg-[#141414] rounded-lg overflow-hidden"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-300">📅 {movie.year}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Actores Destacados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            "Keanu Reeves",
            "Leonardo DiCaprio",
            "Scarlett Johansson",
            "Tom Hardy",
          ].map((actor, index) => (
            <div key={index} className="bg-[#222] p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">{actor}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
