import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
import { formatDateForInput } from "../utils/global";

export const useCustomers = () => {
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [stores, setStores] = useState([]);
  const [addresses, setAddresses] = useState([]);
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
      store_id: "",
      first_name: "",
      last_name: "",
      email: "",
      address_id: "",
      active: "1",
      create_date: "",
      last_update: "",
    },
  });

  const addCustomer = async (data) => {
    const response = await registerApi(data, "customers");
    if (!response.ok) {
      throw new Error("Error al agregar el cliente.");
    }
    const newCustomer = await response.json();
    setCustomers((prev) => [...prev, newCustomer]);
    setFilteredCustomers((prev) => [...prev, newCustomer]);
    setError(null);
    alert("Cliente agregado exitosamente.");
  };

  const editCustomer = async (data) => {
    data.customer_id = customer.customer_id;
    const response = await updateApi(data, "customers", data.customer_id);
    if (!response.ok) {
      throw new Error("Error al editar el cliente.");
    }
    const updatedList = filteredCustomers.map((c) =>
      c.customer_id === data.customer_id ? { ...c, ...data } : c
    );
    setCustomers(updatedList);
    setFilteredCustomers(updatedList);
    alert("Cliente editado exitosamente.");
  };

  const deleteCustomer = async (data) => {
    data.customer_id = customer.customer_id;
    const response = await deleteApi(data, "customers", data.customer_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el cliente.");
    }
    const updatedList = filteredCustomers.filter(
      (c) => c.customer_id !== data.customer_id
    );
    setCustomers(updatedList);
    setFilteredCustomers(updatedList);
    alert("Cliente eliminado exitosamente.");
  };

  const actionsApi = {
    add: addCustomer,
    edit: editCustomer,
    delete: deleteCustomer,
  };

  const actionsTitles = {
    add: { title: "Agregar Cliente", isDisabled: false },
    edit: { title: "Editar Cliente", isDisabled: false },
    delete: { title: "Borrar Cliente", isDisabled: true },
  };

  useEffect(() => {
    reset({
      store_id: customer.store_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      address_id: customer.address_id,
      active: Number(customer.active),
      create_date: formatDateForInput(customer.create_date),
      last_update: formatDateForInput(customer.last_update),
    });
  }, [customer, reset]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/customers");
        if (!response.ok) {
          throw new Error("Error al obtener los clientes.");
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stores");
        if (!response.ok) {
          throw new Error("Error al obtener las tiendas.");
        }
        const data = await response.json();
        setStores(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/address");
        if (!response.ok) {
          throw new Error("Error al obtener las direcciones.");
        }
        const data = await response.json();
        setAddresses(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((c) =>
        `${c.first_name} ${c.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const addressF = addresses.find(
        (address) => address.address_id === Number(data.address_id)
      );
      const body = {
        store: {
          connect: { store_id: Number(data.store_id) },
        },
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        address: {
          connect: { address_id: Number(data.address_id) },
        },
        active: Boolean(Number(data.active)),
        create_date: new Date(data.create_date || Date.now()),
        last_update: new Date(data.last_update || Date.now()),
      };

      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar el cliente: " + error.message);
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
      store_id: "",
      first_name: "",
      last_name: "",
      email: "",
      address_id: "",
      active: "1",
      create_date: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (customer, action) => {
    setSearch("");
    setCustomer(customer);
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
    filteredCustomers,
    stores,
    addresses,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
