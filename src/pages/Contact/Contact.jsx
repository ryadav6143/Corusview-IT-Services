import React, { useState, useEffect } from "react";
import {
  getContactInfo,
  submitContactForm,
} from "../FrontendServices/Services";

import "./Contact.css";
import email from "../../assets/logos/color-logo/email.png";
import phone from "../../assets/logos/color-logo/phone.png";
import location from "../../assets/logos/color-logo/location.png";
import message from "../../assets/logos/message.png";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";
import Notification from "../../Notification/Notification";
function Contact() {
  const [contactInfo, setContactInfo] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const fetchData = async () => {
    try {
      const data = await getContactInfo();
      setContactInfo(data);
    } catch (error) {
      console.error("Error fetching contact information:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Enter a valid Name";
      formIsValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  };
  const showNotification = (message, severity = "default") => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
    setNotificationMessage("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log(formData, "--------------------------");
      const response = await submitContactForm(formData);

      console.log("Response:", response);
      showNotification(response.message, "success");

      // Reset form data and selected option after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Nav />

      <Notification
        open={notificationOpen}
        handleClose={closeNotification}
        alertMessage={notificationMessage}
        alertSeverity="success"
      />
      <div className="contact-flex-box">
        {contactInfo && (
          <div className="contact-card contact-card-1">
            <div>
              <p>{contactInfo.heading}</p>
            </div>
            <div>
              <p>
                <img src={email} alt="Email Icon" />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </p>
              <p>
                <img src={phone} alt="Phone Icon" />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </p>
              <p>
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(
                    contactInfo.address
                  )}`}
                  target="_blank"
                >
                  <img src={location} alt="Location Icon" />
                  {contactInfo.address}
                </a>
              </p>
            </div>
          </div>
        )}

        <div className="contact-card contact-card-2">
          <p>I'm interested in...</p>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && (
                <div className="error">{formErrors.name}</div>
              )}
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <div className="error">{formErrors.email}</div>
              )}
              <input
                type="text"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {formErrors.message && (
                <div className="error">{formErrors.message}</div>
              )}

              <button type="submit">
                <img src={message} alt="Message Icon" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footers />
    </>
  );
}

export default Contact;
