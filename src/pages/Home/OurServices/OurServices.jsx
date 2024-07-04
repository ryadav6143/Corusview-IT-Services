import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getHomeServices } from "../../FrontendServices/Services";
import "./OurServices.css";
import SD from "../../../assets/logos/software devlopment.png";
import UIUX from "../../../assets/logos/ui ux.png";
import Mobile from "../../../assets/logos/mobile development.png";
import WD from "../../../assets/logos/web development.png";
import DG from "../../../assets/logos/digital merketing.png";
import QA from "../../../assets/logos/Quality.png";

function OurServices() {
  const [services, setServices] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeServices();
      setServices(data);
    };

    fetchData();
  }, []);
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -500 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="services-heading">Our Services</p>
      </motion.div>
      <div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {services.map((service, index) => (
            <div className="accordion-item" key={service.id}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${service.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse-${service.id}`}
                >
                  <img
                    src={service.icon_img}
                    alt={service.icon_img_originalname}
                  />
                  <p>
                    {index + 1} &nbsp;
                    <span>{service.heading}</span>
                  </p>
                </button>
              </h2>
              <div
                id={`flush-collapse-${service.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading-${service.id}`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <p>{service.content}</p>
                  <button>
                    <a href="">Read More...</a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default OurServices;
