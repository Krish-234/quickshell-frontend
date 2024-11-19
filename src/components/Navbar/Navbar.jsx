import React, { useState } from "react";
import { Display, Down } from "../../assets/images";
import "./Navbar.css";

const Navbar = ({setSelectedGroup, setSelectedOrder, selectedGroup, selectedOrder}) => {
  const [display, setDisplay] = useState(false);

  const handleGroupSelection = (e) => {
    setSelectedGroup(e.target.value);
    setDisplay(false);
    console.log("group is",e.target.value);
  };

  const handleOrderSelection = (e) => {
    setSelectedOrder(e.target.value);
    setDisplay(false);
    console.log("Order is",e.target.value);
  };

  return (
    <div className="app_navbar-container">
      <button
        className="app_navbar-btn"
        onClick={() => {
          setDisplay(!display);
        }}
      >
        <img src={Display} alt="" />
        Display
        <img src={Down} alt="" />
      </button>
      {display && (
        <div className="navbar_dropdown-menu">
          <div className="navbar_dropdown-data">
            <span>Grouping:</span>
            <select value={selectedGroup}  onChange={handleGroupSelection}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="navbar_dropdown-data">
            <span>Ordering:</span>
            <select value={selectedOrder} onChange={handleOrderSelection}>
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
