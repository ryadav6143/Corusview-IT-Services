import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getHomeHeading } from "../FrontendServices/Services";
import "./Home.css";
import Customer from "./Customers/Customer";
import vector1 from "../../assets/images/vector.png";
import vector2 from "../../assets/images/vector2.png";
import OurServices from "./OurServices/OurServices";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";
import uipos from "../../assets/images/projects/uipos.png";
import cview from "../../assets/images/projects/cview.png";

function Home() {
  const [headingData, setHeadingData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="home-heading">
        <p>
          <span>5+ Years of Experience in IT Field</span> Where Innovation Meets
          Excellence
        </p>
      </div>

      <div>
        <OurServices></OurServices>
      </div>

      <div className="about-company">
        <div className="vector-grp">
          <img src={vector1} alt="" />
          <img src={vector2} alt="" />
        </div>

        <motion.div className="abt-com-flex" ref={ref}>
          <div>
            <p>About Us</p>
          </div>

          <div>
            <p>
              Corusview IT Services is a top rated web development company which
              offers high quality reliable web, software and Mobile development
              services that help us to serve our clients globally and giving
              them value for their money through are unique offerings models
              depending on the nature of the projects and their preferences.
            </p>
          </div>
        </motion.div>
      </div>
      <div>
        <Customer></Customer>
      </div>

      <div className="recent-works" ref={ref}>
        <motion.div
          className="recent-works-heading"
          ref={ref}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <p>Recent work</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </motion.div>

        <motion.div
          className="recent-flex"
          ref={ref}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="small-box">
            <img src={uipos} alt="" />
          </div>
          <div className="center-box">
            <img src={cview} alt="" />
          </div>
          <div className="small-box">
            <img src={uipos} alt="" />
          </div>
        </motion.div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Home;
