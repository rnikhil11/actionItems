import React from "react";
const Users = () => {
  fetch("/users")
    .then((val) => val.json())
    .then((val) => console.log(val));
  return <></>;
};

export default Users;
