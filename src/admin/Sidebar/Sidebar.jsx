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
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
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
  const handleProductsDropdown = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
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
    setProductsDropdownOpen(false);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <button className="dropdown-btn" onClick={handleHomeDropdown}>
                Home
                <span className="custom-dropdown-btn">
                  {homeDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  homeDropdownOpen ? "active" : ""
                }`}
              >
                <Link to="/admin/editheading" onClick={handleLinkClick}>
                  <a>Edit Heading</a>
                </Link>
                <Link to="/admin/editservices" onClick={handleLinkClick}>
                  <a>Edit Services</a>
                </Link>
                <Link to="/admin/editaboutus" onClick={handleLinkClick}>
                  <a>Edit About Us </a>
                </Link>
                <Link to="/admin/editslider" onClick={handleLinkClick}>
                  <a>Edit Slider</a>
                </Link>
                <Link to="/admin/editrecentwork" onClick={handleLinkClick}>
                  <a>Edit Recent Work</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleAboutDropdown}>
                About Us
                <span className="custom-dropdown-btn">
                  {aboutDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  aboutDropdownOpen ? "active" : ""
                }`}
                style={{ display: aboutDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/editaboutpage" onClick={handleLinkClick}>
                  <a>Edit About Page</a>
                </Link>
                <Link to="/admin/editaboutvalue" onClick={handleLinkClick}>
                  <a>Edit About Value</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleGalleryDropdown}>
                Services
                <span className="custom-dropdown-btn">
                  {galleryDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  galleryDropdownOpen ? "active" : ""
                }`}
                style={{ display: galleryDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/editservicehead" onClick={handleLinkClick}>
                  Edit Services Head
                </Link>
                <Link to="/admin/editproblemhead" onClick={handleLinkClick}>
                  Edit Problem Head
                </Link>
                <Link to="/admin/editserviceproblems" onClick={handleLinkClick}>
                  Edit Services Problems
                </Link>
                <Link to="/admin/editsolutionhead" onClick={handleLinkClick}>
                  Edit Solution Head
                </Link>
                <Link to="/admin/editservicesolution" onClick={handleLinkClick}>
                  Edit Services Solution
                </Link>
                <Link to="/admin/editwhatyouget" onClick={handleLinkClick}>
                  Edit What You'll Get
                </Link>
              </div>

              <button className="dropdown-btn" onClick={handleNriDropdown}>
                Carrer
                <span className="custom-dropdown-btn">
                  {nriDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  nriDropdownOpen ? "active" : ""
                }`}
                style={{ display: nriDropdownOpen ? "block" : "none" }}
              >
                <Link to="/admin/editcarrerhead" onClick={handleLinkClick}>
                  <a>Edit Carrer Head</a>
                </Link>
                <Link to="/admin/editcarrerimages" onClick={handleLinkClick}>
                  <a>Edit Carrer Images</a>
                </Link>
                <Link to="/admin/editcarrerwys" onClick={handleLinkClick}>
                  <a>Edit Carrer What you see</a>
                </Link>
                <Link to="/admin/editcarrerrys" onClick={handleLinkClick}>
                  <a>Edit Carrer Raise your Hand</a>
                </Link>
                <Link to="/admin/editjobopening" onClick={handleLinkClick}>
                  <a>Edit Job Opening</a>
                </Link>
              </div>

              {/* --------------------------------------------------------------------------- */}
              <button className="dropdown-btn" onClick={handleContactDropdown}>
                Contact us
                <span className="custom-dropdown-btn">
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
                  <a>Edit Contact us</a>
                </Link>
                <Link to="/admin/editcontactform" onClick={handleLinkClick}>
                  <a>Edit Contact Form </a>
                </Link>
              </div>

              {/* =========================== */}
              <button className="dropdown-btn" onClick={handleProductsDropdown}>
                Products
                <span className="custom-dropdown-btn">
                  {productsDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  productsDropdownOpen ? "active" : ""
                }`}
                style={{ display: productsDropdownOpen ? "block" : "none" }}
              >
                <Link
                  className="dropdown-btn"
                  to="/admin/editproducts"
                  onClick={handleLinkClick}
                >
                  <a>Edit products </a>
                </Link>
                {/* <Link to="/admin/editproductsform" onClick={handleLinkClick}>
                  <a>Edit products Form </a>
                </Link> */}
              </div>
              <button className="dropdown-btn" style={{ marginLeft: "-10px" }}>
                <Link to="/admin/editheader" onClick={handleLinkClick}>
                  <a>Edit Header</a>
                </Link>
              </button>
              <button className="dropdown-btn" style={{ marginLeft: "-10px" }}>
                <Link to="/admin/editfooter" onClick={handleLinkClick}>
                  <a>Edit Footer</a>
                </Link>
              </button>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default Sidebar;
