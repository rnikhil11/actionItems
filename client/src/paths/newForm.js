import React, { useState } from "react";
import Form from "@rjsf/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./styles.css";
import { TimeWidget } from "./widgets/time";

const NewForm = () => {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const schema = {
    type: "object",
    properties: {
      title: { type: "string", title: "Title" },
      description: { type: "string", title: "Description" },

      content: {
        title: "Questions",

        type: "array",
        items: {
          type: "object",
          properties: {
            question: {
              title: "Question",
              type: "string",
            },
          },
          anyOf: [
            {
              title: "Short answer",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    shortAnswer: {
                      type: "string",
                    },
                    ansType: {
                      type: "number",
                      default: 1,
                    },
                  },
                },
              },
            },
            {
              title: "Long answer",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    longAnswer: {
                      type: "string",
                    },
                    ansType: {
                      type: "number",
                      default: 2,
                    },
                  },
                },
              },
            },
            {
              title: "Multiple choice",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    options: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          option: {
                            type: "string",
                          },
                        },
                      },
                    },
                    ansType: {
                      type: "number",
                      default: 3,
                    },
                  },
                },
              },
            },
            {
              title: "checkboxes",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    options: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          option: {
                            type: "string",
                          },
                        },
                      },
                    },
                    ansType: {
                      type: "number",
                      default: 4,
                    },
                  },
                },
              },
            },
            {
              title: "Dropdown",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    options: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          option: {
                            type: "string",
                          },
                        },
                      },
                    },
                    ansType: {
                      type: "number",
                      default: 5,
                    },
                  },
                },
              },
            },
            {
              title: "fileUpload",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    fileUpload: {
                      type: "string",
                      format: "data-url",
                      title: "Single file",
                    },
                    ansType: {
                      type: "number",
                      default: 6,
                    },
                  },
                },
              },
            },
            {
              title: "linear scale",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    minimum: {
                      type: "integer",
                    },
                    maximum: {
                      type: "integer",
                    },
                    step: {
                      type: "integer",
                    },
                    ansType: {
                      type: "number",
                      default: 7,
                    },
                  },
                },
              },
            },
            {
              title: "date",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    date: {
                      type: "string",
                      format: "date",
                    },
                    ansType: {
                      type: "number",
                      default: 8,
                    },
                  },
                },
              },
            },
            {
              title: "time",
              properties: {
                answer: {
                  title: "",

                  type: "object",
                  properties: {
                    time: {
                      type: "string",
                      format: "time",
                    },
                    ansType: {
                      type: "number",
                      default: 9,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  };

  const widgets = { timeWidget: TimeWidget };
  const uiSchema = {
    content: {
      items: {
        answer: {
          ansType: {
            "ui:widget": "hidden",
          },
          shortAnswer: {
            "ui:widget": "textarea",
            "ui:options": {
              label: false,
              rows: 1,
            },
            "ui:disabled": true,
          },
          longAnswer: {
            "ui:widget": "textarea",
            "ui:options": { label: false, rows: 2 },
            "ui:disabled": true,
          },
          linearScale: {
            "ui:widget": "range",
            "ui:options": { label: false },
            "ui:disabled": true,
          },
          checkboxes: {
            "ui:widget": "checkboxes",
            "ui:options": { label: false },
            "ui:disabled": true,
          },
          mcq: {
            "ui:widget": "radio",
            "ui:options": { label: false },
            "ui:disabled": true,
          },
          dropdown: {
            "ui:widget": "select",
            "ui:options": { label: false },
            "ui:disabled": true,
          },
          date: {
            "ui:disabled": true,
            "ui:options": { label: false },
          },
          time: {
            "ui:widget": "timeWidget",
            "ui:disabled": true,
            "ui:options": { label: false },
          },
        },
      },
    },
  };
  const onChange = (val) => {
    console.log("change!!!");
    console.log(val);
    setFormData(val.formData);
  };
  const submit = (val) => {
    console.log("submitting" + val);
    axios.post("/newForm", formData).then(
      (response) => {
        console.log(response.data.mesg);

        // axios
        //   .post("/newFormData", { params: { id: response.data.formId } })
        //   .then(
        //     (res) => {
        //       console.log(res.data);
        //     },
        //     (err) => console.log("error: " + err)
        //   );

        history.push("/success/1");
      },
      (err) => console.log(err)
    );
  };
  console.log(formData);
  console.log(schema);
  return (
    <div>
      <Form
        schema={schema}
        onChange={(val) => onChange(val)}
        formData={formData}
        onSubmit={() => submit(formData)}
        uiSchema={uiSchema}
        widgets={widgets}
      />
    </div>
  );
};

export default NewForm;
