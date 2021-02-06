import React from "react";
import _capitalize from "lodash/capitalize";
import Avatar from "react-avatar";

const User = (props) => {
  console.log(props);
  const [dept, role, name] = props.value.split(".");
  return (
    <>
      <h6>
        <Avatar
          color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
          name={_capitalize(name)}
          size={20}
          round={true}
        />{" "}
        {_capitalize(name)}
      </h6>
      <div className={"small"}>{role}</div>
      <div className={"small"}>{"@" + dept}</div>
    </>
  );
};
export default User;
