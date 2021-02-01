import React from "react";
import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
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
        {/* <Container> */}
          <Row>
            <Col xs={12} lg={6}>
            <WebPageHeader header="Reserve A Class" />
              <ReservationTable />
            </Col>
            <Col xs={12} lg={6}>
              
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
