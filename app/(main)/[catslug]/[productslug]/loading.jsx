"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const loading = () => {
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
          <div className="row">
            <div className="col-lg-4">
              <div className="imageholder s-pro-pic-box">
                <Skeleton height={400} />
              </div>
              <div className="vertical_menu">
                <ul>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton height={80} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="sing-pro-ctnArea">
                <Skeleton height={30} width={300} />
                <Skeleton height={20} width={150} />
                <Skeleton height={60} count={3} />
                <Skeleton height={30} width={100} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default loading;
