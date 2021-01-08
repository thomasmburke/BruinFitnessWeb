import React from 'react';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function WorkoutTabs() {
    const text = "WORKOUT\n4 SETS FOR QUALITY"
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
                    </Nav>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div style={{whiteSpace: "pre-wrap"}}>
                                {/* may want pre-line instead */}
                                <p>{text}</p>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        <p>Against my love shall be as I am now, With Time's injurious hand crush'd and o'erworn; When hours have drain'd his blood and fill'd his brow With lines and wrinkles; when his youthful morn Hath travell'd on to age's steepy night; And all those beauties whereof now he's king Are vanishing, or vanished out of sight, Stealing away the treasure of his spring; For such a time do I now fortify Against confounding age's cruel knife,</p>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container> 
        </div>
    )
}

export default WorkoutTabs
