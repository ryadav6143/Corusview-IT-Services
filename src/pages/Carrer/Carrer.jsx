import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { carrerHead, getCareerInfo } from "../FrontendServices/Services";
import "./Carrer.css";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";
import CarrerGallery from "./CarrerGallery";

function Carrer() {
  const [careerData, setCareerData] = useState(null);
  const [careerInfo, setCareerInfo] = useState([]);
  const getCarrerHeadings = async () => {
    try {
      const data = await carrerHead();
      setCareerData(data);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
    }
  };
  const fetchCarrerInfo = async () => {
    try {
      const data = await getCareerInfo();
      setCareerInfo(data);
    } catch (error) {
      console.error("Error fetching career info:", error);
      // Handle error state if needed
    }
  };

  useEffect(() => {
    fetchCarrerInfo();
    getCarrerHeadings();
  }, []);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);
  const dummyCarrerInfo = [
    {
      id: 1,
      heading: "Transparent Culture:",
      content:
        "We believe in open communication and honesty at every level of our organization. What you see is what you get – no hidden agendas or surprises.",
    },
    {
      id: 2,
      heading: "Collaborative Environment:",
      content:
        "You'll be part of a supportive team where collaboration is key. We value input from all team members and encourage sharing ideas to drive innovation.",
    },
    {
      id: 3,
      heading: "Opportunities for Growth:",
      content:
        "We're committed to your professional development. Expect ongoing training programs, mentorship opportunities, and resources to enhance your skills and advance your career.",
    },
    {
      id: 4,
      heading: "Exciting Projects:",
      content:
        "Get ready to dive into stimulating projects that challenge your creativity and problem-solving skills. You'll have the chance to work on cutting-edge solutions that make a real impact in various industries.",
    },
    {
      id: 5,
      heading: "Competitive Compensation:",
      content:
        "Your hard work deserves to be rewarded. We offer competitive compensation packages and benefits that recognize your contributions to our success.",
    },
    {
      id: 6,
      heading: "Inclusive Culture:",
      content:
        "Diversity is our strength. We celebrate and embrace the unique perspectives and talents of every team member. You'll feel valued and respected for who you are.",
    },
    // Add more dummy data items as needed
  ];
  return (
    <>
      <Nav></Nav>

      <div>
        {careerData ? (
          <div className="carrer-heading">
            <p>{careerData.carrer_heading}</p>
            <p>{careerData.carrer_content}</p>
          </div>
        ) : (
          <div className="carrer-heading">
            <p>Exploring exciting career opportunities in it innovation </p>
            <p>
              At CorusView, we are not just a team; we are a family dedicated to
              innovation, collaboration, and excellence in every project we
              undertake. Joining us means embarking on a journey where your
              skills are nurtured, your creativity is valued, and your career
              aspirations are supported. We believe in fostering an environment
              where every individual can thrive and make a real impact in the
              world of IT services.
            </p>
          </div>
        )}
      </div>
      <CarrerGallery></CarrerGallery>
      <div className="environment">
        <div className="env-heading">
          <p>What You See, What You Get</p>
        </div>
        <div className="env-row">
          {careerInfo.length > 0
            ? careerInfo.map((item) => (
                <div key={item.id} className="env-card">
                  <p>{item.heading}</p>
                  <p>{item.content}</p>
                </div>
              ))
            : dummyCarrerInfo.map((item) => (
                <div key={item.id} className="env-card">
                  <p>{item.heading}</p>
                  <p>{item.content}</p>
                </div>
              ))}
        </div>
      </div>
      {careerData ? (
        <div className="join-us">
          <p>{careerData.ryh_heading}</p>
          <p>{careerData.ryh_content}</p>
          <button>
            <a href="">Go Ahead &#8594;</a>
          </button>
        </div>
      ) : (
        <div className="join-us">
          <p>
            Want to join us? <br /> Raise your hand.
          </p>
          <p>
            We're a team of innovators, collaborators, and problem-solvers,
            shaping the future of technology. If you're passionate, creative,
            and ready to contribute, raise your hand and join us on our mission.
            Let's build something amazing together.
          </p>
          <button>
            <a href="">Go Ahead &#8594;</a>
          </button>
        </div>
      )}

      <Footers></Footers>
    </>
  );
}

export default Carrer;
