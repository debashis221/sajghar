"use server";

import prisma from "@/prisma/db";
import path from "path";
import { writeFile } from "fs/promises";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = slugify(baseSlug, { lower: true });
  let isUnique = false;
  let count = 1;

  while (!isUnique) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existingProduct) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${count}`;
      count++;
    }
  }

  return slug;
}

export async function getProductCategories() {
  return await prisma.productCategory.findMany();
}

export async function getProductById(productId: number) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
      category: true,
    },
  });
}

export async function updateProduct(productId: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const description = formData.get("description") as string;
    const offer = formData.get("offer") as string;
    const status = formData.get("status") as string;
    const price = formData.get("price") as string;
    const imageFiles = formData.getAll("images") as File[];

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const updateData: any = {};

    if (name) {
      updateData.name = name;
      const baseSlug = slugify(name, { lower: true });
      updateData.slug = await generateUniqueSlug(baseSlug);
    }

    if (description) {
      updateData.description = description;
    }

    if (offer) {
      updateData.offer = offer;
    }

    if (price) {
      updateData.price = price;
    }

    if (status) {
      updateData.status = status;
    }

    if (category_id) {
      updateData.category_id = Number(category_id);
    }

    // Handle new image files if provided
    if (imageFiles.length > 0) {
      const productImages = [];
      for (const imageFile of imageFiles) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uniqueFilename = `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${path.extname(imageFile.name)}`;
        const filePath = path.join(
          process.cwd(),
          "public/productimages",
          uniqueFilename
        );
        await writeFile(filePath, buffer);

        const newImage = await prisma.productImage.create({
          data: {
            product_id: existingProduct.id,
            image_path: `/productimages/${uniqueFilename}`,
            alt_text: name, // Optional, can be customized
          },
        });

        productImages.push(newImage);
      }

      // Update the primary image if new images were added
      if (productImages.length > 0) {
        updateData.image = productImages[0].image_path;
      }
    }

    // Update the product with new data
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    revalidatePath(`/admin/dashboard/product`);

    return {
      message: "Product updated successfully",
      product: updatedProduct,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(`Internal Server Error: ${(error as Error).message}`);
  }
}

export async function deleteProductImage(imageId: number) {
  return await prisma.productImage.delete({
    where: { id: imageId },
  });
}
