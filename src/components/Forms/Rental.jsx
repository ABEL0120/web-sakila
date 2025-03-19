import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useRental } from "../../hooks/useRental";

export default function RentalForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredRentals,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useRental();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_rental"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Fecha de Renta
          </label>
          <input
            type="datetime-local"
            {...register("rental_date", { required: false })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.rental_date && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID de Inventario
          </label>
          <input
            type="number"
            {...register("inventory_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.inventory_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID de Cliente
          </label>
          <input
            type="number"
            {...register("customer_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.customer_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Fecha de Devolución
          </label>
          <input
            type="datetime-local"
            {...register("return_date")}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
        </div>
      </fieldset>
    );
  };

  const childrenColumns = () => {
    return (
      <tr className="bg-gray-800">
        <th className="border border-gray-700 px-4 py-2">Fecha de Renta</th>
        <th className="border border-gray-700 px-4 py-2">ID Inventario</th>
        <th className="border border-gray-700 px-4 py-2">ID Cliente</th>
        <th className="border border-gray-700 px-4 py-2">Acciones</th>
      </tr>
    );
  };

  const childrenFields = (rental) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">{rental.rental_date}</td>
        <td className="border border-gray-700 px-4 py-2">{rental.inventory_id}</td>
        <td className="border border-gray-700 px-4 py-2">{rental.customer_id}</td>
      </>
    );
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black pt-20"
      style={{ backgroundImage: "url('/images/netflix-bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Rentas
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Renta
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
        title="Lista de Rentas"
        filteredData={filteredRentals}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
