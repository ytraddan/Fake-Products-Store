import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProductFormData = Omit<Product, "id" | "rating">;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  title: string;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  title,
}: ProductFormProps) => {
  const navigate = useNavigate();

  const defaultValues = initialData ?? {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  };

  const form = useForm<ProductFormData>({
    defaultValues,
  });

  return (
    <div className="container mx-auto flex min-h-screen items-center p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                rules={{
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Product price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Product category" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                rules={{ required: "Image URL is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Product image URL" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit">{initialData ? "Save" : "Create"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
