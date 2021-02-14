import React from "react";

// interface PermissionProps{
//     component: any;
//     requiredUsername: String;
//     currentUsername: String;
// }
const Permission = (props) => {
  const { requiredUsername, currentUsername, component, role } = props;
  if (!requiredUsername) {
    return component;
  }
  if (role === "host") {
    return component;
  } else if (requiredUsername !== currentUsername) {
    return <></>;
  } else {
    return component;
  }
};
export default Permission;
