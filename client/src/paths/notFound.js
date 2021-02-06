import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h1>Home</h1>
    <Link to="/users">Select user</Link>
    <br />
    <Link to="/calendarView">View calendar</Link>
  </div>
);

export default NotFound;
