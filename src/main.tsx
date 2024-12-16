import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { fetchProducts } from "./state/productsSlice";
import { HashRouter, Route, Routes, Navigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import CatalogPage from "./pages/CatalogPage";
import ViewPage from "./pages/ViewPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import "./index.css";

store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ViewPage />} />
          <Route path="/create-product" element={<CreatePage />} />
          <Route path="/products/:id/edit" element={<EditPage />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
