import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="p-4 bg-black">
        <Outlet />
      </div>
    </>
  );
}
