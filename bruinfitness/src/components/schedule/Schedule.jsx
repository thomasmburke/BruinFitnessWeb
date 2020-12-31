import React from "react";
import { AuthCheck } from "reactfire";
import CalloutText from "../common/CalloutText";
import ReservationTable from "./ReservationTable";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleTable from "./ScheduleTable";

function Schedule() {
  return (
    <div className="wrapper">
      <ScheduleDatePicker />
      <ScheduleTable />
      <br />
      <AuthCheck>
        <ReservationTable />
      </AuthCheck>
      <CalloutText />
    </div>
  );
}

export default Schedule;
