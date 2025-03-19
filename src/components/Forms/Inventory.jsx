import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useInventory } from "../../hooks/useInventory";

export default function InventoryForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredInventory,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
    films,
    stores, // Asegúrate de que los datos de películas y tiendas estén disponibles
  } = useInventory();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_inventory"
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
            ID de Tienda
          </label>
          <input
            type="number"
            {...register("store_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.store_id && (
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
          <th className="border border-gray-700 px-4 py-2">Película</th>
          <th className="border border-gray-700 px-4 py-2">Tienda</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (item) => {
    // Busca el nombre de la película y la tienda usando sus IDs
    const film = films.find((film) => film.film_id === item.film_id);
    const store = stores.find((store) => store.store_id === item.store_id);

    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {film ? film.title : "Desconocido"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {store ? store.store_id : "Desconocido"}
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
        Inventario
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Inventario
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
        title="Lista de Inventario"
        filteredData={filteredInventory}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
