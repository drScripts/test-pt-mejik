import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminMiddleware() {
  const state = useSelector((state) => state.root);

  return state?.user?.role === "STAFF" ? <Outlet /> : <Navigate to={"/"} />;
}
