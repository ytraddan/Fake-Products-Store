import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "@/state/store";
import { Product } from "@/types/product";
import { updateProduct } from "@/state/productsSlice";
import { ProductForm } from "@/components/ProductForm";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { toast } from "sonner";

export const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id)),
  );

  if (!product) {
    return <ErrorMessage title="Error" message="Product not found" />;
  }

  const onSubmit = (data: Omit<Product, "id" | "rating">) => {
    dispatch(
      updateProduct({
        ...data,
        id: product.id,
        rating: product.rating,
      }),
    );
    navigate(`/products/${product.id}`);
    toast("Updated", {
      description: `"${data.title}" has been updated`,
      action: {
        label: "Undo",
        onClick: () => {
          dispatch(updateProduct(product));
        },
      },
    });
  };

  return (
    <ProductForm
      initialData={product}
      onSubmit={onSubmit}
      title="Edit Product"
    />
  );
};
