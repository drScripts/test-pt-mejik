import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const state = useSelector((state) => state.root);

  return !state?.isLogin ? <Outlet /> : <Navigate to={"/"} />;
}
