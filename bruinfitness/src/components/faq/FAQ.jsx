import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CalloutText from '../common/CalloutText';
import WebPageHeader from '../common/WebPageHeader';
import "./FAQ.css";

function FAQ() {
    return (
            <div className="wrapper pt-2">
                <WebPageHeader header="FAQ"/>
                <FAQAccordion />
                <CalloutText />
            </div>
    )
}

function FAQAccordion() {
    return (
        <React.Fragment>
            <Accordion defaultActiveKey="0">
                <Card className="card-no-shadow text-white">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    What does a membership include
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="bg-dark">You get an all access pass to weights and gains</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="card-no-shadow text-white">
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    What if I don't know how to do the movements
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body  className="bg-dark">
                            Our coaches are equip to get you up to speed before you know it. 
                            If you don't feel quite ready for a movement our coaches will provide scaling options to ensure you still get the workout you intended for.
                            Alternatively, you can schedule private sessions with our coaches to get you feeling good in no time!
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="card-no-shadow text-white">
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                    What if I don't know how to do the movements
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body  className="bg-dark">
                            Our coaches are equip to get you up to speed before you know it. 
                            If you don't feel quite ready for a movement our coaches will provide scaling options to ensure you still get the workout you intended for.
                            Alternatively, you can schedule private sessions with our coaches to get you feeling good in no time!
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </React.Fragment>
    )
}

export default FAQ
