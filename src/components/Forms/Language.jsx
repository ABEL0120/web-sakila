import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredLanguages,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = useLanguage();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_languages"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Nombre del Idioma
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.name && (
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
          <th className="border border-gray-700 px-4 py-2">Nombre</th>
          <th className="border border-gray-700 px-4 py-2">Última Actualización</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (language) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">
          {language.name || "Sin Nombre"}
        </td>
        <td className="border border-gray-700 px-4 py-2">
          {new Date(language.last_update).toLocaleString()}
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
        Idiomas
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Idioma
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
        title="Lista de Idiomas"
        filteredData={filteredLanguages}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
    