import React, { useState, useEffect } from "react";
import "./Footers.css";
import ourlogo from "../../assets/logos/corusview.png";
import insta from "../../assets/logos/instagram.png";
import linkedin from "../../assets/logos/linkedin.png";
import youtube from "../../assets/logos/youtube.png";
import locationlogo from "../../assets/logos/location.png";
import email from "../../assets/logos/mail.png";
import phone from "../../assets/logos/phone-call.png";
import { getFooterData } from "../../pages/FrontendServices/Services";

function Footers() {
  const [footerData, setFooterData] = useState(null);

  const getFooter = async () => {
    try {
      const data = await getFooterData(); // Assuming getFooterData() fetches from your API
      setFooterData(data);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };

  useEffect(() => {
    getFooter();
  }, []);

  return (
    <>
      <div>
        <div
          className="footer-1 set-footer"
          style={{
            backgroundColor: footerData ? footerData.footer_color : "#ffff",
          }}
        >
          <div className="flex-footer">
            <div className="logo">
              <img src={ourlogo} alt="Corusview" />
            </div>
            <div className="info">
              <div className="flex-info">
                <img src={locationlogo} alt="Location Logo" />

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    footerData ? footerData.address : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{footerData ? footerData.address : "Loading..."}</p>
                </a>
              </div>
              <div className="flex-info">
                <img src={email} alt="" />

                {footerData ? (
                  <p>
                    <a href={`mailto:${footerData.email}`}>
                      {footerData.email}
                    </a>
                  </p>
                ) : (
                  "Loading..."
                )}
              </div>
              <div className="flex-info">
                <img src={phone} alt="" />
                {footerData ? (
                  <p>
                    <a href={`tel:${footerData.phone}`}>{footerData.phone}</a>
                  </p>
                ) : (
                  "Loading..."
                )}
              </div>

              <div className="social-icons">
                <div>
                  <a
                    href={footerData ? footerData.link1 : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={insta} alt="" />
                  </a>
                </div>
                <div>
                  <a
                    href={footerData ? footerData.link2 : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedin} alt="" />
                  </a>
                </div>
                <div>
                  <a
                    href={footerData ? footerData.link3 : ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={youtube} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-2 set-footer">
          <p>@Corusview 2023 All rights reserved </p>
          <p>Terms & Conditions Applied </p>
          <p>Privacy policy</p>
        </div>
      </div>
    </>
  );
}

export default Footers;
