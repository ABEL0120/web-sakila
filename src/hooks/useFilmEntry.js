import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
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
    const response = await registerApi(data, "films");
    if (!response.ok) {
      throw new Error("Error al agregar la película.");
    }
    const newFilm = await response.json();
    setFilms((prevFilms) => [...prevFilms, newFilm]);
    setFilteredFilms((prevFilms) => [...prevFilms, newFilm]);
    setSearch(""); // Reinicia el término de búsqueda
    setError(null);
    alert("Película agregada exitosamente.");
  };

  const editFilm = async (data) => {
    try {
      data.film_id = film.film_id; // Asegúrate de incluir el ID de la película
      const response = await updateApi(data, "films", data.film_id);
      if (!response.ok) {
        throw new Error("Error al editar la película.");
      }

      // Actualiza la lista completa de películas
      const updatedFilm = await response.json();
      setFilms((prevFilms) =>
        prevFilms.map((f) =>
          f.film_id === updatedFilm.film_id ? updatedFilm : f
        )
      );

      // Sincroniza `filteredFilms` en función del término de búsqueda actual
      setFilteredFilms((prevFiltered) =>
        search === ""
          ? [
              ...films.map((f) =>
                f.film_id === updatedFilm.film_id ? updatedFilm : f
              ),
            ]
          : films
              .map((f) => (f.film_id === updatedFilm.film_id ? updatedFilm : f))
              .filter((film) =>
                film.title.toLowerCase().includes(search.toLowerCase())
              )
      );

      setError(null);
      alert("Película editada exitosamente.");
    } catch (error) {
      setError("Hubo un problema al editar la película: " + error.message);
    }
  };

  const deleteFilm = async (data) => {
    data.film_id = film.film_id;
    const response = await deleteApi(data, "films", data.film_id);
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
  }, [search, films]); // Agrega `films` como dependencia

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
