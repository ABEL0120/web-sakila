import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const useFilmText = () => {
  const [filteredFilmTexts, setFilteredFilmTexts] = useState([]);
  const [filmTexts, setFilmTexts] = useState([]);
  const [filmText, setFilmText] = useState({});
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
      title: "",
      description: "",
    },
  });

  const addFilmText = async (data) => {
    const response = await registerApi(data, "film_text");
    if (!response.ok) {
      throw new Error("Error al agregar la película.");
    }
    const newFilmText = await response.json();
    setFilmTexts((prevFilmTexts) => [...prevFilmTexts, newFilmText]);
    setFilteredFilmTexts((prevFilmTexts) => [...prevFilmTexts, newFilmText]);
    setError(null);
    alert("Película agregada exitosamente.");
  };

  const editFilmText = async (data) => {
    data.film_id = filmText.film_id;
    const response = await updateApi(data, "film_text", data.film_id);
    if (!response.ok) {
      throw new Error("Error al editar la película.");
    }
    const index = filteredFilmTexts.findIndex(
      (f) => f.film_id === data.film_id
    );
    if (index !== -1) {
      const dataFiltered = filteredFilmTexts.map((f) =>
        f.film_id === data.film_id ? { ...f, ...data } : f
      );
      setFilmTexts(dataFiltered);
      setFilteredFilmTexts(dataFiltered);
    }
    alert("Película editada exitosamente.");
  };

  const deleteFilmText = async (data) => {
    data.film_id = filmText.film_id;
    const response = await deleteApi(data, "film_text", data.film_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la película.");
    }
    const dataFiltered = filteredFilmTexts.filter(
      (f) => !(f.film_id === data.film_id)
    );
    setFilmTexts(dataFiltered);
    setFilteredFilmTexts(dataFiltered);
    alert("Película eliminada exitosamente.");
  };

  const actionsApi = {
    add: addFilmText,
    edit: editFilmText,
    delete: deleteFilmText,
  };

  const actionsTitles = {
    add: { title: "Agregar Texto de Película", isDisabled: false },
    edit: { title: "Editar Texto de Película", isDisabled: false },
    delete: { title: "Borrar Texto de Película", isDisabled: true },
  };

  useEffect(() => {
    reset({
      film_id: filmText.film_id,
      title: filmText.title,
      description: filmText.description,
    });
  }, [filmText, reset]);

  useEffect(() => {
    const fetchFilmTexts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/film_text");
        if (!response.ok) {
          throw new Error("Error al obtener las películas.");
        }
        const data = await response.json();
        setFilmTexts(data);
        setFilteredFilmTexts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFilmTexts();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredFilmTexts(filmTexts);
    } else {
      const filtered = filmTexts.filter((film) =>
        film.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFilmTexts(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        film_id: Number(data.film_id),
        title: data.title,
        description: data.description || null,
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar la película: " + error.message);
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
      title: "",
      description: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (filmText, action) => {
    setSearch("");
    setFilmText(filmText);
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
    filteredFilmTexts,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
