import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import _capitalize from "lodash/capitalize";
import Avatar from "react-avatar";
import axios from "axios";
var CryptoJS = require("crypto-js");

const CalendarView = (props) => {
  const [actionsList, setActionsList] = useState([]);
  const [actions, setActions] = useState([]);
  useEffect(() => {
    if (props.meeting) {
      setActions(props.actions);
      console.log(props.actions);
    } else {
      axios.get("/actionItems").then(
        (resp) => {
          setActions(resp.data);
          console.log(">>");
        },
        (err) => console.log(err)
      );
    }
  }, []);

  useEffect(() => {
    setActionsList(
      actions?.map((a, idx) => {
        const {
          actionItems: title,
          startDate: start,
          estCompletionDate: end,
          ...remaining
        } = a;
        var hash =
          "#" + CryptoJS.MD5(remaining.username).toString().substr(0, 6);

        console.log(hash);
        return {
          id: idx,
          title: (
            <>
              <Avatar
                color={hash}
                name={_capitalize(remaining.username.split(".")[2])}
                size={20}
                round={true}
              />{" "}
              {title}
            </>
          ),
          start: new Date(start),
          end: new Date(end),
          allDay: true,
          resource: remaining,
        };
      })
    );
  }, [actions]);

  console.log(actionsList);

  const localizer = momentLocalizer(moment);
  let allViews = Object.keys(Views).map((k) => Views[k]);

  console.log(allViews);
  return actionsList?.length === 0 ? (
    <></>
  ) : (
    <>
      <Calendar
        defaultView={"work_week"}
        views={["work_week", "month"]}
        localizer={localizer}
        events={actionsList}
        startAccessor="start"
        endAccessor="end"
        popup={true}
        // components={{
        //   timeSlotWrapper: () => <></>,
        //   // eventWrapper: (eventWrapperProps) => {
        //   //   console.log(eventWrapperProps);
        //   //   const style = {
        //   //     border: "4px solid",
        //   //     borderColor:
        //   //       eventWrapperProps.event.start.getHours() % 2 === 0
        //   //         ? "green"
        //   //         : "red",
        //   //     padding: "5px",
        //   //   };
        //   //   return <div style={style}>{eventWrapperProps.children}</div>;
        //   // },
        // }}
        style={{ height: 500 }}
      />
    </>
  );
};

export default CalendarView;
