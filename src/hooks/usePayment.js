import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const usePayment = () => {
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [action, setAction] = useState("add");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customer_id: "",
      staff_id: "",
      rental_id: "",
      amount: "",
      payment_date: "",
      last_update: "",
    },
  });

  const addPayment = async (data) => {
    const response = await registerApi(data, "payments");
    if (!response.ok) {
      throw new Error("Error al agregar el pago.");
    }
    const newPayment = await response.json();
    setPayments((prevPayments) => [...prevPayments, newPayment]);
    setFilteredPayments((prevPayments) => [...prevPayments, newPayment]);
    setError(null);
    alert("Pago agregado exitosamente.");
  };

  const editPayment = async (data) => {
    data.payment_id = payment.payment_id;
    const response = await updateApi(data, "payments", data.payment_id);
    if (!response.ok) {
      throw new Error("Error al editar el pago.");
    }
    const updatedPayments = filteredPayments.map((p) =>
      p.payment_id === data.payment_id ? { ...p, ...data } : p
    );
    setPayments(updatedPayments);
    setFilteredPayments(updatedPayments);
    alert("Pago editado exitosamente.");
  };

  const deletePayment = async (data) => {
    data.payment_id = payment.payment_id;
    const response = await deleteApi(data, "payments", data.payment_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el pago.");
    }
    const remainingPayments = filteredPayments.filter(
      (p) => p.payment_id !== data.payment_id
    );
    setPayments(remainingPayments);
    setFilteredPayments(remainingPayments);
    alert("Pago eliminado exitosamente.");
  };

  const actionsApi = {
    add: addPayment,
    edit: editPayment,
    delete: deletePayment,
  };

  const actionsTitles = {
    add: { title: "Agregar Pago", isDisabled: false },
    edit: { title: "Editar Pago", isDisabled: false },
    delete: { title: "Borrar Pago", isDisabled: true },
  };

  useEffect(() => {
    reset({
      customer_id: payment.customer_id,
      staff_id: payment.staff_id,
      rental_id: payment.rental_id,
      amount: payment.amount,
      payment_date: payment.payment_date,
      last_update: payment.last_update,
    });
  }, [payment, reset]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/payments");
        if (!response.ok) {
          throw new Error("Error al obtener los pagos.");
        }
        const data = await response.json();
        setPayments(data);
        setFilteredPayments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter((p) =>
        p.customer_id.toString().includes(search) ||
        p.staff_id.toString().includes(search) ||
        p.amount.toString().includes(search)
      );
      setFilteredPayments(filtered);
    }
  }, [search, payments]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        customer_id: parseInt(data.customer_id),
        staff_id: parseInt(data.staff_id),
        rental_id: data.rental_id ? parseInt(data.rental_id) : null,
        amount: parseFloat(data.amount),
        payment_date: new Date(data.payment_date),
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar el pago: " + error.message);
      setSuccess(null);
    } finally {
      setIsLoadingButton(false);
    }
  });

  const showModal = (show) => {
    show
      ? document.getElementById("my_modal_forms").showModal()
      : document.getElementById("my_modal_forms").close();
  };

  const addModal = () => {
    setSearch("");
    reset({
      customer_id: "",
      staff_id: "",
      rental_id: "",
      amount: "",
      payment_date: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (payment, action) => {
    setSearch("");
    setPayment(payment);
    setAction(action);
    showModal(true);
  };

  return {
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
  };
};
