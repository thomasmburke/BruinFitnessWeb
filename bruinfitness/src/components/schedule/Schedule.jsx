import React from "react";
import ScheduleTable from "./ScheduleTable";
import CalloutText from "../common/CalloutText";

function Schedule() {
  return (
    <div className="wrapper">
      <ScheduleTable />
      <CalloutText />
    </div>
  );
}

export default Schedule;
