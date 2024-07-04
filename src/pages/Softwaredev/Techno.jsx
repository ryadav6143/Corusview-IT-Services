import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  getServicePageHeading,
  getServicesWYG,
} from "../FrontendServices/Services";
import "./Techno.css";
import Problems from "./Problems";
import Solutions from "./Solutions";
import vectorgrp1 from "../../assets/images/vectorgrp-1.png";
import devprocess from "../../assets/images/dev-process.png";
import Tools from "./Tools";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";

function Techno() {
  const [servicesData, setServicesData] = useState([]);
  const [listData, setListData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState();
  const showComponent = (componentName) => {
    setSelectedComponent(componentName);
  };
  let componentToShow;
  switch (selectedComponent) {
    case "Component1":
      componentToShow = <Problems />;
      break;
    case "Component2":
      componentToShow = <Solutions />;
      break;

    default:
      componentToShow = <Problems />;
      break;
  }
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const getHeading = async () => {
    try {
      const data = await getServicePageHeading();
      setServicesData(data);
    } catch (error) {
      console.error("Error fetching services head data:", error);
    }
  };
  const getList = async () => {
    try {
      const data = await getServicesWYG();
      console.log("Fetched data:", data);
      setListData(data);
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  };
  useEffect(() => {
    getHeading();
    getList();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);
  if (!servicesData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Nav></Nav>
      <div>
        <div className="page-heading">
          <p>{servicesData.services_heading}</p>
          <p>{servicesData.services_content}</p>
        </div>

        <div className="sub-header flex-header">
          <div>
            <a onClick={() => showComponent("Component1")}>Problems</a>
          </div>
          <div className="dot"></div>
          <div>
            <a onClick={() => showComponent("Component2")}>Solutions</a>
          </div>
          <div className="dot"></div>
        </div>
        <div style={{ marginInline: "10px" }}>{componentToShow}</div>
      </div>

      <div className="services">
        <div className="sub-services">
          <p>What You'll Get</p>
          <ul>
            {listData.map((myList) => (
              <li key={myList.id}>{myList.heading}</li>
            ))}
          </ul>
        </div>
        <div className="services-vector">
          <img src={vectorgrp1} alt="" />
        </div>
      </div>

      <div className="dev-process">
        <p>Our Software Development Process</p>
        <div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: 1000 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: "0.5" }}
        >
          <img src={devprocess} />
        </div>
      </div>
      <Tools></Tools>

      <Footers></Footers>
    </>
  );
}

export default Techno;
