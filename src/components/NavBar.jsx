import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#141414] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-red-600">NetfliXXX</div>

          <div className="hidden md:flex space-x-6">
            <Link to="/Home" className="hover:text-red-600 transition">
              Inicio
            </Link>
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
        <div className="md:hidden bg-gray-800 text-white">
          <Link to="/Home" className="block py-2 px-4 hover:bg-gray-700">
            Inicio
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
