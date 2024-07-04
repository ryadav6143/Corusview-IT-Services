import React, { useState, useEffect } from "react";
import { getRecentWorks } from "../FrontendServices/Services";
import "./RecentWork.css";
import ReactCardCarousel from "react-card-carousel";
import workA from "../../assets/images/projects/ironman.jpg";
import workB from "../../assets/images/projects/Spiderman.jpeg";
import workC from "../../assets/images/projects/cyberpunk.jpg";

function RecentWork() {
  const [recentWorks, setRecentWorks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecentWorks();
        setRecentWorks(data);
      } catch (error) {
        console.error("Error setting recent works:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="main-container">
      <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
        {recentWorks.map((work, index) => (
          <div key={index} className="workcard">
            <img src={work.img} alt={work.img_originalname} />
          </div>
        ))}
      </ReactCardCarousel>
    </div>
  );
}

export default RecentWork;
