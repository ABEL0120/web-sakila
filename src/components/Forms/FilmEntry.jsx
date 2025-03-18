import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useFilmEntry } from "../../hooks/useFilmEntry";
export default function RegisterFilm() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    languages,
    ratings,
    errors,
    filteredFilms,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useFilmEntry();
  
  const childrenModal = () => {
    return (
      <fieldset
        id="fs_films"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
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
      </fieldset>
    );
  };

  const childrenColumns = () => {
    return (
      <>
        <tr className="bg-gray-800">
          <th className="border border-gray-700 px-4 py-2">Título</th>
          <th className="border border-gray-700 px-4 py-2">Año</th>
          <th className="border border-gray-700 px-4 py-2">Duración</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (film) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {film.title || "Sin título"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {film.release_year || "Desconocido"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {film.length ? `${film.length} min` : "N/A"}
        </td>
      </>
    );
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black pt-20"
      style={{ backgroundImage: "url('/images/netflix-bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Películas
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Película
      </button>
      <ModalForms
        title={actionsTitles[action].title}
        children={childrenModal}
        modalId="my_modal_forms"
        onSubmit={onSubmit}
        isLoadingButton={isLoadingButton}
        success={success}
        error={error}
      />
      <TableForms
        title="Lista de Películas"
        filteredData={filteredFilms}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
