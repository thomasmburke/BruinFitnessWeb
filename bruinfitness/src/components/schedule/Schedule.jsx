import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthCheck } from "reactfire";
import CalloutText from "../common/CalloutText";
import WebPageHeader from "../common/WebPageHeader";
import ReservationTable from "./ReservationTable";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleTable from "./ScheduleTable";
import WorkoutTabs from "./WorkoutTabs";

function Schedule() {
  return (
    <div className="wrapper">
      <ScheduleDatePicker />
      <WebPageHeader header="General Class Schedule" />
      <ScheduleTable />
      <br />
      <AuthCheck >
          <Row>
            <Col xs={12} lg={6}>
            <WebPageHeader header="Reserve A Class" />
              <ReservationTable />
            </Col>
            <Col xs={12} lg={6}>
              <WorkoutTabs />
            </Col>
          </Row>
      </AuthCheck>
      <WebPageHeader header="Upcoming Holiday Hours" />
      <p className="text-center">12/24 Christmas Eve: 8am - 12pm</p>
      <p className="text-center">12/25 Christmas: 8am - 12pm</p>
      <p className="text-center">12/31 New Years Eve: 8am - 12pm</p>
      <p className="text-center">01/01 New Years: 12pm - 6pm</p>
      <CalloutText />
    </div>
  );
}

export default Schedule;
