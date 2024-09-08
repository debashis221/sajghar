import { ProductCategory } from "@prisma/client";
import Link from "next/link";

const PopulerCategories = ({
  categories,
}: {
  categories: ProductCategory[];
}) => {
  return (
    <section id="popular-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Most Popular Categories</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 mt-2">
            <div className="row">
              {categories.slice(0, 6).map((category, index) => (
                <div className="col-lg-6 mb-4" key={index}>
                  <div className="cat-box hover14 column">
                    <div className="bbBox box-one hover14 column">
                      <div>
                        <div>
                          <img
                            src={category.image}
                            className="img-fluid"
                            alt={category.slug}
                          />
                        </div>
                        <h5>
                          <Link href={`/${category.slug}`}>
                            {category.category_name}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link className="bbBox2 mid-box hover15 column" href={"/categories"}>
            <div>
              <div>
                <img src="images/cat-img.jpg" className="img-fluid" alt="..." />
              </div>
            </div>
          </Link>

          <div className="col-lg-4 mt-2">
            <div className="row">
              {categories.slice(6, 12).map((category, index) => (
                <div className="col-lg-6 mb-4" key={index}>
                  <div className="cat-box hover14 column">
                    <div className="bbBox box-one hover14 column">
                      <div>
                        <div>
                          <img
                            src={category.image}
                            className="img-fluid"
                            alt={category.slug}
                          />
                        </div>
                        <h5>
                          <Link href={`/${category.slug}`}>
                            {category.category_name}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopulerCategories;
