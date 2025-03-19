import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useStores } from "../../hooks/useStores";

export default function StoreForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredStores,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useStores();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_stores"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID del Gerente
          </label>
          <input
            type="number"
            {...register("manager_staff_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.manager_staff_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID de Dirección
          </label>
          <input
            type="number"
            {...register("address_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.address_id && (
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
          <th className="border border-gray-700 px-4 py-2">ID del Gerente</th>
          <th className="border border-gray-700 px-4 py-2">ID de Dirección</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (store) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {store.manager_staff_id || "Sin ID"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {store.address_id || "Sin Dirección"}
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
        Tiendas
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Tienda
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
        title="Lista de Tiendas"
        filteredData={filteredStores}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
