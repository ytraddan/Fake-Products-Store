import ProductForm from "@/components/ProductForm";
import { useProductActions } from "@/hooks/useProductActions";

export default function CreatePage() {
  const { handleAddProduct } = useProductActions();

  return (
    <ProductForm
      onSubmit={(newProduct) => handleAddProduct(newProduct)}
      title="Create New Product"
    />
  );
}
