import React from "react";

export default function TableForms({
  title,
  filteredFilms,
  search,
  setSearch,
  tableActions,
  childrenColumns,
  childrenFields,
}) {
  return (
    <>
      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-3xl border border-red-600 mt-6">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          {title}
        </h2>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600 mb-4"
        />

        <table className="w-full text-white border border-gray-700">
          <thead>{childrenColumns()}</thead>
          <tbody>
            {filteredFilms.map((film, index) => (
              <tr key={index} className="bg-gray-900">
                {/* CAMPOS DE MIERDA */}
                {childrenFields(film)}
                {/* ACCIONES */}
                <td className="border border-gray-700 px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => tableActions(film, "edit")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => tableActions(film, "delete")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
