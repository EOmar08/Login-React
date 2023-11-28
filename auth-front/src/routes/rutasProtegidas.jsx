import { Outlet, Navigate } from "react-router-dom"
// import { useState } from "react";
import { UseAuth } from "../auth/useAuth";

export function RutasProtegidas() {
    const auth = UseAuth()

  return (
    auth.isAuthenticated ? <Outlet /> : <Navigate to="/" /> //Si es verdadero, renderiza el Outlet, si es falso, redirecciona a la ruta especificada
  );
}