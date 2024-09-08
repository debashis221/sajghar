import prisma from "@/prisma/db";
import Link from "next/link";

const CategoryPage = async () => {
  const categories = await prisma.productCategory.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <section id="innerPG-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="banner-item col-lg-12">
              <img
                src={"/images/inn-banner.jpg"}
                className="img-fluid"
                alt="Banner"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="category-list" className="mt-4">
        <div className="container">
          <div className="row">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.slug} className="col-lg-3 col-md-6 mb-4">
                  <div className="card">
                    <Link href={`/${category.slug}`}>
                      <img
                        src={category.image}
                        alt={category.category_name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{category.category_name}</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No categories found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
