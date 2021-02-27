import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from "react-bootstrap/Card";
import CalloutText from '../common/CalloutText';
import WebPageHeader from '../common/WebPageHeader';
import "./FAQ.css";

function FAQ() {
    return (
            <div className="wrapper pt-2">
                <WebPageHeader header="FREQUENTLY ASKED QUESTIONS"/>
                <FAQAccordion />
                <CalloutText />
            </div>
    )
}

function AccordionToggle({eventKey, faqQuestion, callback}) {
    const currentEventKey = useContext(AccordionContext);
    const onClickToggle = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
      );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
        <React.Fragment>
            <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={onClickToggle} style={{whiteSpace: "pre-wrap"}} className="py-3">
                { isCurrentEventKey ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} /> }{`\t${faqQuestion}`}
            </Accordion.Toggle>
        </React.Fragment>
    )
}


function FAQAccordion() {
    return (
        <React.Fragment>
            <Accordion>
                <Card className="card-no-shadow text-white">
                    <AccordionToggle eventKey="0" faqQuestion="What does a membership include?"/>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body className="bg-dark">You get an all access pass to weights and gains</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="card-no-shadow text-white">
                    <AccordionToggle eventKey="1" faqQuestion="What if I don't know how to do the movements?"/>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body  className="bg-dark">
                            Our coaches are equip to get you up to speed before you know it. 
                            If you don't feel quite ready for a movement our coaches will provide scaling options to ensure you still get the workout you intended for.
                            Alternatively, you can schedule private sessions with our coaches to get you feeling good in no time!
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="card-no-shadow text-white">
                <AccordionToggle eventKey="2" faqQuestion="What if I don't know how to do the movements?"/>
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
