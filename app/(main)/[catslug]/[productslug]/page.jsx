import ProductPage from "@/component/main/ProductPage";
import db from "@/prisma/db";

const Product = async ({ params }) => {
  const product = await db.product.findUnique({
    where: {
      slug: params.productslug,
    },
    include: {
      images: true,
    },
  });

  return (
    <>
      <section id="innerPG-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="banner-item col-lg-12">
              <img
                src="/images/inn-banner.jpg"
                className="img-fluid"
                alt="Banner"
              />
            </div>
          </div>
        </div>
      </section>
      <ProductPage product={product} />
    </>
  );
};

export default Product;
