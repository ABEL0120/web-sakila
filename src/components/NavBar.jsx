import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#141414] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-red-600">NetfliXXX</div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/Home" className="hover:text-red-600 transition">
              Inicio
            </Link>
            <Link to="/Renta" className="hover:text-red-600 transition">
              Renta
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center hover:text-red-600 transition"
              >
                Catálogos <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-8 left-0 bg-gray-800 text-white w-48 shadow-md rounded-md">
                  <Link
                    to="/accion"
                    className="block px-4 py-2 hover:bg-red-700"
                  >
                    Acción
                  </Link>
                  <Link
                    to="/sci-fi"
                    className="block px-4 py-2 hover:bg-red-700"
                  >
                    Sci-Fi
                  </Link>
                  <Link
                    to="/drama"
                    className="block px-4 py-2 hover:bg-red-700"
                  >
                    Drama
                  </Link>
                  <Link
                    to="/fantasia"
                    className="block px-4 py-2 hover:bg-red-700"
                  >
                    Fantasía
                  </Link>
                </div>
              )}
            </div>
            <Link to="/servicios" className="hover:text-red-600 transition">
              Servicios
            </Link>
            <Link to="/contacto" className="hover:text-red-600 transition">
              Contacto
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4">
          <Link to="/Home" className="block py-2 px-4 hover:bg-gray-700">
            Inicio
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block w-full text-left py-2 px-4 hover:bg-gray-700 flex justify-between"
            >
              Catálogos <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="bg-gray-900 text-white w-full rounded-md">
                <Link to="/accion" className="block px-4 py-2 hover:bg-red-700">
                  Acción
                </Link>
                <Link to="/sci-fi" className="block px-4 py-2 hover:bg-red-700">
                  Sci-Fi
                </Link>
                <Link to="/drama" className="block px-4 py-2 hover:bg-red-700">
                  Drama
                </Link>
                <Link
                  to="/fantasia"
                  className="block px-4 py-2 hover:bg-red-700"
                >
                  Fantasía
                </Link>
              </div>
            )}
          </div>
          <Link to="/renta" className="block py-2 px-4 hover:bg-gray-700">
            Renta
          </Link>
          <Link to="/servicios" className="block py-2 px-4 hover:bg-gray-700">
            Servicios
          </Link>
          <Link to="/contacto" className="block py-2 px-4 hover:bg-gray-700">
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
