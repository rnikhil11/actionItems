import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CalendarView from "./CalendarView";
import EditActions from "./editActions";
import axios from "axios";

const MeetingNotes = (props) => {
  const [meetingActions, setMeetingActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  console.log(props);

  return (
    <Tabs>
      <TabList>
        <Tab>Meeting Notes</Tab>
        <Tab>Calendar</Tab>
      </TabList>

      <TabPanel>
        <Tabs>
          <TabList>
            <Tab>Action Items</Tab>
            <Tab>View in calendar</Tab>
          </TabList>

          <TabPanel>
            <EditActions {...props} />
          </TabPanel>
          <TabPanel>
            {axios.get(
              "/actionItems",
              { params: { meetingId: 0 } },
              (resp) => {
                setMeetingActions(resp.data);
              },
              (err) => console.log(err)
            )}
            <CalendarView actions={meetingActions} meeting={true} />
          </TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>
        <CalendarView actions={allActions} />
      </TabPanel>
    </Tabs>
  );
};
export default MeetingNotes;
