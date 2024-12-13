import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/state/store";
import {
  deleteProduct,
  toggleFavorite,
} from "@/state/productsSlice";
import { Product } from "@/types/product";



export const useProductActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = (product: Product) => {
    dispatch(deleteProduct(product.id));
    navigate("/products");
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return {
    handleDelete,
    handleToggleFavorite,
  };
};
