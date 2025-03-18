import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
export const useCategories = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
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
      name: "",
      last_update: "",
    },
  });

  const addCategory = async (data) => {
    const response = await registerApi(data, "categories");
    if (!response.ok) {
      throw new Error("Error al agregar la categoria.");
    }
    const newCategory = await response.json();
    setCategories((prevCategory) => [...prevCategory, newCategory]);
    setFilteredCategories((prevCategory) => [...prevCategory, newCategory]);
    setError(null);
    alert("Categories agregada exitosamente.");
  };

  const editCategory = async (data) => {
    data.category_id = category.category_id;
    const response = await updateApi(data, "categories", data.category_id);
    if (!response.ok) {
      throw new Error("Error al editar la categoria.");
    }
    const index = filteredCategories.findIndex(
      (f) => f.category_id === data.category_id
    );
    if (index !== -1) {
      const dataFiltered = filteredCategories.map((f) =>
        f.category_id === data.category_id ? { ...f, ...data } : f
      );
      setCategories(dataFiltered);
      setFilteredCategories(dataFiltered);
    }
    alert("Categoria editada exitosamente.");
  };

  const deleteCategory = async (data) => {
    data.category_id = category.category_id;
    const response = await deleteApi(data, "categories", data.category_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la categoria.");
    }
    const dataFiltered = filteredCategories.filter(
      (f) => !(f.category_id === data.category_id)
    );
    setCategories(dataFiltered);
    setFilteredCategories(dataFiltered);
    alert("Categoria eliminada exitosamente.");
  };

  const actionsApi = {
    add: addCategory,
    edit: editCategory,
    delete: deleteCategory,
  };

  const actionsTitles = {
    add: { title: "Agregar Categoria", isDisabled: false },
    edit: { title: "Editar Categoria", isDisabled: false },
    delete: { title: "Borrar Categoria", isDisabled: true },
  };

  useEffect(() => {
    reset({
      name: category.name,
      last_update: category.last_update,
    });
  }, [category, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        if (!response.ok) {
          throw new Error("Error al obtener los categories.");
        }
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        name: data.name,
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar la categoria: " + error.message);
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
      name: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (category, action) => {
    setSearch("");
    setCategory(category);
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
    filteredCategories,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
