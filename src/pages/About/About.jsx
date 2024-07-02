import React, { useState, useEffect } from "react";
import { getAboutCompany, getOurValues } from "../FrontendServices/Services";
import "./About.css";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";

function About() {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [valuesData, setValuesData] = useState(null);

  const getValues = async () => {
    const data = await getOurValues();
    setValuesData(data);
  };
  const aboutCompany = async () => {
    const data = await getAboutCompany();
    setAboutUsData(data);
  };
  useEffect(() => {
    aboutCompany();
    getValues();
  }, []);

  if (!valuesData && !aboutUsData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav></Nav>
      <div>
        <div className="about-page-heading">
          <p>about us</p>
        </div>
        {aboutUsData && (
          <div className="about-us">
            <div className="about-us-cards">
              <div className="about-us-card">
                <p>Our Company</p>
                <p>{aboutUsData[0].company_content}</p>
              </div>
              <div className="about-us-card">
                <p>Our Story</p>
                <p>{aboutUsData[0].story_content}</p>
              </div>
              <div className="about-us-card">
                <p>Our Vision</p>
                <p>{aboutUsData[0].vision_content}</p>
              </div>
            </div>
          </div>
        )}
        {valuesData && (
          <div className="our-values">
            <div className="our-values-heading">
              <p>Our Values</p>
            </div>
            <div className="our-values-card">
              <div className="our-values-cards">
                <div className="sub-card">
                  <div className="value-numberings">
                    <p>01</p>
                  </div>
                  <div className="value-content">
                    <p>{valuesData[0].heading}</p>
                    <p>{valuesData[0].content}</p>
                  </div>
                </div>
              </div>
              <div className="our-values-cards">
                <div className="sub-card">
                  <div className="value-numberings">
                    <p>02</p>
                  </div>
                  <div className="value-content">
                    <p>{valuesData[1].heading}</p>
                    <p>{valuesData[1].content}</p>
                  </div>
                </div>
              </div>
              <div className="our-values-cards">
                <div className="sub-card">
                  <div className="value-numberings">
                    <p>03</p>
                  </div>
                  <div className="value-content">
                    <p>{valuesData[2].heading}</p>
                    <p>{valuesData[2].content}</p>
                  </div>
                </div>
              </div>
              <div className="our-values-cards">
                <div className="sub-card">
                  <div className="value-numberings">
                    <p>04</p>
                  </div>
                  <div className="value-content">
                    <p>{valuesData[3].heading}</p>
                    <p>{valuesData[3].content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="join-us-btn">
          <button>
            <a href="">Join Us</a>
          </button>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default About;
