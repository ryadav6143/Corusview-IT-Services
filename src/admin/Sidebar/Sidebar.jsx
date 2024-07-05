import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("home")}
              >
                Home
                <span className="custom-dropdown-btn">
                  {activeDropdown === "home" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "home" ? "active" : ""
                }`}
              >
                <Link to="/admin/editheading" onClick={handleLinkClick}>
                  Edit Heading
                </Link>
                <Link to="/admin/editservices" onClick={handleLinkClick}>
                  Edit Services
                </Link>
                <Link to="/admin/editaboutus" onClick={handleLinkClick}>
                  Edit About Us
                </Link>
                <Link to="/admin/editslider" onClick={handleLinkClick}>
                  Edit Testimonials
                </Link>
                <Link to="/admin/editrecentwork" onClick={handleLinkClick}>
                  Edit Recent Work
                </Link>
                <Link to="/admin/recentworktitle" onClick={handleLinkClick}>
                  Edit Recent Title
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("about")}
              >
                About Us
                <span className="custom-dropdown-btn">
                  {activeDropdown === "about" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "about" ? "active" : ""
                }`}
              >
                <Link to="/admin/editaboutpage" onClick={handleLinkClick}>
                  Edit About Page
                </Link>
                <Link to="/admin/editaboutvalue" onClick={handleLinkClick}>
                  Edit About Value
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("services")}
              >
                Services
                <span className="custom-dropdown-btn">
                  {activeDropdown === "services" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "services" ? "active" : ""
                }`}
              >
                <Link to="/admin/editservicehead" onClick={handleLinkClick}>
                  Edit Heading
                </Link>
                <Link to="/admin/editproblemhead" onClick={handleLinkClick}>
                  Edit Problem Head
                </Link>
                <Link to="/admin/editsolutionhead" onClick={handleLinkClick}>
                  Edit Solution Head
                </Link>
                <Link to="/admin/editserviceproblems" onClick={handleLinkClick}>
                  Edit Problems
                </Link>
                <Link to="/admin/editservicesolution" onClick={handleLinkClick}>
                  Edit Solution
                </Link>
                <Link to="/admin/editwhatyouget" onClick={handleLinkClick}>
                  Edit What You'll Get
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("career")}
              >
                Career
                <span className="custom-dropdown-btn">
                  {activeDropdown === "career" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "career" ? "active" : ""
                }`}
              >
                <Link to="/admin/editcarrerhead" onClick={handleLinkClick}>
                  Edit Heading
                </Link>
                <Link to="/admin/createjobroles" onClick={handleLinkClick}>
                  Create Job Role
                </Link>
                <Link to="/admin/editcarrerimages" onClick={handleLinkClick}>
                  Edit Gallery
                </Link>
                <Link to="/admin/editcarrerrys" onClick={handleLinkClick}>
                  Edit Go Ahead
                </Link>
                <Link to="/admin/editcarrerwys" onClick={handleLinkClick}>
                  Edit Career What you see
                </Link>
                <Link to="/admin/editjobopening" onClick={handleLinkClick}>
                  Create Job Opening
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("contact")}
              >
                Contact Us
                <span className="custom-dropdown-btn">
                  {activeDropdown === "contact" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "contact" ? "active" : ""
                }`}
              >
                <Link to="/admin/editcontactus" onClick={handleLinkClick}>
                  Edit Contact Us
                </Link>
                <Link to="/admin/editcontactform" onClick={handleLinkClick}>
                  Contact Entries
                </Link>
              </div>

              <button
                className="dropdown-btn"
                onClick={() => handleDropdown("products")}
              >
                Products
                <span className="custom-dropdown-btn">
                  {activeDropdown === "products" ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  activeDropdown === "products" ? "active" : ""
                }`}
              >
                <Link to="/admin/editproducts" onClick={handleLinkClick}>
                  Add Products
                </Link>
              </div>

              <button className="dropdown-btn" style={{ marginLeft: "-10px" }}>
                <Link to="/admin/editheader" onClick={handleLinkClick}>
                  Edit Header
                </Link>
              </button>
              <button className="dropdown-btn" style={{ marginLeft: "-10px" }}>
                <Link to="/admin/editfooter" onClick={handleLinkClick}>
                  Edit Footer
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
