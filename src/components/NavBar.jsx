import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Home,
  Film,
  Settings,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className="bg-[#141414] text-white shadow-md fixed top-0 left-0 w-full z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Botón para abrir el Sidebar */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white text-2xl block"
            >
              <Menu />
            </button>

            {/* Logo */}
            <div className="text-2xl font-bold text-red-600">NetfliXXX</div>

            {/* Menú Desktop */}
            <div className="hidden lg:flex space-x-6 items-center">
              <Link to="/Home" className="hover:text-red-600 transition">
                Inicio
              </Link>
              <Link to="/contacto" className="hover:text-red-600 transition">
                Contacto
              </Link>
            </div>

            {/* Iconos de Perfil y Logout */}
            <div className="hidden lg:flex space-x-4">
              <Link to="/perfil" className="hover:text-red-600 transition">
                <User />
              </Link>
              <Link to="/logout" className="hover:text-red-600 transition">
                <LogOut />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR ADMINLTE STYLE */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-[#222] text-white shadow-lg z-[150] flex flex-col"
          >
            {/* Header Sidebar */}
            <div className="flex items-center justify-between p-4 bg-[#181818]">
              <h2 className="text-lg font-bold">AdminLTE 3</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white text-xl"
              >
                <X />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#181818]">
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/300"
                  className="rounded-full w-8 h-8"
                  alt="perfil"
                />
                <span className="font-semibold">Alexander Pierce</span>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="p-3">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 bg-[#333] text-white rounded-md pl-10"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Menú Sidebar */}
            <ul className="space-y-2 px-3">
              <li className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md cursor-pointer">
                <Home className="w-5 h-5" />
                <Link to="/Home">Inicio</Link>
              </li>

              {/* Dropdown Catálogos */}
              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:text-red-600 transition w-full p-2 rounded-md"
                >
                  <Film className="w-5 h-5" />
                  Catálogos
                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    className="ml-auto"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-800 text-white ml-6 rounded-md"
                    >
                      <li className="px-4 py-2 hover:bg-red-700">
                        <Link to="/Films">Films</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-red-700">
                        <Link to="/Actors">Actors</Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md cursor-pointer">
                <Settings className="w-5 h-5" />
                <Link to="/servicios">Servicios</Link>
              </li>
              <li className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md cursor-pointer">
                <Link to="/contacto">Contacto</Link>
              </li>
              <li className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md cursor-pointer">
                <LogOut className="w-5 h-5" />
                <Link to="/logout">Cerrar sesión</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
