import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useAddress } from "../../hooks/useAddress";
export default function AddressForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    cities,
    filteredAddresses,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useAddress();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_address"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Dirección
          </label>
          <input
            type="text"
            {...register("address", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.address && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Dirección 2
          </label>
          <input
            type="text"
            {...register("address2")}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Distrito
          </label>
          <input
            type="text"
            {...register("district", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.district && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            ID de la Ciudad
          </label>
          <select
            {...register("city_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          >
            <option value="">Selecciona una ciudad</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city}
              </option>
            ))}
          </select>
          {errors.language_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Código Postal
          </label>
          <input
            type="text"
            maxLength="10"
            {...register("postal_code")}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Teléfono
          </label>
          <input
            type="text"
            maxLength="20"
            {...register("phone", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Ubicación (Latitud, Longitud)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="0.0001"
              {...register("latitude", { required: false })}
              placeholder="Latitud"
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
            <input
              type="number"
              step="0.001"
              {...register("longitude", { required: false })}
              placeholder="Longitud"
              className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
            />
          </div>
          {errors.latitude && errors.longitude && (
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
          <th className="border border-gray-700 px-4 py-2">Dirección</th>
          <th className="border border-gray-700 px-4 py-2">Distrito</th>
          <th className="border border-gray-700 px-4 py-2">Telefono</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (film) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {film.address || "Sin dirección"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {film.district || "Sin distrito"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {film.phone || "Sin numero de telefono"}
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
        Direcciones
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Dirección
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
        title="Lista de Direcciones"
        filteredData={filteredAddresses}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
