import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
const ViewData = () => {
  const [data, setData] = useState(null);
  const { formId } = useParams();
  useEffect(() => {
    axios.get("/viewData", { params: { formId } }).then(
      (res) => {
        console.log(res);
        setData(res.data);
      },
      (err) => console.log("error: " + err)
    );
  }, []);

  return <></>;
};
export default ViewData;
