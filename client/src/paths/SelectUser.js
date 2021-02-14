import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

import axios from "axios";
import Form from "@rjsf/core";

const SelectUser = () => {
  const history = useHistory();

  const participants = useSelector((state) => state?.meeting?.participants);

  console.log(participants);
  const onSubmit = (formProps) => {
    console.log(formProps.formData);
    const selectedUser = participants.find(
      (x) => x.id === formProps.formData.user
    );
    console.log(selectedUser);
    history.push({
      pathname: "/meetingNotes",
      state: {
        role: selectedUser.host ? "host" : "guest",
        username: selectedUser.name,
        participants: participants.map((x) => ({ ...x, username: x.name })),
        meetingId: nanoid(),
      },
    });
  };
  const schema = {
    type: "object",
    properties: {
      user: {
        type: "number",
        title: "Select Participant",
        enum: participants?.map((p) => p.id),
        // enumNames: participants?.map((p) => p.username.split(".")[2]),
        enumNames: participants?.map((p) => p.name),
      },
    },
  };
  const uiSchema = {};
  return (
    <div class="container">
      <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />
    </div>
  );
};

export default SelectUser;
