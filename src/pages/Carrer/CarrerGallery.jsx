import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCareerImages } from "../FrontendServices/Services";
import corusview1 from "../../assets/images/ourimages/corusview1.jpg";
import corusview2 from "../../assets/images/ourimages/corusview2.jpeg";
import corusview3 from "../../assets/images/ourimages/corusview3.jpg";
import corusview4 from "../../assets/images/ourimages/corusview4.jpeg";
import corusview5 from "../../assets/images/ourimages/corusview5.jpeg";
import corusview6 from "../../assets/images/ourimages/corusview6.jpg";
import corusview7 from "../../assets/images/ourimages/corusview12.jpg";
import corusview8 from "../../assets/images/ourimages/corusview9.png";
function CarrerGallery() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.9:5000/career_images"
        );
        setData(response.data); // Assuming your API response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* <div className="gallery-collection">
        <div className="gallery">
          <div className="imgs">
            <img src={corusview1} />
          </div>
          <div className="imgs img-to-btm">
            <img src={corusview2} />
          </div>
          <div className="imgs">
            <img src={corusview7} />
          </div>
          <div className="imgs img-to-btm">
            <img src={corusview4} />
          </div>
        </div>
        <div className="gallery-2">
          <div className="imgs">
            <img src={corusview5} />
          </div>
          <div className="imgs img-to-btm">
            <img src={corusview6} />
          </div>
          <div className="imgs">
            <img src={corusview3} />
          </div>
          <div className="imgs img-to-btm">
            <img src={corusview8} />
          </div>
        </div>
      </div> */}

      <div className="multi-group-images">
        {data.map((item) => (
          <div key={item.id} className="single-gallery-group">
            <div className="gallery">
              {item.images.map((img, index) => (
                <div
                  key={`img_${index}`}
                  className={`imgs ${index % 2 === 0 ? "" : "img-to-btm"}`}
                >
                  <img
                    src={Object.values(img)[0].url}
                    alt={Object.values(img)[0].originalname}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CarrerGallery;
