import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
import { formatDateForInput } from "../utils/global";
export const useAddress = () => {
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cities, setCities] = useState([]);
  const [address, setAddress] = useState({});
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
      address: "",
      address2: "",
      district: "",
      city_id: "",
      postal_code: "",
      phone: "",
      location: "",
      last_update: "",
    },
  });

  const addAddress = async (data) => {
    const response = await registerApi(data, "address");
    if (!response.ok) {
      throw new Error("Error al agregar la dirección.");
    }
    const newAddress = await response.json();
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setFilteredAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setError(null);
    alert("Dirección agregado exitosamente.");
  };

  const editAddress = async (data) => {
    const response = await updateApi(data, "address", address.address_id);
    data.address_id = address.address_id;
    if (!response.ok) {
      throw new Error("Error al editar la dirección.");
    }
    const index = filteredAddresses.findIndex(
      (f) => f.address_id === data.address_id
    );
    if (index !== -1) {
      const dataFiltered = filteredAddresses.map((f) =>
        f.address_id === data.address_id ? { ...f, ...data } : f
      );
      setAddresses(dataFiltered);
      setFilteredAddresses(dataFiltered);
    }
    alert("Dirección editado exitosamente.");
  };

  const deleteAddress = async (data) => {
    data.address_id = address.address_id;
    const response = await deleteApi(data, "address", data.address_id);
    if (!response.ok) {
      throw new Error("Error al eliminar la dirección.");
    }
    const dataFiltered = filteredAddresses.filter(
      (f) => !(f.address_id === data.address_id)
    );
    setAddresses(dataFiltered);
    setFilteredAddresses(dataFiltered);
    alert("Dirección eliminado exitosamente.");
  };

  const actionsApi = {
    add: addAddress,
    edit: editAddress,
    delete: deleteAddress,
  };

  const actionsTitles = {
    add: { title: "Agregar Dirección", isDisabled: false },
    edit: { title: "Editar Dirección", isDisabled: false },
    delete: { title: "Borrar Dirección", isDisabled: true },
  };

  useEffect(() => {
    reset({
      address: address.address,
      address2: address.address2,
      district: address.district,
      city_id: address.city_id,
      postal_code: address.postal_code,
      phone: address.phone,
      location: address.latitude + address.longitude,
      last_update: formatDateForInput(address.last_update),
    });
  }, [address, reset]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/address");
        if (!response.ok) {
          throw new Error("Error al obtener las direcciones.");
        }
        const data = await response.json();
        setAddresses(data);
        setFilteredAddresses(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cities");
        if (!response.ok) {
          throw new Error("Error al obtener las ciudades.");
        }
        const data = await response.json();
        setCities(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredAddresses(addresses);
    } else {
      const filtered = addresses.filter((address) =>
        address.address.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAddresses(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);
      const latitude = data.latitude;
      const longitude = data.longitude;
      const coordenadas = `POINT(${longitude} ${latitude})`;
      const body = {
        address: data.address,
        address2: data.address2 || null,
        district: data.district,
        city_id: Number(data.city_id),
        location: coordenadas,
        postal_code: data.postal_code || null,
        phone: data.phone,
        // location: Number(19.43),
        last_update: new Date(data.last_update || Date.now()),
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar la direccón: " + error.message);
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

  const tableActions = (address, action) => {
    setSearch("");
    setAddress(address);
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
    cities,
    filteredAddresses,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
