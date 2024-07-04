import React, { useState, useEffect } from "react";
import {
  getContactInfo,
  getRoles,
  submitContactForm,
} from "../FrontendServices/Services";

import "./Contact.css";
import email from "../../assets/logos/color-logo/email.png";
import phone from "../../assets/logos/color-logo/phone.png";
import location from "../../assets/logos/color-logo/location.png";
import message from "../../assets/logos/message.png";
import Nav from "../../components/Headers/Nav";
import Footers from "../../components/Footers/Footers";

function Contact() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedButton, setSelectedButton] = useState(""); // State for selected button
  const [contactInfo, setContactInfo] = useState(null);
  const [roles, setRoles] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    role: "",
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

  const fetchRole = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching contact information:", error);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedOption(selectedRole);
  };

  const handleClickChange = (roleValue) => {
    setSelectedOption(roleValue); // Set selectedOption state

    // Set selected button and update style
    setSelectedButton(roleValue);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await submitContactForm(formData, selectedOption);

      console.log("Response:", response);

      // Reset form data and selected option after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
        role: "",
      });
      setSelectedOption("");
      setSelectedButton(""); // Clear selected button state after submission
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="contact-flex-box">
        {contactInfo && (
          <div className="contact-card contact-card-1">
            <div>
              <p>{contactInfo.heading}</p>
            </div>
            <div>
              <p>
                <img src={email} alt="Email Icon" />
                {contactInfo.email}
              </p>
              <p>
                <img src={phone} alt="Phone Icon" />
                {contactInfo.phone}
              </p>
              <p>
                <img src={location} alt="Location Icon" />
                {contactInfo.address}
              </p>
            </div>
          </div>
        )}

        <div className="contact-card contact-card-2">
          <p>I'm interested in...</p>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="vacancy-btns">
                {roles &&
                  roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleClickChange(role.role)}
                      className={selectedButton === role.role ? "selected" : ""}
                    >
                      {role.role}
                    </button>
                  ))}
              </div>

              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="hidden-select-options"
              >
                <option value="">Select...</option>
                {roles &&
                  roles.map((role) => (
                    <option key={role.id} value={role.value}>
                      {role.role}
                    </option>
                  ))}
              </select>
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
