import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import widgets from "./widgets";

import Form from "@rjsf/core";
import TableFieldTemplate from "./tableFieldTemplate";
var moment = require("moment-business-days");

const transform = (data, meetingId) => {
  const userActions = {};

  const actions = data?.map((row, idx) => {
    if (!row.username) {
      userActions[data[idx - 1].username] = {
        ...row,
        username: data[idx - 1].username,
      };
      return {
        ...row,
        username: data[idx - 1].username,
        isNew: true,
        meetingId,
      };
    } else {
      userActions[row.username] = row;
      return { ...row, meetingId };
    }
  });
  return { userActions, actions };
};
const ActionsForm = (props) => {
  const [actions, setActions] = useState([]);
  const [formData, setFormData] = useState(null);
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  useEffect(() => {
    axios.get("/getUserActions").then(
      (resp) => setActions(resp.data),
      (err) => console.log(err)
    );
  }, []);
  let { username, role, participants, meetingId } = props;
  console.log(props);

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
              default: "",
            },
            actionItems: {
              type: "string",
              default: "",
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
            actualCompletionDate: {
              type: "string",
              format: "date",
            },
            progress: {
              type: "number",
              default: 0,
            },
            priority: {
              type: "string",
              enum: ["Low", "Medium", "High"],
              default: "Medium",
            },
            environment: {
              type: "string",
              enum: [
                "Planning",
                "Development",
                "Staging",
                "Test",
                "Production",
              ],
              default: "Planning",
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
            assignedBy: {
              type: "number",
              enum: participants.map((p) => p.id),
              enumNames: participants.map((p) => p.name),
              default: participants[0].id,
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
          "ui:widget": "user",
        },
        startDate: {
          "ui:widget": "startDate",
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
        actualCompletionDate: {
          "ui:readonly": true,
        },
        progress: {
          "ui:readonly": true,
        },
        // priority: {
        //   "ui:widget": "priority",
        // },
      },
    },
  };
  const onSubmit = (data) => {
    console.log(data.formData);
    const {
      userActions: submitUserActions,
      actions: submitActions,
    } = transform(data.formData.actions, meetingId);
    console.log(submitUserActions);
    console.log(submitActions);
    axios.post("/submitActions", { actions: submitActions }).then(
      (res) => {
        console.log(res.data.mesg);
        setFormData({ actions: submitActions });
        setDownloadDisabled(false);
      },
      (err) => console.log(err)
    );
    axios
      .post("/submitUserActions", { actions: Object.values(submitUserActions) })
      .then(
        (res) => {
          console.log(res.data.mesg);
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
          widgets,
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
