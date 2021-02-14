import React from "react";
import { useDispatch } from "react-redux";
import actions from "../redux/actions/index";
import axios from "axios";

import { Link } from "react-router-dom";

const isHost = (id) => {
  return id === 1 ? true : false;
};
const NotFound = () => {
  const dispatch = useDispatch();
  const setParticipants = (p) => dispatch(actions.setParticipants(p));
  axios.get("https://jsonplaceholder.typicode.com/users").then(
    (res) => {
      console.log(res);
      setParticipants(
        res.data.map((p) => ({
          id: p.id,
          name: p.name,
          email: p.email,
          host: isHost(p.id),
        }))
      );
    },
    (err) => console.log(err)
  );
  return (
    <div class="container">
      <h1>Meeting Notes</h1>
      <h6>
        <Link to="/users">Select participant</Link>
      </h6>
      {/* <br />
    <Link to="/calendarView">View calendar</Link> */}
    </div>
  );
};

export default NotFound;
