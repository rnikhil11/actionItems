import { useEffect, useState } from "react";
import axios from "axios";
import Form from "@rjsf/core";
import { useHistory } from "react-router-dom";

const ChooseData = () => {
  const [formList, setFormList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("/chooseForm").then(
      (response) => setFormList(JSON.parse(response.request.response)),
      (err) => console.log(err)
    );
  }, []);

  console.log(formList.length);
  const onSubmit = (val) => {
    console.log(val.formData.form);
    history.push("./viewData/" + val.formData.form);
  };
  const schema = {
    type: "object",
    properties: {
      form: {
        type: "string",
        title: "Select form",
        enum: formList?.map((f) => f._id),
        enumNames: formList?.map((f) => f?.title),
      },
    },
  };
  return <Form schema={schema} onSubmit={onSubmit} />;
};

export default ChooseData;
