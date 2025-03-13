"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function RegisterFilm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [ratings, setRatings] = useState(["G", "PG", "PG_13", "R", "NC_17"]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/films");
        if (!response.ok) {
          throw new Error("Error al obtener las películas.");
        }
        const data = await response.json();
        setFilms(data);
        setFilteredFilms(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFilms();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/languages");
        if (!response.ok) {
          throw new Error("Error al obtener los idiomas.");
        }
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredFilms(films);
    } else {
      const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFilms(filtered);
    }
  }, [search]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      release_year: "",
      language_id: "",
      original_language_id: "",
      rental_duration: "",
      rental_rate: "",
      length: "",
      replacement_cost: "",
      rating: "",
      special_features: "",
      last_update: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        title: data.title,
        description: data.description,
        release_year: Number(data.release_year),
        language_id: Number(data.language_id),
        original_language_id: Number(data.original_language_id),
        rental_duration: Number(data.rental_duration),
        rental_rate: Number(data.rental_rate),
        length: Number(data.length),
        replacement_cost: Number(data.replacement_cost),
        rating: data.rating,
        special_features: data.special_features,
        last_update: new Date(data.last_update),
      }

      const response = await fetch("http://localhost:3000/api/films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la película.");
      }

      const newFilm = await response.json();
      setFilms((prevFilms) => [...prevFilms, newFilm]);
      setFilteredFilms((prevFilms) => [...prevFilms, newFilm]);
      setError(null);
      setSuccess("Película agregada exitosamente.");
    } catch (error) {
      setError("Hubo un problema al enviar la película: " + error.message);
      setSuccess(null);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black bg-cover bg-center relative mt-20"
      style={{ backgroundImage: "url('/images/netflix-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-red-600">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Agregar Película
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <p className="bg-red-500 text-white text-xs p-3 rounded-md text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-500 text-white text-xs p-3 rounded-md text-center">
              {success}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Título
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">Requerido</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Descripción
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Año de Estreno
            </label>
            <input
              type="number"
              {...register("release_year")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              ID de Idioma
            </label>
            <select
              {...register("language_id", { required: true })}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            >
              <option value="">Selecciona un idioma</option>
              {languages.map((language) => (
                <option key={language.language_id} value={language.language_id}>
                  {language.name}
                </option>
              ))}
            </select>
            {errors.language_id && (
              <span className="text-red-500 text-xs">Requerido</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              ID de Idioma Original
            </label>
            <select
              {...register("original_language_id")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            >
              <option value="">Selecciona un idioma</option>
              {languages.map((language) => (
                <option key={language.language_id} value={language.language_id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Duración del Alquiler (días)
            </label>
            <input
              type="number"
              {...register("rental_duration", { required: true })}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
            {errors.rental_duration && (
              <span className="text-red-500 text-xs">Requerido</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Tarifa de Alquiler ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("rental_rate", { required: true })}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
            {errors.rental_rate && (
              <span className="text-red-500 text-xs">Requerido</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Duración (minutos)
            </label>
            <input
              type="number"
              {...register("length")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Costo de Reemplazo ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("replacement_cost", { required: true })}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
            {errors.replacement_cost && (
              <span className="text-red-500 text-xs">Requerido</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Clasificación
            </label>
            <select
              {...register("rating")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            >
              <option value="">Selecciona una clasificación</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Características Especiales
            </label>
            <input
              type="text"
              {...register("special_features")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Última Actualización
            </label>
            <input
              type="datetime-local"
              {...register("last_update")}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition duration-300 focus:ring-red-500"
          >
            Agregar Película
          </button>
        </form>
      </div>

      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-3xl border border-red-600 mt-6">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Lista de Películas
        </h2>
        <input
          type="text"
          placeholder="Buscar película..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600 mb-4"
        />

        <table className="w-full text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Título</th>
              <th className="border border-gray-700 px-4 py-2">Año</th>
              <th className="border border-gray-700 px-4 py-2">Duración</th>
            </tr>
          </thead>
          <tbody>
            {filteredFilms.map((film, index) => (
              <tr key={index} className="bg-gray-900">
                <td className="border border-gray-700 px-4 py-2">
                  {film.title || "Sin título"}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {film.release_year || "Desconocido"}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {film.length ? `${film.length} min` : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
