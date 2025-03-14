import React from "react";

export default function ModalForms({
  title,
  children,
  modalId = "my_modal_forms",
  onSubmit,
  isLoadingButton,
  size = "max-w-6xl",
  error,
  success,
  isDisabled,
}) {
  return (
    <dialog id={modalId} className="modal">
      <div
        className={`modal-box bg-gray-900 border border-red-600 p-8 rounded-xl shadow-lg ${size}`}
      >
        <div className="pb-5">
          {error && (
            <p className="bg-red-500 text-white text-xs p-3 rounded-md text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-500 text-white text-xs p-3 rounded-md text-center">
              {success}
            </p>
          )}
        </div>
        <form onSubmit={onSubmit} id="modal_form">
          <div className="sticky top-0 flex justify-between items-center bg-gray-900 w-full pb-4 border-b border-red-600">
            <h3 className="font-bold text-xl text-red-500">{title}</h3>
            <div className="flex space-x-2 items-center">
              <button
                type="submit"
                id="btn_save"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                disabled={isLoadingButton}
              >
                {isLoadingButton ? "Cargando..." : "Guardar"}
              </button>
              <button
                type="button"
                className="text-white text-lg bg-transparent hover:text-gray-400"
                onClick={() => document.getElementById(modalId).close()}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-4">{children()}</div>
        </form>
      </div>
    </dialog>
  );
}
