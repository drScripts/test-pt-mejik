import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GETUSER } from "./graphql/queries";
import AdminMiddleware from "./middleware/AdminMiddleware";
import AuthMiddleware from "./middleware/AuthMiddleware";
import MainMiddleware from "./middleware/MainMiddleware";
import {
  AddBookPage,
  AddCategoryPage,
  AddRackPage,
  AdminOrdersPage,
  BooksPage,
  BorrowsPage,
  CategoriesPage,
  DetailBookPage,
  DetailBookPageAdmin,
  DetailBorrowPage,
  EditCategoryPage,
  EditOrderPage,
  EditRackPage,
  HomePage,
  LoginPage,
  RacksPage,
  RegisterPage,
} from "./pages";
import { userSuccessLogin } from "./reducers/root";

export default function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("usrid");

  const { data, refetch } = useQuery(GETUSER);

  useEffect(() => {
    if (userId) {
      refetch({
        id: userId,
      });
    }
  }, [refetch, userId]);

  useEffect(() => {
    if (data) {
      dispatch(
        userSuccessLogin({
          user: data.user,
          token: localStorage.getItem("usrttkn"),
        })
      );
    }
  }, [data, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainMiddleware />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<DetailBookPage />} />
        </Route>
        <Route element={<AuthMiddleware />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/admin" element={<AdminMiddleware />}>
          <Route index element={<AdminOrdersPage />} />
          <Route path="/admin/orders/:id" element={<EditOrderPage />} />
          <Route path="/admin/books" element={<BooksPage />} />
          <Route path="/admin/books/add" element={<AddBookPage />} />
          <Route path="/admin/books/:id" element={<DetailBookPageAdmin />} />
          <Route path="/admin/racks" element={<RacksPage />} />
          <Route path="/admin/racks/add" element={<AddRackPage />} />
          <Route path="/admin/racks/:id" element={<EditRackPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/categories/add" element={<AddCategoryPage />} />
          <Route path="/admin/categories/:id" element={<EditCategoryPage />} />
          <Route path="/admin/borrows" element={<BorrowsPage />} />
          <Route path="/admin/borrows/:id" element={<DetailBorrowPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
