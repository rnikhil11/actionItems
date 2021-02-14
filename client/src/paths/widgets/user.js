import React from "react";
import _capitalize from "lodash/capitalize";
import Avatar from "react-avatar";
import sha256 from "crypto-js/sha256";
import crypto from "crypto-js";
const User = (props) => {
  console.log(props);
  const name = props.value;
  // const [dept, role, name] = props.value.split(".");

  if (!name) {
    return <></>;
  }
  const color = "#" + sha256(name).toString(crypto.enc.Hex).substr(0, 6);
  return (
    <>
      <h6>
        <Avatar color={color} name={name} size={20} round={true} /> {name}
      </h6>
      {/* <div className={"small"}>{role}</div>
      <div className={"small"}>{"@" + dept}</div> */}
    </>
  );
};
export default User;
