import React from "react";
import DateWidget from "@rjsf/core/lib/components/widgets/DateWidget";
import { Link } from "react-router-dom";

const StartDateWidget = (props) => {
  const { disabled, onChange, value } = props;
  const addDependencyClick = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <row>
        <DateWidget {...props} />
      </row>
      <row>
        <Link onClick={addDependencyClick}>Add Dependency</Link>
      </row>
    </>
  );
};

export default StartDateWidget;
