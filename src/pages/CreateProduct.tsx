import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/state/store";
import { Product } from "@/types/product";
import { addProduct } from "@/state/productsSlice";
import { ProductForm } from "@/components/ProductForm";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: Omit<Product, "id" | "rating">) => {
    dispatch(
      addProduct({ ...data, id: Date.now(), rating: { rate: 0, count: 0 } }),
    );
    navigate("/products");
  };

  return <ProductForm onSubmit={onSubmit} title="Create New Product" />;
};
