import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
