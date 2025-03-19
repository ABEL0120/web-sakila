import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi } from "../utils/Forms/api";
import { formatDateForInput } from "../utils/global";

export const useFilmActors = () => {
  const [filteredFilmActors, setFilteredFilmActors] = useState([]);
  const [filmActors, setFilmActors] = useState([]);
  const [actors, setActors] = useState([]);
  const [films, setFilms] = useState([]);
  const [filmActor, setFilmActor] = useState({});
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
      actor_id: "",
      film_id: "",
      last_update: "",
    },
  });

  const addFilmActor = async (data) => {
    const response = await registerApi(data, "film_actors");
    if (!response.ok) {
      throw new Error("Error al agregar la relación actor-película.");
    }
    const newFilmActor = await response.json();
    setFilmActors((prev) => [...prev, newFilmActor]);
    setFilteredFilmActors((prev) => [...prev, newFilmActor]);
    setError(null);
    alert("Relación agregada exitosamente.");
  };

  const deleteFilmActor = async (data) => {
    const response = await deleteApi(data, "film_actors");
    if (!response.ok) {
      throw new Error("Error al eliminar la relación actor-película.");
    }
    const dataFiltered = filteredFilmActors.filter(
      (f) => !(f.actor_id === data.actor_id && f.film_id === data.film_id)
    );
    setFilmActors(dataFiltered);
    setFilteredFilmActors(dataFiltered);
    alert("Relación eliminada exitosamente.");
  };

  const actionsApi = {
    add: addFilmActor,
    delete: deleteFilmActor,
  };

  const actionsTitles = {
    add: { title: "Agregar Relación", isDisabled: false },
    delete: { title: "Eliminar Relación", isDisabled: true },
  };

  useEffect(() => {
    reset({
      actor_id: filmActor.actor_id,
      film_id: filmActor.film_id,
      last_update: formatDateForInput(filmActor.last_update),
    });
  }, [filmActor, reset]);

  useEffect(() => {
    const fetchFilmActors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/film_actors");
        if (!response.ok) {
          throw new Error("Error al obtener las relaciones actor-película.");
        }
        const data = await response.json();
        setFilmActors(data);
        setFilteredFilmActors(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFilmActors();
  }, []);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/actors");
        if (!response.ok) {
          throw new Error("Error al obtener los actores.");
        }
        const data = await response.json();
        setActors(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchActors();
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
    if (search === "") {
      setFilteredFilmActors(filmActors);
    } else {
      const filtered = filmActors.filter(
        (fa) =>
          actors
            .find((actor) => actor.actor_id === fa.actor_id)
            ?.name.toLowerCase()
            .includes(search.toLowerCase()) ||
          films
            .find((film) => film.film_id === fa.film_id)
            ?.title.toLowerCase()
            .includes(search.toLowerCase())
      );
      setFilteredFilmActors(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        actor_id: Number(data.actor_id),
        film_id: Number(data.film_id),
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
    setSearch("");
    reset({
      actor_id: "",
      film_id: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (filmActor, action) => {
    setSearch("");
    setFilmActor(filmActor);
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
    filteredFilmActors,
    actors,
    films,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
