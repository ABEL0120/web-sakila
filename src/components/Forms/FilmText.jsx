import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useFilmText } from "../../hooks/useFilmText";

export default function FilmTextForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredFilmTexts,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useFilmText();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_film_text"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID de Película
          </label>
          <input
            type="number"
            {...register("film_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.film_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

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

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Descripción
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          ></textarea>
        </div>
      </fieldset>
    );
  };

  const childrenColumns = () => {
    return (
      <tr className="bg-gray-800">
        <th className="border border-gray-700 px-4 py-2">ID</th>
        <th className="border border-gray-700 px-4 py-2">Título</th>
        <th className="border border-gray-700 px-4 py-2">Descripción</th>
        <th className="border border-gray-700 px-4 py-2">Acciones</th>
      </tr>
    );
  };

  const childrenFields = (film) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">{film.film_id}</td>
        <td className="border border-gray-700 px-4 py-2">
          {film.title || "Sin título"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {film.description || "Sin descripción"}
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
        Texto de Películas
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Texto de Película
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
        title="Lista de Textos de Películas"
        filteredData={filteredFilmTexts}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
