import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { fetchProducts } from "./state/productsSlice";
import { HashRouter, Route, Routes, Navigate } from "react-router";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetails } from "./pages/ProductDetailsPage";
import { CreateProduct } from "./pages/CreateProductPage";
import { EditProduct } from "./pages/EditProductPage";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

window.localStorage.clear();
store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
