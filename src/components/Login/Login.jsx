"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../utils/auth/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Login/login";
import "../../index.css";

function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.login);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRouter = () => {
    navigate("/Registro");
  };

  const onSubmit = async (data) => {
    try {
      setError(null);
      // const res = await login(data);
      // console.log("login:", res);
      const res = {
        status: true,
        user: { name: "Fernando", email: "email@gmail.com" },
      };
      if (res.status) {
        setUser(res.user);
        navigate("/Session");
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fondoapp.jpg')" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="underline underline-offset-8 text-2xl font-bold mb-4 text-center">
          Iniciar Sesion
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <p className="bg-red-500 text-white text-xs p-3 rounded-md text-center">
              {error.toString()}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@gmail.com"
              className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 border-b-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 border-b-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.password && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <button
            type="submit"
            className="rounded-full w-full flex justify-center py-2 px-4  text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesion
          </button>
          <button
            type="button"
            className="rounded-full w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleRouter}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
