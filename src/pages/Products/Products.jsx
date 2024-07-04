import React, { useState, useEffect } from "react";
import { getProducts } from "../FrontendServices/Services";
import { Link } from "react-router-dom";
import "./Products.css";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";
import productvector from "../../assets/images/productpage-vector.png";
import productvideo from "../../assets/images/productvideo.mp4";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Nav></Nav>

      {products.map((product) => (
        <div key={product.id} className="product-container">
          <div className="wrapped-content">
            <div className="productpage-heading">
              <p>{product.heading}</p>
            </div>
            <div className="product-content">
              <p>{product.content}</p>
            </div>
          </div>
          <div className="prod-vector">
            <div className="vector-imgs"></div>
            <div className="video-container">
              <iframe
                src={product.video_link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div className="product-btns">
            <button>
              <a href={product.link1} target="_blank">
                Know More
              </a>
            </button>
            <button>
              <a href={product.link2} target="_blank">
                How it works
              </a>
            </button>
          </div>
        </div>
      ))}
      <Footers></Footers>
    </>
  );
}

export default Products;
