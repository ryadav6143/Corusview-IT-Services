import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCareerImages } from "../FrontendServices/Services";

function CarrerGallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesData = await getCareerImages();
        setData(imagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
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
