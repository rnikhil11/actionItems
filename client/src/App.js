import React from "react";
import { Switch, Route } from "react-router-dom";
import { EditActions, NotFound } from "./paths";
import CalendarView from "./paths/CalendarView";
import MeetingNotes from "./paths/MeetingNotes";
import SelectUser from "./paths/SelectUser";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/users" component={SelectUser}></Route>
        <Route path="/editActions" component={EditActions}></Route>
        <Route path="/calendarView" component={CalendarView}></Route>
        <Route path="/meetingNotes" component={MeetingNotes}></Route>
        <Route path="/" component={NotFound}></Route>
      </Switch>
    </>
  );
};

export default App;
