import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/state/store";
import { Product } from "@/types/product";
import { addProduct, deleteProduct } from "@/state/productsSlice";
import { clearFilters } from "@/state/filtersSlice";
import { toast } from "sonner";
import ProductForm from "@/components/ProductForm";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: Omit<Product, "id" | "rating">) => {
    const newProduct = {
      ...data,
      id: Date.now(),
      rating: { rate: 0, count: 0 },
    };
    dispatch(addProduct(newProduct));
    dispatch(clearFilters());
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

  return <ProductForm onSubmit={onSubmit} title="Create New Product" />;
}
