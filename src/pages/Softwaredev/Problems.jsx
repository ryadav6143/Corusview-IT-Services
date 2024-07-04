import React, { useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getProblems } from "../FrontendServices/Services";
import closebtn from "../../assets/logos/close.png";

function Problems() {
  const [problemsData, setProblemsData] = useState([]);
  const [heading, setHeading] = useState("");
  const ref = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getProblems();
        setProblemsData(data);
        setHeading(data.heading);
      } catch (error) {
        console.error("Error fetching problems data:", error);
      }
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    if (ref.inView && problemsData) {
      // Ensure problemsData is not null before accessing problems
      controls.start("visible");
    }
  }, [ref.inView, controls, problemsData]);

  return (
    <>
      <div className="problem-body">
        <div>
          <p>{heading}</p>
        </div>

        {problemsData && problemsData.problems ? (
          problemsData.problems.map((problem) => (
            <div
              className="proble-cards"
              key={problem.id}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.5 }}
            >
              <div className="cross-btn">
                <img src={closebtn} alt="" />
              </div>
              <div className="probs">
                <p>{problem.inner_heading}</p>
                <p>{problem.inner_content}</p>
              </div>
              <div></div>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Render a loading indicator or handle empty state as needed
        )}
      </div>
    </>
  );
}

export default Problems;
