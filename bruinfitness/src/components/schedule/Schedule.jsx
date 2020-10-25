import React from "react";
import ScheduleTable from "./ScheduleTable";
import CalloutText from "../common/CalloutText";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ReservationTable from "./ReservationTable";

function Schedule() {
  return (
    <div className="wrapper">
      <ScheduleDatePicker />
      <ScheduleTable />
      <br />
      <ReservationTable />
      <CalloutText />
    </div>
  );
}

export default Schedule;
