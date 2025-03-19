import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const useInventory = () => {
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [films, setFilms] = useState([]); // Lista de películas
  const [stores, setStores] = useState([]); // Lista de tiendas
  const [item, setItem] = useState({});
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
      film_id: "",
      store_id: "",
      last_update: "",
    },
  });

  const addInventory = async (data) => {
    const response = await registerApi(data, "inventory");
    if (!response.ok) {
      throw new Error("Error al agregar el inventario.");
    }
    const newItem = await response.json();
    setInventory((prev) => [...prev, newItem]);
    setFilteredInventory((prev) => [...prev, newItem]);
    setError(null);
    alert("Inventario agregado exitosamente.");
  };

  const editInventory = async (data) => {
    data.inventory_id = item.inventory_id;
    const response = await updateApi(data, "inventory", data.inventory_id);
    if (!response.ok) {
      throw new Error("Error al editar el inventario.");
    }
    const updatedList = inventory.map((inv) =>
      inv.inventory_id === data.inventory_id ? { ...inv, ...data } : inv
    );
    setInventory(updatedList);
    setFilteredInventory(updatedList);
    alert("Inventario editado exitosamente.");
  };

  const deleteInventory = async (data) => {
    data.inventory_id = item.inventory_id;
    const response = await deleteApi(data, "inventory", data.inventory_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el inventario.");
    }
    const updatedList = inventory.filter(
      (inv) => inv.inventory_id !== data.inventory_id
    );
    setInventory(updatedList);
    setFilteredInventory(updatedList);
    alert("Inventario eliminado exitosamente.");
  };

  const actionsApi = {
    add: addInventory,
    edit: editInventory,
    delete: deleteInventory,
  };

  const actionsTitles = {
    add: { title: "Agregar Inventario", isDisabled: false },
    edit: { title: "Editar Inventario", isDisabled: false },
    delete: { title: "Borrar Inventario", isDisabled: true },
  };

  useEffect(() => {
    reset({
      film_id: item.film_id,
      store_id: item.store_id,
      last_update: item.last_update,
    });
  }, [item, reset]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/inventory");
        if (!response.ok) {
          throw new Error("Error al obtener el inventario.");
        }
        const data = await response.json();
        setInventory(data);
        setFilteredInventory(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchFilms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/films");
        if (!response.ok) {
          throw new Error("Error al obtener las películas.");
        }
        const data = await response.json();
        setFilms(data);
      } catch (err) {
        setError(err.message);
      }
    };

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

    fetchInventory();
    fetchFilms();
    fetchStores();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter((inv) => {
        const film = films.find((film) => film.film_id === inv.film_id);
        const store = stores.find((store) => store.store_id === inv.store_id);
        
        const filmTitle = film?.title ? film.title.toLowerCase() : "";
        const storeName = store?.name ? store.name.toLowerCase() : "";
      
        return (
          filmTitle.includes(search.toLowerCase()) || 
          storeName.includes(search.toLowerCase())
        );
      });      
      setFilteredInventory(filtered);
    }
  }, [search, inventory, films, stores]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        film_id: parseInt(data.film_id),
        store_id: parseInt(data.store_id),
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar el inventario: " + error.message);
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
      film_id: "",
      store_id: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (item, action) => {
    setSearch("");
    setItem(item);
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
    filteredInventory,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
    films,
    stores,
  };
};
