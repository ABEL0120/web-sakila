import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useFilmCategories } from "../../hooks/useFilmCategory";

export default function FilmCategoryForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredFilmCategories,
    films,
    categories,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useFilmCategories();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_film_category"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Película
          </label>
          <select
            {...register("film_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona una película</option>
            {films.map((film) => (
              <option key={film.film_id} value={film.film_id}>
                {film.title}
              </option>
            ))}
          </select>
          {errors.film_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Categoría
          </label>
          <select
            {...register("category_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div className="col-span-2">
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
          <th className="border border-gray-700 px-4 py-2">Película</th>
          <th className="border border-gray-700 px-4 py-2">Categoría</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (filmCategory) => {
    const filmTitle =
      films.find((film) => film.film_id === filmCategory.film_id)?.title ||
      "Desconocido";
    const categoryName =
      categories.find((cat) => cat.category_id === filmCategory.category_id)
        ?.name || "Desconocido";

    return (
      <>
        <td className="border border-gray-700 px-4 py-2">{filmTitle}</td>
        <td className="border border-gray-700 px-4 py-2">{categoryName}</td>
      </>
    );
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black pt-20"
      style={{ backgroundImage: "url('/images/netflix-bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Relación Películas-Categorías
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Relación
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
        title="Lista de Relaciones"
        filteredData={filteredFilmCategories}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
