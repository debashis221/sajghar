import prisma from "@/prisma/db";
import Link from "next/link";

const Page = async ({ params }: { params: { catslug: string } }) => {
  const { catslug } = params;
  const category = await prisma.productCategory.findFirst({
    where: {
      slug: catslug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return {
      notFound: true,
    };
  }

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

      <section id="inn-pro-section">
        <div className="container">
          <div className="row mb-4 justify-content-center">
            <div className="col-lg-10 text-center">
              <h2>{category.category_name}</h2>
              <p>{category.category_description}</p>
            </div>
          </div>
          {category.products.length === 0 ? (
            <div className="row mb-4 justify-content-center">
              <div className="col-lg-10 text-center">
                <p>No products available in this category.</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {category.products.map((product) => (
                <div className="col-lg-3 mb-4" key={product.id}>
                  <div className="product-box text-center">
                    <div className="product-box-img hover01">
                      <div>
                        <figure>
                          <img
                            src={product.image}
                            className="mr-3"
                            alt={product.name}
                          />
                        </figure>
                      </div>
                    </div>
                    <div className="product-box-ctn">
                      <h4>{product.name}</h4>
                      <p className="star">
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star" />
                      </p>
                      <ul className="pro-cart-list" style={{ display: "grid" }}>
                        <li>
                          <p className="pro-price">₹ {product.price}</p>
                        </li>
                        <li>
                          <Link
                            href={`/${category.slug}/${product.slug}`}
                            className="cart-btn"
                          >
                            Buy Now
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
