import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useCustomers } from "../../hooks/useCostomers";
export default function CustomersForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredCustomers,
    stores,
    addresses,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useCustomers();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_costumers"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID del almacén
          </label>
          <select
            {...register("store_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona un almacén</option>
            {stores.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.manager_staff_id}
              </option>
            ))}
          </select>
          {errors.store_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            {...register("first_name", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Apellidos
          </label>
          <input
            type="text"
            {...register("last_name", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Correo
          </label>
          <input
            type="email"
            {...register("email", { required: false })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID de Direcciones
          </label>
          <select
            {...register("address_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona una dirección</option>
            {addresses.map((address) => (
              <option key={address.address_id} value={address.address_id}>
                {address.address}
              </option>
            ))}
          </select>
          {errors.address_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Activo
          </label>
          <select
            {...register("active", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona una dirección</option>
            {[
              { id: 1, description: "Si", value: true },
              { id: 2, description: "No", value: false },
            ].map((active) => (
              <option key={active.id} value={active.id}>
                {active.description}
              </option>
            ))}
          </select>
          {errors.id && <span className="text-red-500 text-xs">Requerido</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Fecha de Creación
          </label>
          <input
            type="datetime-local"
            {...register("create_date", { required: true })}
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
          <th className="border border-gray-700 px-4 py-2">Nombre</th>
          <th className="border border-gray-700 px-4 py-2">Apellidos</th>
          <th className="border border-gray-700 px-4 py-2">Correo</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (item) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {item.first_name || "Sin Nombre"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {item.last_name || "Sin Apellidos"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {item.email || "Sin Correo"}
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
        Clientes
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar cliente
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
        title="Lista de los Clientes"
        filteredData={filteredCustomers}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
