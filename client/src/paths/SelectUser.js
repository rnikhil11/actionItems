import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "@rjsf/core";

const SelectUser = () => {
  const history = useHistory();

  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    axios.get("/participants").then(
      (resp) => setParticipants(resp.data),
      (err) => console.log(err)
    );
  }, []);

  console.log(participants);
  const onSubmit = (formProps) => {
    console.log(formProps.formData);
    const selectedUser = participants.find(
      (x) => x.id === formProps.formData.user
    );
    console.log(selectedUser);
    history.push({
      pathname: "/editActions",
      state: {
        role: selectedUser.host ? "host" : "guest",
        username: selectedUser.username,
        participants: participants,
      },
    });
  };
  const schema = {
    type: "object",
    properties: {
      user: {
        type: "number",
        title: "Select User",
        enum: participants.map((p) => p.id),
        enumNames: participants.map((p) => p.username),
      },
    },
  };
  const uiSchema = {};
  return <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />;
};

export default SelectUser;
