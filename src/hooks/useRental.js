import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const useRental = () => {
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [rental, setRental] = useState({});
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
      rental_date: "",
      inventory_id: "",
      customer_id: "",
      return_date: "",
      staff_id: "",
    },
  });

  const addRental = async (data) => {
    const response = await registerApi(data, "rentals");
    if (!response.ok) {
      throw new Error("Error al agregar el alquiler.");
    }
    const newRental = await response.json();
    setRentals((prevRentals) => [...prevRentals, newRental]);
    setFilteredRentals((prevRentals) => [...prevRentals, newRental]);
    setError(null);
    alert("Alquiler agregado exitosamente.");
  };

  const editRental = async (data) => {
    data.rental_id = rental.rental_id;
    const response = await updateApi(data, "rentals", data.rental_id);
    if (!response.ok) {
      throw new Error("Error al editar el alquiler.");
    }
    const updatedRentals = rentals.map((r) =>
      r.rental_id === data.rental_id ? { ...r, ...data } : r
    );
    setRentals(updatedRentals);
    setFilteredRentals(updatedRentals);
    alert("Alquiler editado exitosamente.");
  };

  const deleteRental = async (data) => {
    data.rental_id = rental.rental_id;
    const response = await deleteApi(data, "rentals", data.rental_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el alquiler.");
    }
    const filteredData = rentals.filter((r) => r.rental_id !== data.rental_id);
    setRentals(filteredData);
    setFilteredRentals(filteredData);
    alert("Alquiler eliminado exitosamente.");
  };

  const actionsApi = {
    add: addRental,
    edit: editRental,
    delete: deleteRental,
  };

  const actionsTitles = {
    add: { title: "Agregar Alquiler", isDisabled: false },
    edit: { title: "Editar Alquiler", isDisabled: false },
    delete: { title: "Borrar Alquiler", isDisabled: true },
  };

  useEffect(() => {
    reset({
      rental_date: rental.rental_date,
      inventory_id: rental.inventory_id,
      customer_id: rental.customer_id,
      return_date: rental.return_date,
      staff_id: rental.staff_id,
    });
  }, [rental, reset]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rentals");
        if (!response.ok) {
          throw new Error("Error al obtener los alquileres.");
        }
        const data = await response.json();
        setRentals(data);
        setFilteredRentals(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRentals();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredRentals(rentals);
    } else {
      const filtered = rentals.filter((rental) =>
        rental.customer_id.toString().includes(search)
      );
      setFilteredRentals(filtered);
    }
  }, [search, rentals]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        rental_date: new Date(data.rental_date),
        inventory_id: parseInt(data.inventory_id),
        customer_id: parseInt(data.customer_id),
        return_date: data.return_date ? new Date(data.return_date) : null,
        staff_id: parseInt(data.staff_id),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al procesar el alquiler: " + error.message);
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
      rental_date: "",
      inventory_id: "",
      customer_id: "",
      return_date: "",
      staff_id: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (rental, action) => {
    setSearch("");
    setRental(rental);
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
    filteredRentals,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
