import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteApi, registerApi, updateApi } from "../utils/Forms/api";
import bcrypt from "bcryptjs";

export const useStaff = () => {
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [staff, setStaff] = useState([]);
  const [staffMember, setStaffMember] = useState({});
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
      email: "",
      username: "",
      password: "",
      active: true,
      last_update: "",
      address_id: "",
      store_id: "",
      staff_id: "",
      picture: null,
    },
  });

  const addStaff = async (data) => {
    const response = await registerApi(data, "staff");
    if (!response.ok) {
      throw new Error("Error al agregar el empleado.");
    }
    const newStaff = await response.json();
    setStaff((prevStaff) => [...prevStaff, newStaff]);
    setFilteredStaff((prevStaff) => [...prevStaff, newStaff]);
    setError(null);
    alert("Empleado agregado exitosamente.");
  };

  const editStaff = async (data) => {
    data.staff_id = staffMember.staff_id;
    const response = await updateApi(data, "staff", data.staff_id);
    if (!response.ok) {
      throw new Error("Error al editar el empleado.");
    }
    const index = filteredStaff.findIndex((s) => s.staff_id === data.staff_id);
    if (index !== -1) {
      const updatedStaff = filteredStaff.map((s) =>
        s.staff_id === data.staff_id ? { ...s, ...data } : s
      );
      setStaff(updatedStaff);
      setFilteredStaff(updatedStaff);
    }
    alert("Empleado editado exitosamente.");
  };

  const deleteStaff = async (data) => {
    data.staff_id = staffMember.staff_id;
    const response = await deleteApi(data, "staff", data.staff_id);
    if (!response.ok) {
      throw new Error("Error al eliminar el empleado.");
    }
    const updatedStaff = filteredStaff.filter(
      (s) => s.staff_id !== data.staff_id
    );
    setStaff(updatedStaff);
    setFilteredStaff(updatedStaff);
    alert("Empleado eliminado exitosamente.");
  };

  const actionsApi = {
    add: addStaff,
    edit: editStaff,
    delete: deleteStaff,
  };
  
  const actionsTitles = {
    add: { title: "Agregar Personal", isDisabled: false },
    edit: { title: "Editar Personal", isDisabled: false },
    delete: { title: "Borrar Personal", isDisabled: true },
  };

  useEffect(() => {
    reset({
      first_name: staffMember.first_name,
      last_name: staffMember.last_name,
      email: staffMember.email,
      username: staffMember.username,
      password: "",
      active: staffMember.active,
      last_update: staffMember.last_update,
      address_id: staffMember.address_id,
      store_id: staffMember.store_id,
      picture: staffMember.picture,
    });
  }, [staffMember, reset]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/staff");
        if (!response.ok) {
          throw new Error("Error al obtener los empleados.");
        }
        const data = await response.json();
        setStaff(data);
        setFilteredStaff(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredStaff(staff);
    } else {
      const filtered = staff.filter((member) =>
        member.first_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredStaff(filtered);
    }
  }, [search]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoadingButton(true);

      const hashedPassword = await bcrypt.hash(data.password, 10)

      const body = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        active: data.active,
        last_update: new Date(data.last_update || Date.now()),
        address_id: parseInt(data.address_id),
        store_id: parseInt(data.store_id),
        picture: data.picture,
      };
      const apiFunction = actionsApi[action];
      await apiFunction(body);
      showModal(false);
    } catch (error) {
      setError("Hubo un problema al enviar el empleado: " + error.message);
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
      email: "",
      username: "",
      password: "",
      active: true,
      last_update: "",
      address_id: "",
      store_id: "",
      staff_id: "",
      picture: null,
    });
    setAction("add");
    showModal(true);
  };

  const tableActions = (staffMember, action) => {
    setSearch("");
    setStaffMember(staffMember);
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
    filteredStaff,
    search,
    action,
    actionsTitles,
    isLoadingButton,
    success,
    error,
  };
};
