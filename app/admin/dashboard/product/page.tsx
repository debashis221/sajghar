import ProductPage from "@/component/admin/ProductPage";
import db from "@/prisma/db";

const ProductTable = async () => {
  const products = await db.product.findMany({
    include: {
      category: true, // Include the related category data
    },
    orderBy: {
      id: "desc",
    },
  });

  console.log(products)

  return <ProductPage products={products} />;
};

export default ProductTable;
