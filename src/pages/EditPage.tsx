import { useParams } from "react-router";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useProductActions } from "@/hooks/useProductActions";
import ProductForm from "@/components/ProductForm";

export default function EditPage() {
  const { id } = useParams();
  const { handleUpdateProduct } = useProductActions();

  const currentProduct = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id)),
  );

  if (!currentProduct) {
    return <ErrorMessage title="Error" message="Product not found" />;
  }

  return (
    <ProductForm
      initialData={currentProduct}
      onSubmit={(updatedProduct) =>
        handleUpdateProduct(updatedProduct, currentProduct)
      }
      title="Edit Product"
    />
  );
}
