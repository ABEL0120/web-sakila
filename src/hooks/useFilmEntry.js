import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { delFilm, registerFilm, updateFilm } from "../utils/Forms/filmEntry";
export const useFilmEntry = () => {
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState({});
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState(["G", "PG", "PG_13", "R", "NC_17"]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [action, setAction] = useState("add");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      release_year: "",
      language_id: "",
      original_language_id: "",
      rental_duration: "",
      rental_rate: "",
      length: "",
      replacement_cost: "",
      rating: "",
      special_features: "",
      last_update: "",
    },
  });

  const addFilm = async (data) => {
    const response = await registerFilm(data);
    if (!response.ok) {
      throw new Error("Error al agregar la película.");
    }
    const newFilm = await response.json();
    setFilms((prevFilms) => [...prevFilms, newFilm]);
    setFilteredFilms((prevFilms) => [...prevFilms, newFilm]);
    setError(null);
    alert("Película agregada exitosamente.");
  };

  const editFilm = async (data) => {
    data.film_id = film.film_id;
    const response = await updateFilm(data);
    if (!response.ok) {
      throw new Error("Error al editar la película.");
    }
    const index = filteredFilms.findIndex((f) => f.film_id === data.film_id);
    if (index !== -1) {
      const dataFiltered = filteredFilms.map((f) =>
        f.film_id === data.film_id ? { ...f, ...data } : f
      );
      setFilms(dataFiltered);
      setFilteredFilms(dataFiltered);
    }
    alert("Película editada exitosamente.");
  };

  const deleteFilm = async (data) => {
    data.film_id = film.film_id;
    const response = await delFilm(data);
    if (!response.ok) {
      throw new Error("Error al eliminar la película.");
    }
    const dataFiltered = filteredFilms.filter(
      (f) => !(f.film_id === data.film_id)
    );
    setFilms(dataFiltered);
    setFilteredFilms(dataFiltered);
    alert("Película eliminada exitosamente.");
  };

  const actionsApi = {
    add: addFilm,
    edit: editFilm,
    delete: deleteFilm,
  };

  const actionsTitles = {
    add: { title: "Agregar Película", isDisabled: false },
    edit: { title: "Editar Película", isDisabled: false },
    delete: { title: "Borrar Película", isDisabled: true },
  };

  useEffect(() => {
    reset({
      title: film.title,
      description: film.description,
      release_year: film.release_year,
      language_id: film.language_id,
      original_language_id: film.original_language_id,
      rental_duration: film.rental_duration,
      rental_rate: film.rental_rate,
      length: film.length,
      replacement_cost: film.replacement_cost,
      rating: film.rating,
      special_features: film.special_features,
      last_update: film.last_update,
    });
  }, [film, reset]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/films");
        if (!response.ok) {
          throw new Error("Error al obtener las películas.");
        }
        const data = await response.json();
        setFilms(data);
        setFilteredFilms(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFilms();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/languages");
        if (!response.ok) {
          throw new Error("Error al obtener los idiomas.");
        }
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredFilms(films);
    } else {
      const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFilms(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        title: data.title,
        description: data.description,
        release_year: Number(data.release_year),
        language_id: Number(data.language_id),
        original_language_id: Number(data.original_language_id),
        rental_duration: Number(data.rental_duration),
        rental_rate: Number(data.rental_rate),
        length: Number(data.length),
        replacement_cost: Number(data.replacement_cost),
        rating: data.rating,
        special_features: data.special_features,
        last_update: new Date(data.last_update || Date.now()),
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
    reset({
      title: "",
      description: "",
      release_year: "",
      language_id: "",
      original_language_id: "",
      rental_duration: "",
      rental_rate: "",
      length: "",
      replacement_cost: "",
      rating: "",
      special_features: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (film, action) => {
    setFilm(film);
    setAction(action);
    showModal(true);
  };

  return {
    setSearch,
    tableActions,
    addModal,
    onSubmit,
    register,
    languages,
    ratings,
    errors,
    filteredFilms,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
