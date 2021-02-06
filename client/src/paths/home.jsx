import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Link to={"/newForm"}>
        <button>Create new form</button>
      </Link>
      <Link to={"/chooseForm"}>
        <button>Fill existing form</button>
      </Link>
    </div>
  );
};

export default Home;
