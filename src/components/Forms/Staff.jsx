import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useStaff } from "../../hooks/useStaff";

export default function StaffForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredStaff,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useStaff();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_staff"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            {...register("first_name", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Apellido
          </label>
          <input
            type="text"
            {...register("last_name", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Usuario
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.username && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password", { required: false })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}    
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Dirección ID
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
            Tienda ID
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
      </fieldset>
    );
  };

  const childrenColumns = () => {
    return (
      <>
        <tr className="bg-gray-800">
          <th className="border border-gray-700 px-4 py-2">Nombre</th>
          <th className="border border-gray-700 px-4 py-2">Apellido</th>
          <th className="border border-gray-700 px-4 py-2">Usuario</th>
          <th className="border border-gray-700 px-4 py-2">Tienda ID</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (staff) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">{staff.first_name}</td>
        <td className="border border-gray-700 px-4 py-2">{staff.last_name}</td>
        <td className="border border-gray-700 px-4 py-2">{staff.username}</td>
        <td className="border border-gray-700 px-4 py-2">{staff.store_id}</td>
      </>
    );
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black pt-20"
      style={{ backgroundImage: "url('/images/netflix-bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Empleados
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Empleado
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
        title="Lista de Empleados"
        filteredData={filteredStaff}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
