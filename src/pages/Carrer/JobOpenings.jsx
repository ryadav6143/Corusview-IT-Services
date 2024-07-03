import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentJobOpenings, getRoles } from "../FrontendServices/Services";
import "./JobOpenings.css";
import clr from "../../assets/logos/clear.png";

function JobOpenings() {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getJobRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const getJobOpenings = async () => {
    const data = await currentJobOpenings();
    setJobOpenings(data);
  };

  useEffect(() => {
    getJobOpenings();
    getJobRoles();
  }, []);

  // Filter job openings based on selected role or search term
  const filteredJobOpenings = jobOpenings.filter(
    (job) =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div className="job-board">
        <div className="inner-job-board">
          <div className="board-heading">
            <p>Job Openings</p>
          </div>
          <div className="all-openings">
            <div className="search-bar">
              <div>
                <input
                  type="text"
                  placeholder="Search by job role, level, or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="all-roles">
              {roles.map((role) => (
                <button key={role.id} onClick={() => setSearchTerm(role.role)}>
                  {role.role}
                </button>
              ))}
            </div>
          </div>
          <div>
            {filteredJobOpenings.map((job) => (
              <div key={job.id} className="current-job-openings">
                <div className="job-role">
                  <p>{job.role}</p>
                </div>
                <div className="position">
                  <div>
                    <p>
                      {job.position}-<span>{job.level}</span>
                    </p>
                    <p className="job-location">{job.location}</p>
                  </div>
                  <div>
                    <button className="apply-btn">
                      <Link to="/contact">Apply</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobOpenings;
