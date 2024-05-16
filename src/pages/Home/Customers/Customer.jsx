import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./Customer.css";
import client from "../../../assets/images/jazz.jpg";

function Customer() {
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
      <div className="our-customers">
        <div className="custom-heading custom-heading-mobile">
          <p>
            What our <br /> Customers <br /> are Saying
          </p>
        </div>
        <motion.div
          className="custom-crousol"
          ref={ref}
          variants={{
            hidden: { rotate: 19 },
            visible: { rotate: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <div className="about-client">
                    <img src={client} alt="" />
                    <div className="client-details">
                      <p>Mr. Bob</p>
                      <p>CEO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <div className="about-client">
                    <img src={client} alt="" />
                    <div className="client-details">
                      <p>Mr. Bob</p>
                      <p>CEO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <div className="about-client">
                    <img src={client} alt="" />
                    <div className="client-details">
                      <p>Mr. Bob</p>
                      <p>CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev custom-btn"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next custom-btn"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </motion.div>

        <div className="custom-heading">
          <p>
            What our <br /> Customers <br /> are Saying
          </p>
        </div>
      </div>
    </>
  );
}

export default Customer;
