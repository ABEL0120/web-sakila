import React from "react";
import ModalForms from "../modalForms";
import TableForms from "../tableForms";
import { usePayment } from "../../hooks/usePayment";

export default function PaymentForms() {
  const {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    errors,
    filteredPayments,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  } = usePayment();

  const childrenModal = () => {
    return (
      <fieldset
        id="fs_payment"
        disabled={actionsTitles[action].isDisabled}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Cliente ID
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
            Staff ID
          </label>
          <input
            type="number"
            {...register("staff_id", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.staff_id && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Rental ID (Opcional)
          </label>
          <input
            type="number"
            {...register("rental_id")}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Monto
          </label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { required: true })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.amount && (
            <span className="text-red-500 text-xs">Requerido</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Fecha de Pago
          </label>
          <input
            type="datetime-local"
            {...register("payment_date", { required: false })}
            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-red-600"
          />
          {errors.payment_date && (
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
          <th className="border border-gray-700 px-4 py-2">Cliente ID</th>
          <th className="border border-gray-700 px-4 py-2">Staff ID</th>
          <th className="border border-gray-700 px-4 py-2">Monto</th>
          <th className="border border-gray-700 px-4 py-2">Fecha de Pago</th>
          <th className="border border-gray-700 px-4 py-2">Acciones</th>
        </tr>
      </>
    );
  };

  const childrenFields = (payment) => {
    return (
      <>
        <td className="border border-gray-700 px-4 py-2">{payment.customer_id}</td>
        <td className="border border-gray-700 px-4 py-2">{payment.staff_id}</td>
        <td className="border border-gray-700 px-4 py-2">${payment.amount}</td>
        <td className="border border-gray-700 px-4 py-2">{new Date(payment.payment_date).toLocaleString()}</td>
      </>
    );
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black pt-20"
      style={{ backgroundImage: "url('/images/netflix-bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Pagos
      </h2>
      <button
        onClick={() => addModal()}
        className="py-2 px-4 bg-red-600 text-white rounded-lg"
      >
        Agregar Pago
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
        title="Lista de Pagos"
        filteredData={filteredPayments}
        search={search}
        setSearch={setSearch}
        tableActions={tableActions}
        childrenColumns={childrenColumns}
        childrenFields={childrenFields}
      />
    </div>
  );
}
