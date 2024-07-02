import React from "react";
import "./Products.css";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";
import productvector from "../../assets/images/productpage-vector.png";
import productvideo from "../../assets/images/productvideo.mp4";

function Products() {
  return (
    <>
      <Nav></Nav>
      <div className="product-container">
        <div className="wrapped-content">
          <div className="productpage-heading">
            <p>OUR PRODUCT</p>
          </div>
          <div className="product-content">
            <p>
              At CorusView,works on a proven C.A.A.G. model which allows you to
              collect actionable data, and helps you analyze it in a meaningful
              way. It lets you view your responses graphically and in real time
              ensuring 360° assessment and swift action delivery.works on a
              proven C.A.A.G. model which allows you to collect actionable data,
              and helps you analyze it in a meaningful way. It lets you view
              your responses graphically and in real time ensuring 360°
              assessment and swift action delivery
            </p>
          </div>
        </div>
        <div className="prod-vector">
          <div className="vector-imgs"></div>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/O5rgp4xbB88?si=S5poWKezr71WpPCU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="product-btns">
          <button>
            <a href="">Know More</a>
          </button>
          <button>
            <a href="">How it works</a>
          </button>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Products;
