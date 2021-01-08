import React from 'react';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./WorkoutTabs.css";

function WorkoutTabs() {
    const text = "WORKOUT\n4 SETS FOR QUALITY\n3/3DB Turkish Get-Ups\n12/12 Tempo Supported DB Row\n1:00 DB Front Rack Hold\n30 Weighted Sit-Ups"
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={4}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Metcon</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Weightlifting</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="third">Kettlebell</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div style={{whiteSpace: "pre-wrap"}}>
                                {/* may want pre-line instead */}
                                {/* make text section a fixed size for certain screen sizes and potentially make it scrollable */}
                                <p>{text}</p>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        <p>Against my love shall be as I am now, With Time's injurious hand crush'd and o'erworn; When hours have drain'd his blood and fill'd his brow With lines and wrinkles; when his youthful morn Hath travell'd on to age's steepy night; And all those beauties whereof now he's king Are vanishing, or vanished out of sight, Stealing away the treasure of his spring; For such a time do I now fortify Against confounding age's cruel knife,</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                        <p>Unthrifty loveliness, why dost thou spend Upon thy self thy beauty's legacy? Nature's bequest gives nothing, but doth lend, And being frank she lends to those are free: Then, beauteous niggard, why dost thou abuse The bounteous largess given thee to give? Profitless usurer, why dost thou use So great a sum of sums, yet canst not live? For having traffic with thy self alone, Thou of thy self thy sweet self dost deceive:</p>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container> 
        </div>
    )
}

export default WorkoutTabs
