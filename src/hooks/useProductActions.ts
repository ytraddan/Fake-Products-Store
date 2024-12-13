import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/state/store";
import { Product } from "@/types/product";
import { toast } from "sonner";
import {
  deleteProduct,
  toggleFavorite,
  addProduct,
} from "@/state/productsSlice";

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const useProductActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = (product: Product) => {
    dispatch(deleteProduct(product.id));
    navigate("/products");
    toast("Deleted", {
      description: `"${truncate(product.title, 20)}" has been removed`,
      action: {
        label: "Undo",
        onClick: () => {
          dispatch(addProduct(product));
        },
      },
    });
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return {
    handleDelete,
    handleToggleFavorite,
  };
};
