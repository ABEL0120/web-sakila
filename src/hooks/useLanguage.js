import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";

export const useLanguage = () => {
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState({});
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

  const addLanguage = async (data) => {
    const response = await registerApi(data, "languages");
    if (!response.ok) {
      throw new Error("Error al agregar el idioma.");
    }
    const newLanguage = await response.json();
    setLanguages((prev) => [...prev, newLanguage]);
    setFilteredLanguages((prev) => [...prev, newLanguage]);
    setError(null);
    alert("Idioma agregado exitosamente.");
  };

  const editLanguage = async (data) => {
    data.language_id = language.language_id;
    const response = await updateApi(data, "languages", data.language_id);
    if (!response.ok) {
      throw new Error("Error al editar el idioma.");
    }
    const updatedLanguages = languages.map((l) =>
      l.language_id === data.language_id ? { ...l, ...data } : l
    );
    setLanguages(updatedLanguages);
    setFilteredLanguages(updatedLanguages);
    alert("Idioma editado exitosamente.");
  };

  const deleteLanguage = async (data) => {
    data.language_id = language.language_id;
    const response = await deleteApi(data, "languages", data.language_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el idioma.");
    }
    const updatedLanguages = languages.filter(
      (l) => l.language_id !== data.language_id
    );
    setLanguages(updatedLanguages);
    setFilteredLanguages(updatedLanguages);
    alert("Idioma eliminado exitosamente.");
  };

  const actionsApi = {
    add: addLanguage,
    edit: editLanguage,
    delete: deleteLanguage,
  };

  const actionsTitles = {
    add: { title: "Agregar Idioma", isDisabled: false },
    edit: { title: "Editar Idioma", isDisabled: false },
    delete: { title: "Borrar Idioma", isDisabled: true },
  };

  useEffect(() => {
    reset({
      name: language.name,
      last_update: language.last_update,
    });
  }, [language, reset]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/languages");
        if (!response.ok) {
          throw new Error("Error al obtener los idiomas.");
        }
        const data = await response.json();
        setLanguages(data);
        setFilteredLanguages(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredLanguages(languages);
    } else {
      const filtered = languages.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredLanguages(filtered);
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
      setError("Hubo un problema al enviar el idioma: " + error.message);
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

  const tableActions = (language, action) => {
    setSearch("");
    setLanguage(language);
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
    filteredLanguages,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
