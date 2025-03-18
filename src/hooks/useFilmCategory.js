import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const useFilmCategories = () => {
  const [filteredFilmCategories, setFilteredFilmCategories] = useState([]);
  const [filmCategories, setFilmCategories] = useState([]);
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filmCategory, setFilmCategory] = useState({});
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
      category_id: "",
      last_update: "",
    },
  });

  const addFilmCategory = async (data) => {
    const response = await registerApi(data, "film_categories");
    if (!response.ok) {
      throw new Error("Error al agregar la relación película-categoría.");
    }
    const newFilmCategory = await response.json();
    setFilmCategories((prev) => [...prev, newFilmCategory]);
    setFilteredFilmCategories((prev) => [...prev, newFilmCategory]);
    setError(null);
    alert("Relación agregada exitosamente.");
  };

  const editFilmCategory = async (data) => {
    data.film_id = filmCategory.film_id;
    data.category_id = filmCategory.category_id;
    const response = await updateApi(data, "film_categories", data.film_id);
    if (!response.ok) {
      throw new Error("Error al editar la relación película-categoría.");
    }
    const index = filteredFilmCategories.findIndex(
      (f) => f.film_id === data.film_id && f.category_id === data.category_id
    );
    if (index !== -1) {
      const updatedList = filteredFilmCategories.map((f) =>
        f.film_id === data.film_id && f.category_id === data.category_id
          ? { ...f, ...data }
          : f
      );
      setFilmCategories(updatedList);
      setFilteredFilmCategories(updatedList);
    }
    alert("Relación editada exitosamente.");
  };

  const deleteFilmCategory = async (data) => {
    data.film_id = filmCategory.film_id;
    data.category_id = filmCategory.category_id;
    const response = await deleteApi(data, "film_categories", data.film_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la relación película-categoría.");
    }
    const updatedList = filteredFilmCategories.filter(
      (f) => !(f.film_id === data.film_id && f.category_id === data.category_id)
    );
    setFilmCategories(updatedList);
    setFilteredFilmCategories(updatedList);
    alert("Relación eliminada exitosamente.");
  };

  const actionsApi = {
    add: addFilmCategory,
    edit: editFilmCategory,
    delete: deleteFilmCategory,
  };

  const actionsTitles = {
    add: { title: "Agregar Relación Película-Categoría", isDisabled: false },
    edit: { title: "Editar Relación", isDisabled: false },
    delete: { title: "Eliminar Relación", isDisabled: true },
  };

  useEffect(() => {
    reset({
      film_id: filmCategory.film_id,
      category_id: filmCategory.category_id,
      last_update: filmCategory.last_update,
    });
  }, [filmCategory, reset]);

  useEffect(() => {
    const fetchFilmCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/film_categories"
        );
        if (!response.ok) {
          throw new Error(
            "Error al obtener las relaciones película-categoría."
          );
        }
        const data = await response.json();
        setFilmCategories(data);
        setFilteredFilmCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFilmCategories();
  }, []);

  useEffect(() => {
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
    fetchFilms();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías.");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredFilmCategories(filmCategories);
    } else {
      const filtered = filmCategories.filter(
        (fc) =>
          films
            .find((film) => film.film_id === fc.film_id)
            ?.title.toLowerCase()
            .includes(search.toLowerCase()) ||
          categories
            .find((cat) => cat.category_id === fc.category_id)
            ?.name.toLowerCase()
            .includes(search.toLowerCase())
      );
      setFilteredFilmCategories(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        film_id: parseInt(data.film_id),
        category_id: parseInt(data.category_id),
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar la relación: " + error.message);
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
    reset({
      film_id: "",
      category_id: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (filmCategory, action) => {
    setFilmCategory(filmCategory);
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
    filteredFilmCategories,
    films,
    categories,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
