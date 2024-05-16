import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./Techno.css";
import Problems from "./Problems";
import Solutions from "./Solutions";
import vectorgrp1 from "../../assets/images/vectorgrp-1.png";
import devprocess from "../../assets/images/dev-process.png";
import Tools from "./Tools";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";

function Techno() {
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
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);
  return (
    <>
      <Nav></Nav>
      <div>
        <div className="page-heading">
          <p>Unlock software magic with us</p>
          <p>
            Are you ready to experience seamless code and unparalleled support?
            Because with our IT services, your software development journey is
            about to reach new heights
          </p>
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
        <motion.div
          className="sub-services"
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: 400 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <p>What You'll Get</p>
          <ul>
            <li>Custom Software Development</li>
            <li>System Migration</li>
            <li>IT Infrastructure Design</li>
            <li>Full Development lifecycle</li>
            <li>Quality Assurance</li>
          </ul>
        </motion.div>
        <div className="services-vector">
          <img src={vectorgrp1} alt="" />
        </div>
      </div>

      <div className="dev-process">
        <p>Our Software Development Process</p>
        <motion.div
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
        </motion.div>
      </div>
      <Tools></Tools>

      <Footers></Footers>
    </>
  );
}

export default Techno;
