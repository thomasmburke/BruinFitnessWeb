import React from "react";
import ScheduleTable from "./ScheduleTable";
import CalloutText from "../common/CalloutText";
import ScheduleDatePicker from "./ScheduleDatePicker";

function Schedule() {
  return (
    <div className="wrapper">
      <ScheduleDatePicker />
      <ScheduleTable />
      <CalloutText />
    </div>
  );
}

export default Schedule;
