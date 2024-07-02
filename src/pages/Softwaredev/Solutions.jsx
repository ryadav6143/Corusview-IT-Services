import React, { useState, useEffect } from "react";
import { getSolutions } from "../FrontendServices/Services";
import closebtn from "../../assets/logos/close.png";

function Solutions() {
  const [solutionsData, setSolutionsData] = useState([]);
  const [heading, setHeading] = useState("");
  useEffect(() => {
    const fetchSolutionsData = async () => {
      try {
        const data = await getSolutions();
        setSolutionsData(data);
        setHeading(data.heading);
      } catch (error) {
        console.error("Error fetching solutions data:", error);
      }
    };

    fetchSolutionsData();
  }, []);

  return (
    <div className="solution-body">
      <div>
        <p>{heading}</p>
      </div>
      {solutionsData && solutionsData.solutions ? (
        solutionsData.solutions.map((solution) => (
          <div className="proble-cards" key={solution.id}>
            <div className="cross-btn">
              <img src={closebtn} alt="close button" />
            </div>
            <div className="probs">
              <p>{solution.inner_heading}</p>
              <p>{solution.inner_content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>loading.....</p>
      )}
    </div>
  );
}

export default Solutions;
