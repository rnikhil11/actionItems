import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CalendarView from "./CalendarView";
import EditActions from "./editActions";
import EditPermissions from "./EditPermissions";
import moment from "moment";
const MeetingNotes = (props) => {
  const [meetingActions, setMeetingActions] = useState([]);
  const [allActions, setAllActions] = useState([]);

  const { meetingId } = props.location.state;
  return (
    <div>
      <h3>{`MEETING NOTES ${moment().format("MMM DD YYYY")}`}</h3>
      <Tabs>
        <TabList>
          <Tab>Meeting Notes</Tab>
          <Tab>Calendar</Tab>
          <Tab>Permissions</Tab>
        </TabList>

        <TabPanel>
          <Tabs>
            <TabList>
              <Tab>Action Items</Tab>
              <Tab>View in calendar</Tab>
            </TabList>

            <TabPanel className={"container .mr-md-3"}>
              <EditActions {...props} />
            </TabPanel>
            <TabPanel>
              <CalendarView meetingActions={true} meetingId={meetingId} />
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <CalendarView userActions={true} />
        </TabPanel>
        <TabPanel>
          <EditPermissions />
        </TabPanel>
      </Tabs>
    </div>
  );
};
export default MeetingNotes;
