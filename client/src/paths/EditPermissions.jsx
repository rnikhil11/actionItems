import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "@rjsf/core";

const EditPermissions = () => {
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
    axios.post("/setHosts", formProps.formData).then(
      (resp) => console.log(resp),
      (err) => console.log(err)
    );
  };
  const schema = {
    type: "object",
    properties: {
      users: {
        type: "array",
        title: "Choose hosts",
        items: {
          type: "string",
          enum: participants?.map((p) => p.username.split(".")[2]),
        },
        uniqueItems: true,
      },
    },
  };
  const formData = participants
    ?.filter((p) => p.host)
    .map((p) => p.username.split(".")[2]);
  console.log(formData);
  const uiSchema = { users: { "ui:widget": "checkboxes" } };
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={{ users: formData }}
      onSubmit={onSubmit}
    />
  );
};

export default EditPermissions;
