import React, { Suspense } from "react";
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
      <Suspense fallback={<span>Loading...</span>}>
        <ReservationTable />
      </Suspense>
      <CalloutText />
    </div>
  );
}

export default Schedule;
