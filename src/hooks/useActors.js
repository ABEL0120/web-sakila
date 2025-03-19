import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
import { formatDateForInput } from "../utils/global";
export const useActors = () => {
  const [filteredActors, setFilteredActors] = useState([]);
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState({});
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
      first_name: "",
      last_name: "",
      last_update: "",
    },
  });

  const addActor = async (data) => {
    const response = await registerApi(data, "actors");
    if (!response.ok) {
      throw new Error("Error al agregar el actor.");
    }
    const newActor = await response.json();
    setActors((prevActors) => [...prevActors, newActor]);
    setFilteredActors((prevActors) => [...prevActors, newActor]);
    setError(null);
    alert("Actor agregado exitosamente.");
  };

  const editActor = async (data) => {
    data.actor_id = actor.actor_id;
    const response = await updateApi(data, "actors", data.actor_id);
    if (!response.ok) {
      throw new Error("Error al editar el actor.");
    }
    const index = filteredActors.findIndex((f) => f.actor_id === data.actor_id);
    if (index !== -1) {
      const dataFiltered = filteredActors.map((f) =>
        f.actor_id === data.actor_id ? { ...f, ...data } : f
      );
      setActors(dataFiltered);
      setFilteredActors(dataFiltered);
    }
    alert("Actor editado exitosamente.");
  };

  const deleteActor = async (data) => {
    data.actor_id = actor.actor_id;
    const response = await deleteApi(data, "actors", data.actor_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la actor.");
    }
    const dataFiltered = filteredActors.filter(
      (f) => !(f.actor_id === data.actor_id)
    );
    setActors(dataFiltered);
    setFilteredActors(dataFiltered);
    alert("Actor eliminado exitosamente.");
  };

  const actionsApi = {
    add: addActor,
    edit: editActor,
    delete: deleteActor,
  };

  const actionsTitles = {
    add: { title: "Agregar Actor", isDisabled: false },
    edit: { title: "Editar Actor", isDisabled: false },
    delete: { title: "Borrar Actor", isDisabled: true },
  };

  useEffect(() => {
    reset({
      first_name: actor.first_name,
      last_name: actor.last_name,
      last_update: formatDateForInput(actor.last_update),
    });
  }, [actor, reset]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/actors");
        if (!response.ok) {
          throw new Error("Error al obtener los actores.");
        }
        const data = await response.json();
        setActors(data);
        setFilteredActors(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchActors();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredActors(actors);
    } else {
      const filtered = actors.filter((actor) =>
        actor.first_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredActors(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        first_name: data.first_name,
        last_name: data.last_name,
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar el actor: " + error.message);
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
      first_name: "",
      last_name: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (actor, action) => {
    setSearch("");
    setActor(actor);
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
    filteredActors,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
