import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import closebtn from "../../assets/logos/close.png";

function Problems() {
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
      <motion.div className="problem-body">
        <div>
          <p>Mistakes which make minor bugs to major issues</p>
        </div>

        <motion.div
          className="proble-cards"
          ref={ref}
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
            <p>Dealing with coding errors </p>
            <p>
              Developers often encounter coding errors while writing or
              modifying code. These errors, also known as "bugs," can range from
              syntax errors, logical errors, to runtime errors. Syntax errors
              occur when code violates the rules of the programming language,
              making it unable to compile or execute.
            </p>
          </div>
          <div></div>
        </motion.div>

        <motion.div
          className="proble-cards"
          ref={ref}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: "0.25" }}
        >
          <div className="cross-btn">
            <img src={closebtn} alt="" />
          </div>
          <div className="probs">
            <p>Dealing with coding errors </p>
            <p>
              Developers often encounter coding errors while writing or
              modifying code. These errors, also known as "bugs," can range from
              syntax errors, logical errors, to runtime errors. Syntax errors
              occur when code violates the rules of the programming language,
              making it unable to compile or execute.
            </p>
          </div>
          <div></div>
        </motion.div>

        <motion.div
          className="proble-cards"
          ref={ref}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: "0.5" }}
        >
          <div className="cross-btn">
            <img src={closebtn} alt="" />
          </div>
          <div className="probs">
            <p>Dealing with coding errors </p>
            <p>
              Developers often encounter coding errors while writing or
              modifying code. These errors, also known as "bugs," can range from
              syntax errors, logical errors, to runtime errors. Syntax errors
              occur when code violates the rules of the programming language,
              making it unable to compile or execute.
            </p>
          </div>
          <div></div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Problems;
