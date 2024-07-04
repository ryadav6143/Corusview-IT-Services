import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getCustomers } from "../../FrontendServices/Services";
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
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const data = await getCustomers();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    getTestimonial();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

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
            {/* <div className="carousel-inner">
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
            </div> */}
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div>
                    <p>{testimonial.description}</p>
                    <div className="about-client">
                      <img
                        src={testimonial.img}
                        alt={testimonial.img_originalname}
                      />
                      <div className="client-details">
                        <p>{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={handlePrev}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={handleNext}
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
