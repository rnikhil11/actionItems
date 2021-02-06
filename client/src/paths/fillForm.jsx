import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Form from "@rjsf/core";
import { useHistory } from "react-router-dom";

const FillForm = () => {
  const [formInfo, setFormInfo] = useState({});
  const [ready, setReady] = useState(false);
  const { key: formKey } = useParams();

  const history = useHistory();
  console.log(formKey);
  useEffect(() => {
    axios.get("/fillForm", { params: { id: formKey } }).then(
      (res) => {
        setFormInfo(res.data);
        setReady(true);
      },
      (err) => console.log("error: " + err)
    );
  }, []);
  console.log(formInfo);
  const getAnswerType = (num) => {
    switch (num) {
      case 1:
        return "string";
      case 2:
        return "string";
      case 3:
        return "string";
      case 4:
        return "array";
      case 5:
        return "number";
      case 6:
        return "string";
      // format: "data-url",";
      case 7:
        return "integer";
      case 8:
        return "string";
      case 9:
        return "string";
      // case 10:
      //   return "";
      // case 11:
      //   return "";
      default:
        return "string";
    }
  };
  const getFormatType = (num) => {
    switch (num) {
      case 6:
        return "data-url";

      case 8:
        return "date";
      case 9:
        return "time";
      // case 10:
      //   return "";
      // case 11:
      //   return "";
      default:
        return undefined;
    }
  };
  const getUiSchema = (x) => {
    switch (x.answer.ansType) {
      case 1:
        return {};
      case 2:
        return {
          "ui:widget": "textarea",
          "ui:options": { rows: 2 },
        };
      case 3:
        return {
          "ui:widget": "radio",
        };
      case 4:
        return {
          "ui:widget": "checkboxes",
        };
      case 5:
        return {
          "ui:widget": "select",
        };
      case 6: {
        //fileupload
        return {};
      }
      case 7: //linearscale
        return {
          "ui:widget": "range",
        };
      case 8:
        return {};

      case 9:
        return {
          "ui:widget": "timeWidget",
        };
      default:
        return {
          "ui:widget": "textarea",
        };
    }
  };
  const getSchema = (x) => {
    console.log(x);
    let itemSchema = {
      title: x.question,
      type: getAnswerType(x.answer.ansType),
      format: getFormatType(x.answer.ansType),
      enum: x.answer.options?.map((o) => o.option),
      enumNames: x.answer.options?.map((o) => o.option),
      minimum: x?.answer?.minimum,
      maximum: x?.answer?.maximum,
      step: x?.answer?.step,
    };
    switch (x.answer.ansType) {
      case 1:
      case 2:
      case 4:
        return {
          ...itemSchema,
          items: {
            type: "string",
            enum: x.answer.options?.map((o) => o.option),
          },
          uniqueItems: true,
        };
      case 3:
      case 5:
      case 6:
      case 7:
      case 8:
      default:
        return itemSchema;
    }
  };
  let schema = { type: "object", properties: {} };
  let uiSchema = {};
  const submit = (val) => {
    console.log(val.formData);
    const data = Object.keys(val.formData).map((x) => val.formData[x]);
    axios.post("/completeForm", { id: formKey, data }).then(
      (response) => {
        console.log(response);
        history.push("/success/2");
      },
      (err) => console.log(err)
    );
  };
  const onChange = (val) => {
    console.log(val);
  };
  if (ready) {
    formInfo?.content?.forEach((x, idx) => {
      schema = {
        ...schema,
        properties: {
          ...schema.properties,
          [idx]: getSchema(x),
        },
      };
      uiSchema[idx] = getUiSchema(x);
    });
    console.log(schema);

    return (
      <div>
        <h3>{formInfo.title}</h3>
        <h5>{formInfo.description}</h5>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onChange={onChange}
          onSubmit={submit}
          noValidate={true}
        />
      </div>
    );
  }
  return <></>;
};

export default FillForm;
