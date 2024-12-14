import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { fetchProducts } from "./state/productsSlice";
import { HashRouter, Route, Routes, Navigate } from "react-router";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
