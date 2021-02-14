import React from "react";
import ActionsForm from "./ActionsForm";

const EditActions = (props) => {
  const { role, participants, username, meetingId } = props.location.state;
  if (!["host", "guest"].includes(role)) {
    return <></>;
  }

  return <ActionsForm {...{ username, role, participants, meetingId }} />;
};
export default EditActions;
