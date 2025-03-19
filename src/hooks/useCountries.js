import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
import { formatDateForInput } from "../utils/global";

export const useCountries = () => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
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
      country: "",
      last_update: "",
    },
  });

  const addCountry = async (data) => {
    const response = await registerApi(data, "countries");
    if (!response.ok) {
      throw new Error("Error al agregar el país.");
    }
    const newCountry = await response.json();
    setCountries((prev) => [...prev, newCountry]);
    setFilteredCountries((prev) => [...prev, newCountry]);
    setError(null);
    alert("País agregado exitosamente.");
  };

  const editCountry = async (data) => {
    data.country_id = country.country_id;
    const response = await updateApi(data, "countries", data.country_id);
    if (!response.ok) {
      throw new Error("Error al editar el país.");
    }
    const updatedList = filteredCountries.map((c) =>
      c.country_id === data.country_id ? { ...c, ...data } : c
    );
    setCountries(updatedList);
    setFilteredCountries(updatedList);
    alert("País editado exitosamente.");
  };

  const deleteCountry = async (data) => {
    data.country_id = country.country_id;
    const response = await deleteApi(data, "countries", data.country_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el país.");
    }
    const updatedList = filteredCountries.filter(
      (c) => c.country_id !== data.country_id
    );
    setCountries(updatedList);
    setFilteredCountries(updatedList);
    alert("País eliminado exitosamente.");
  };

  const actionsApi = {
    add: addCountry,
    edit: editCountry,
    delete: deleteCountry,
  };

  const actionsTitles = {
    add: { title: "Agregar País", isDisabled: false },
    edit: { title: "Editar País", isDisabled: false },
    delete: { title: "Borrar País", isDisabled: true },
  };

  useEffect(() => {
    reset({
      country: country.country,
      last_update: formatDateForInput(country.last_update),
    });
  }, [country, reset]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/countries");
        if (!response.ok) {
          throw new Error("Error al obtener los países.");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((c) =>
        c.country.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        country: data.country,
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar el país: " + error.message);
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
      country: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (country, action) => {
    setSearch("");
    setCountry(country);
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
    filteredCountries,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
