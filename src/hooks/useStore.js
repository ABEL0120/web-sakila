import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const useStores = () => {
  const [filteredStores, setFilteredStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState({});
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
      manager_staff_id: "",
      address_id: "",
      last_update: "",
    },
  });

  const addStore = async (data) => {
    const response = await registerApi(data, "stores");
    if (!response.ok) {
      throw new Error("Error al agregar la tienda.");
    }
    const newStore = await response.json();
    setStores((prevStores) => [...prevStores, newStore]);
    setFilteredStores((prevStores) => [...prevStores, newStore]);
    setError(null);
    alert("Tienda agregada exitosamente.");
  };

  const editStore = async (data) => {
    data.store_id = store.store_id;
    const response = await updateApi(data, "stores", data.store_id);
    if (!response.ok) {
      throw new Error("Error al editar la tienda.");
    }
    const index = filteredStores.findIndex((s) => s.store_id === data.store_id);
    if (index !== -1) {
      const updatedStores = filteredStores.map((s) =>
        s.store_id === data.store_id ? { ...s, ...data } : s
      );
      setStores(updatedStores);
      setFilteredStores(updatedStores);
    }
    alert("Tienda editada exitosamente.");
  };

  const deleteStore = async (data) => {
    data.store_id = store.store_id;
    const response = await deleteApi(data, "stores", data.store_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la tienda.");
    }
    const updatedStores = filteredStores.filter((s) => s.store_id !== data.store_id);
    setStores(updatedStores);
    setFilteredStores(updatedStores);
    alert("Tienda eliminada exitosamente.");
  };

  const actionsApi = {
    add: addStore,
    edit: editStore,
    delete: deleteStore,
  };

  const actionsTitles = {
    add: { title: "Agregar Tienda", isDisabled: false },
    edit: { title: "Editar Tienda", isDisabled: false },
    delete: { title: "Borrar Tienda", isDisabled: true },
  };

  useEffect(() => {
    reset({
      manager_staff_id: store.manager_staff_id,
      address_id: store.address_id,
      last_update: store.last_update,
    });
  }, [store, reset]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stores");
        if (!response.ok) {
          throw new Error("Error al obtener las tiendas.");
        }
        const data = await response.json();
        setStores(data);
        setFilteredStores(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter((store) =>
        store.manager_staff_id.toString().includes(search)
      );
      setFilteredStores(filtered);
    }
  }, [search, stores]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        manager_staff_id: parseInt(data.manager_staff_id, 10),
        address_id: parseInt(data.address_id, 10),
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar la tienda: " + error.message);
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
      manager_staff_id: "",
      address_id: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (store, action) => {
    setSearch("");
    setStore(store);
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
    filteredStores,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
