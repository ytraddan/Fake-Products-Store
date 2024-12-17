import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/state/store";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  deleteProduct,
  addProduct,
  updateProduct,
} from "@/state/productsSlice";

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const useProductActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDeleteProduct = (product: Product) => {
    setTimeout(() => {
      dispatch(deleteProduct(product.id));
      toast("Deleted", {
        description: `"${truncate(product.title, isMobile ? 15 : 20)}" has been removed`,
        action: {
          label: "Undo",
          onClick: () => {
            dispatch(addProduct(product));
          },
        },
      });
    }, 100);
    navigate("/products");
  };

  const handleAddProduct = (data: Omit<Product, "id" | "rating">) => {
    const newProduct = {
      ...data,
      id: Date.now(),
      rating: { rate: 0, count: 0 },
    };
    dispatch(addProduct(newProduct));
    navigate("/products");
    toast("Created", {
      description: `"${newProduct.title}" has been added`,
      action: {
        label: "Undo",
        onClick: () => {
          dispatch(deleteProduct(newProduct.id));
        },
      },
    });
  };

  const handleUpdateProduct = (
    updatedProduct: Omit<Product, "id" | "rating">,
    currentProduct: Product,
  ) => {
    dispatch(
      updateProduct({
        ...updatedProduct,
        id: currentProduct.id,
        rating: currentProduct.rating,
      }),
    );
    navigate(-1);
    toast("Updated", {
      description: `"${updatedProduct.title}" has been updated`,
      action: {
        label: "Undo",
        onClick: () => {
          dispatch(updateProduct(currentProduct));
        },
      },
    });
  };

  return {
    handleDeleteProduct,
    handleAddProduct,
    handleUpdateProduct,
  };
};
