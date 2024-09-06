"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InquiryModal from "@/component/main/InquiryModal";

const ProductPage = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const router = useRouter();

 const changeImg = (imagePath) => {
    setCurrentImage(imagePath);
  };

  return <div>
    
    <section id="inn-pro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="imageholder s-pro-pic-box">
                <img
                  id="imageHolder"
                  src={currentImage || "/images/bs-pro1.jpg"}
                  className="img-fluid"
                  alt="Product"
                />
              </div>
              <div className="vertical_menu">
                <ul>
                  {product?.images.map((image, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          changeImg(image.image_path);
                        }}
                      >
                        <img
                          src={image.image_path}
                          className="img-fluid"
                          alt={`Product thumbnail ${image.alt_text}`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="sing-pro-ctnArea">
                <h2>{product?.name || "Product Name"}</h2>
                <p className="mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`fa fa-star ${
                        i < product?.rating ? "checked" : ""
                      }`}
                    />
                  ))}
                </p>
                <p className="pro_desc">
                  {product?.description || "Product description goes here."}
                </p>
                <p className="pro-pg-price mb-4">
                  ₹ {product?.price || "0.00"}
                </p>
                <button className="rm-btn" onClick={handleShowModal}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <InquiryModal
          productName={product.name}
          show={showModal}
          onClose={handleCloseModal}
        />
      )}

  </div>;
};

export default ProductPage;
