"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { registrarse } from "../../utils/Register/register";
import { useNavigate } from "react-router-dom";
import "../../index.css";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
    },
  });
  const hanldeRouter = () => {
    navigate("/");
  };
  const onSubmit = async (data) => {
    try {
      const res = await registrarse(data);
      if (res.status) {
        navigate("/");
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/fondoapp.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Registro
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <p className="bg-red-500 text-white text-xs p-3 rounded-md text-center">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              {...register("nombre", { required: true })}
              placeholder="Tu nombre completo"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.nombre && (
              <span className="text-red-500 text-xs">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@gmail.com"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-lg text-blue-600 font-semibold border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={hanldeRouter}
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </button>
        </form>
      </div>
    </div>
  );
}
