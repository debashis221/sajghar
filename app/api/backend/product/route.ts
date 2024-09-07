import db from "@/prisma/db";

export async function GET() {
  try {
    // Fetch products with their related category information
    const products = await db.product.findMany({
      include: {
        category: true, // Include the related category data
      },
      orderBy: {
        id: "desc",
      },
    });

    // Map the products to include category name
    const productsWithCategoryName = products.map((product) => ({
      ...product,
      category_name: product.category.category_name, // Add category name to the product
    }));

    return new Response(JSON.stringify(productsWithCategoryName), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
