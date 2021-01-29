import React from "react";
import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { AuthCheck } from "reactfire";
import CalloutText from "../common/CalloutText";
import ReservationTable from "./ReservationTable";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleTable from "./ScheduleTable";
import WorkoutTabs from "./WorkoutTabs";

function Schedule() {
  return (
    <div className="wrapper">
      <ScheduleDatePicker />
      <ScheduleTable />
      <br />
      <AuthCheck >
        {/* <Container> */}
          <Row>
            <Col xs={12} md={6}>
              <ReservationTable />
            </Col>
            <Col xs={12} md={6}>
              <WorkoutTabs />
            </Col>
          </Row>
        {/* </Container> */}
      </AuthCheck>
      <CalloutText />
    </div>
  );
}

export default Schedule;
