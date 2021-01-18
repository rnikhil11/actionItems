import React from "react";
import { useParams } from "react-router-dom";

const Success = () => {
  const { successId: id } = useParams();
  let action = "";
  switch (id) {
    case "1":
      action = "created";
      break;
    case "2":
      action = "submitted";
      break;
    default:
      return <></>;
  }
  return (
    <>
      <h6>Form has been succesfully {action}!</h6>
    </>
  );
};
export default Success;
