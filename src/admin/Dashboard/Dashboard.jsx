import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import logo from "../../assets/logos/corusview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Dashboard({ onLogout }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: "5em",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          {" "}
          <div className="admin-header fixed-top">
            <div>
              <img className="admin-logo" src={logo} alt="" />
            </div>
            <div id="logout-btn">
              <button onClick={onLogout}>
                <FontAwesomeIcon
                  className="set-icon"
                  icon={faRightFromBracket}
                />
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            position: "relative",
            margin: 0,
            height: "85vh",
            width: "100%",
          }}
        >
          <div
            style={{
              maxWidth: "17%",
              flexShrink: 0,
              textAlign: "left",
              // overflowY: "auto",
              // overflowX: "hidden",
              //   position:"fixed"
            }}
          >
            <Sidebar />
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              marginTop: "3%",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
