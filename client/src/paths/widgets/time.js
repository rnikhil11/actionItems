import React from "react";
import TimePicker from "react-time-picker";

export const TimeWidget = (props) => {
  const { disabled, onChange, value } = props;

  return <TimePicker onChange={onChange} value={value} disabled={disabled} />;
};
