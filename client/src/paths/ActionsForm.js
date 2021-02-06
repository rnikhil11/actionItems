import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import Form from "@rjsf/core";
import TableFieldTemplate from "./tableFieldTemplate";
var moment = require("moment-business-days");

const ActionsForm = (props) => {
  const [actions, setActions] = useState([]);
  const [formData, setFormData] = useState(null);
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  useEffect(() => {
    axios.get("/actionItems").then(
      (resp) => setActions(resp.data),
      (err) => console.log(err)
    );
  }, []);
  useEffect(() => {
    let p;
    const actionData = [];
    for (p of participants) {
      let i = actions.findIndex((a) => a.username === p.username);
      if (i === -1) {
        actionData.push({ username: p.username });
      } else {
        actionData.push(actions[i]);
      }
    }
    setFormData({ actions: actionData });
  }, [actions]);

  const { username, role, participants } = props;

  const schema = {
    type: "object",
    properties: {
      actions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            actionItems: {
              type: "string",
            },
            startDate: {
              type: "string",
              format: "date",
              default: moment().format("YYYY-MM-DD"),
            },
            effortInDays: {
              type: "number",
              default: 5,
            },
            estCompletionDate: {
              type: "string",
              format: "date",
            },
            progress: {
              type: "number",
              default: 0,
            },
            status: {
              type: "string",
              enum: [
                "Not started",
                "In progress",
                "Completed",
                "Research",
                "Troubleshooting",
              ],
              default: "Not started",
            },
          },
          required: ["actionItems", "effortInDays", "status"],
          role: role,
          username: username,
        },
      },
    },
  };

  const uiSchema = {
    actions: {
      items: {
        username: {
          // "ui:readonly": true,
        },
        actionItems: {
          "ui:widget": "textarea",
          "ui:options": {
            maxRows: 3,
          },
        },
        estCompletionDate: {
          "ui:readonly": true,
        },
        progress: {
          "ui:readonly": true,
        },
      },
    },
  };
  const onSubmit = (data) => {
    console.log(data.formData);
    axios.post("/submitActions", data.formData).then(
      (res) => {
        console.log(res.data.mesg);
        setFormData(data.formData);
        setDownloadDisabled(false);
      },
      (err) => console.log(err)
    );
  };
  const columns = [
    {
      key: "username",
      label: "Participant",
    },
    {
      key: "actionItems",
      label: "Action Items",
    },
    {
      key: "startDate",
      label: "Start Date",
    },
    {
      key: "effortInDays",
      label: "Effort (in days)",
    },
    {
      key: "estCompletionDate",
      label: "Est. Completion Date",
    },
    { key: "progress", label: "% of Progress" },
    { key: "status", label: "Status" },
  ];
  const onChange = () => {
    setDownloadDisabled(true);
  };
  return (
    <>
      <Form
        {...{
          schema,
          uiSchema,
          onSubmit,
          formData,
          onChange,
          ArrayFieldTemplate: TableFieldTemplate,
        }}
      />
      {/* <Link to="/users">Go Home</Link> */}
      {downloadDisabled ? (
        <></>
      ) : (
        <button>
          <CSVLink data={formData.actions} headers={columns}>
            Download data
          </CSVLink>
        </button>
      )}
    </>
  );
};

export default ActionsForm;
