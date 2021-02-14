import React from "react";
import Select from "react-select";
const Priority = (props) => {
  console.log(props);
  switch (props.value) {
    case "Low":
      return (
        <span {...props} className={"badge badge-pill badge-warning"}>
          Low
        </span>
      );
    case "High":
      return (
        <span {...props} className={"badge badge-pill badge-danger"}>
          High
        </span>
      );
    case "Medium":
    default:
      return (
        <span {...props} className={"badge badge-pill badge-success"}>
          Medium
        </span>
      );
  }
};
export default Priority;
