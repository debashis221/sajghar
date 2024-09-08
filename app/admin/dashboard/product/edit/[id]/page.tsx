import {
  getProductById,
  getProductCategories,
} from "@/serverActions/serverActions";
import EditProductForm from "@/component/admin/EditProduct";
import { Toaster } from "react-hot-toast";

interface EditProductProps {
  params: { id: string };
}

const EditProduct = async ({ params }: EditProductProps) => {
  const productId = parseInt(params.id, 10);

  const product = await getProductById(productId);
  const categories = await getProductCategories();

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container-fluid my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="card-title mb-0">Edit Product</h4>
        </div>
        <div className="card-body">
          <EditProductForm
            product={product}
            categories={categories}
            productId={productId}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EditProduct;
