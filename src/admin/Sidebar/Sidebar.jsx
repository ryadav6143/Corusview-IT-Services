import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [footerDropdownOpen, setFooterDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [nriDropdownOpen, setNriDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleHomeDropdown = () => {
    setHomeDropdownOpen(!homeDropdownOpen);
  };

  const handleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };
  const handleFooterDropdown = () => {
    setFooterDropdownOpen(!footerDropdownOpen);
  };

  const handleNriDropdown = () => {
    // Function to toggle NRI Corner dropdown
    setNriDropdownOpen(!nriDropdownOpen);
  };
  const handleGalleryDropdown = () => {
    setGalleryDropdownOpen(!galleryDropdownOpen);
  };
  const handleContactDropdown = () => {
    setContactDropdownOpen(!contactDropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setHomeDropdownOpen(false);
    setAboutDropdownOpen(false);
    setNriDropdownOpen(false);
    setAboutDropdownOpen(false);
    setFooterDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setContactDropdownOpen(false);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <button className="dropdown-btn" onClick={handleHomeDropdown}>
                Home
                <span className="custom-btn">
                  {homeDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  homeDropdownOpen ? "active" : ""
                }`}
              >
                <Link to="/admin/edithome" onClick={handleLinkClick}>
                  <a>Edit Home</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleAboutDropdown}>
                About
                <span className="custom-btn">
                  {aboutDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  aboutDropdownOpen ? "active" : ""
                }`}
                style={{ display: aboutDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/aboutbanner" onClick={handleLinkClick}>
                  <a>Edit Banner</a>
                </Link>
                <Link to="/admin/aboutsection1" onClick={handleLinkClick}>
                  <a>About Section</a>
                </Link>
                <Link to="/admin/aboutsection2" onClick={handleLinkClick}>
                  <a>Mission & Vision</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleGalleryDropdown}>
                Gallery
                <span className="custom-btn">
                  {galleryDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  galleryDropdownOpen ? "active" : ""
                }`}
                style={{ display: galleryDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/gallerybanner" onClick={handleLinkClick}>
                  Edit Banner
                </Link>
                <Link to="/admin/gallerydata" onClick={handleLinkClick}>
                  Create Project
                </Link>
                <Link to="/admin/galleryheading" onClick={handleLinkClick}>
                  Edit Project Name
                </Link>
                <Link to="/admin/gallerycontainer2" onClick={handleLinkClick}>
                  Site Images
                </Link>
                <Link to="/admin/gallerycontainer1" onClick={handleLinkClick}>
                  Real Site Images
                </Link>
              </div>

              <button className="dropdown-btn" onClick={handleNriDropdown}>
                NRI Corner
                <span className="custom-btn">
                  {nriDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  nriDropdownOpen ? "active" : ""
                }`}
                style={{ display: nriDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/nribanner" onClick={handleLinkClick}>
                  <a>Edit Banner & Content</a>
                </Link>
                <Link to="/admin/contactdetails" onClick={handleLinkClick}>
                  <a>Contact Details</a>
                </Link>
              </div>

              {/* --------------------------------------------------------------------------- */}
              <button className="dropdown-btn" onClick={handleContactDropdown}>
                Contact Page
                <span className="custom-btn">
                  {contactDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  contactDropdownOpen ? "active" : ""
                }`}
                style={{ display: contactDropdownOpen ? "block" : "none" }}
              >
                <Link
                  className="dropdown-btn"
                  to="/admin/editcontactus"
                  onClick={handleLinkClick}
                >
                  <a>Edit Contact Page</a>
                </Link>
                <Link to="/admin/contactform" onClick={handleLinkClick}>
                  <a>Contact Form Data</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleDropdown}>
                Upcoming Projects
                <span className="custom-btn">{dropdownOpen ? "-" : "+"}</span>
              </button>
              <div
                className={`dropdown-container  ${
                  dropdownOpen ? "active" : ""
                }`}
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/pageheading" onClick={handleLinkClick}>
                  <a href="#">Edit Heading</a>
                </Link>
                <Link to="/admin/bannerimages" onClick={handleLinkClick}>
                  <a href="#">Edit Banner</a>
                </Link>
                <Link to="/admin/slidercontent" onClick={handleLinkClick}>
                  <a href="#">Create Project</a>
                </Link>
                <Link to="/admin/projectslider" onClick={handleLinkClick}>
                  <a href="#">Project Images</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleFooterDropdown}>
                Footer
                <span className="custom-btn">
                  {footerDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  footerDropdownOpen ? "active" : ""
                }`}
                style={{ display: footerDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/footerdata" onClick={handleLinkClick}>
                  <a>Footer Data</a>
                </Link>
                <Link to="/admin/editfooter" onClick={handleLinkClick}>
                  <a>Edit Footer</a>
                </Link>
              </div>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default Sidebar;
