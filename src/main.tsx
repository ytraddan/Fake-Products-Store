import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { HashRouter, Route, Routes, Navigate } from "react-router";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { CreateProduct } from "./pages/CreateProduct";
import { EditProduct } from "./pages/EditProduct";
import { fetchProducts } from "./state/productsSlice";
import "./index.css";

store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
