import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useFilmActors } from "../../hooks/useFilmActor";

export default function FilmActorsForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredFilmActors,
    actors,
    films,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useFilmActors();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_film_actors"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Actor
          </label>
          <select
            {...register("actor_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona un actor</option>
            {actors.map((actor) => (
              <option key={actor.actor_id} value={actor.actor_id}>
                {actor.first_name} {actor.last_name}
              </option>
            ))}
          </select>
          {errors.actor_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

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
          <th className="border border-gray-700 px-4 py-2">Actor</th>
          <th className="border border-gray-700 px-4 py-2">Película</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (filmActor) => {
    const actor = actors.find((a) => a.actor_id === filmActor.actor_id);
    const film = films.find((f) => f.film_id === filmActor.film_id);

    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {actor ? `${actor.first_name} ${actor.last_name}` : "Desconocido"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {film ? film.title : "Desconocido"}
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
        Relación Actores-Películas
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
        title="Lista de Relaciones Actores-Películas"
        filteredData={filteredFilmActors}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
