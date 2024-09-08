"use client";
import { useForm } from "react-hook-form";
import { Product, ProductCategory, ProductImage } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  updateProduct,
  deleteProductImage,
} from "@/serverActions/serverActions";

interface EditProductFormProps {
  product: Product & { images: ProductImage[] };
  categories: ProductCategory[];
  productId: number;
}

interface FormValues {
  name: string;
  category_id: number;
  description: string;
  offer: string;
  price: string;
  status: string;
  images: FileList;
}

const EditProductForm = ({
  product,
  categories,
  productId,
}: EditProductFormProps) => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      name: product.name,
      category_id: product.category_id,
      description: product.description,
      offer: product.offer,
      price: product.price ?? "",
      status: product.status,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category_id", data.category_id.toString());
      formData.append("description", data.description);
      formData.append("offer", data.offer);
      formData.append("price", data.price);
      formData.append("status", data.status);

      console.log(data.images);
      // Append images to formData
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file); // Add each image to FormData
        });
      }
      const response = await updateProduct(productId, formData);
      toast.success(response.message);
      router.push("/admin/dashboard/product");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  //   const handleDeleteImage = async (imageId: number) => {
  //     try {
  //       await deleteProductImage(imageId);
  //       toast.success("Image deleted successfully");
  //       setValue(
  //         "images",
  //         getValues("images").filter((img) => img.id !== imageId)
  //       );
  //     } catch (error) {
  //       toast.error("Failed to delete image");
  //     }
  //   };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category_id" className="form-label">
          Category
        </label>
        <select
          id="category_id"
          {...register("category_id", { required: true })}
          className="form-control"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="form-control"
          rows={4}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="offer" className="form-label">
          Offer
        </label>
        <select id="offer" {...register("offer")} className="form-control">
          <option value="">Select an offer</option>
          <option value="30_off">30% Off</option>
          <option value="50_off">50% Off</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="text"
          id="price"
          {...register("price")}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select id="status" {...register("status")} className="form-control">
          <option value="ACTIVE">Active</option>
          <option value="DEACTIVE">Inactive</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="images" className="form-label">
          Images
        </label>
        <input
          type="file"
          id="images"
          className="form-control"
          accept="image/*"
          multiple
        />
      </div>

      {product.images && (
        <div className="mb-3">
          <h6>Existing Images:</h6>
          <div className="row">
            {product.images.map((image) => (
              <div key={image.id} className="col-3 mb-2 text-center">
                <img
                  src={image.image_path}
                  alt="Preview"
                  className="img-fluid"
                  style={{ maxHeight: "100px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Update Product
      </button>
    </form>
  );
};

export default EditProductForm;
