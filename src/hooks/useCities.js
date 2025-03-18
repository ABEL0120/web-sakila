import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
export const useCities = () => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [countries, setCountries] = useState([]);
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
      city: "",
      country_id: "",
      last_update: "",
    },
  });

  const addCity = async (data) => {
    const response = await registerApi(data, "cities");
    if (!response.ok) {
      throw new Error("Error al agregar la ciudad.");
    }
    const newCity = await response.json();
    setCities((prevCities) => [...prevCities, newCity]);
    setFilteredCities((prevCities) => [...prevCities, newCity]);
    setError(null);
    alert("Ciudad agregada exitosamente.");
  };

  const editCity = async (data) => {
    data.city_id = city.city_id;
    const response = await updateApi(data, "cities", data.city_id);
    if (!response.ok) {
      throw new Error("Error al editar la ciudad.");
    }
    const index = filteredCities.findIndex((f) => f.city_id === data.city_id);
    if (index !== -1) {
      const dataFiltered = filteredCities.map((f) =>
        f.city_id === data.city_id ? { ...f, ...data } : f
      );
      setCities(dataFiltered);
      setFilteredCities(dataFiltered);
    }
    alert("Ciudad editada exitosamente.");
  };

  const deleteCity = async (data) => {
    data.city_id = city.city_id;
    const response = await deleteApi(data, "cities", data.city_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la ciudad.");
    }
    const dataFiltered = filteredCities.filter(
      (f) => !(f.city_id === data.city_id)
    );
    setCities(dataFiltered);
    setFilteredCities(dataFiltered);
    alert("Ciudad eliminada exitosamente.");
  };

  const actionsApi = {
    add: addCity,
    edit: editCity,
    delete: deleteCity,
  };

  const actionsTitles = {
    add: { title: "Agregar Ciudad", isDisabled: false },
    edit: { title: "Editar Ciudad", isDisabled: false },
    delete: { title: "Borrar Ciudad", isDisabled: true },
  };

  useEffect(() => {
    reset({
      city: city.city,
      country_id: city.country_id,
      last_update: city.last_update,
    });
  }, [city, reset]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cities");
        if (!response.ok) {
          throw new Error("Error al obtener las ciudades.");
        }
        const data = await response.json();
        setCities(data);
        setFilteredCities(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/countries");
        if (!response.ok) {
          throw new Error("Error al obtener los paises.");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredCities(cities);
    } else {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const body = {
        city: data.city,
        country_id: parseInt(data.country_id),
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar la ciudad: " + error.message);
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
      city: "",
      country_id: "",
      last_update: "",
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (city, action) => {
    setSearch("");
    setCity(city);
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
    filteredCities,
    countries,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
