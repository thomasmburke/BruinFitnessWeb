import React, { useContext, useEffect, useRef, useState } from 'react';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useFirestore } from "reactfire";
import { MyContext } from "../../providers/MyProvider";
import "./WorkoutTabs.css";

function WorkoutTabs() {
    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();
    // This context object holds the state from the DatePicker component which sets the date
    const context = useContext(MyContext);

    // Mainly using useRef here so eslint doesn't make me put emptyWorkoutInfo as a trigger arg for useEffect
    const emptyWorkoutInfo = useRef({warmUp: '', skill: '', strength: '', coolDown: '', workout: ''});
    const prevWorkoutType = useRef('Metcon');
    const workoutData = useRef()

    // Set to today's date in YYYY-mm-DD string format
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().substring(0, 10));
    // Metcon is currently the first option in the selector so it is the default
    const [workoutType, setWorkoutType] = useState('Metcon');
    // Holds the meat of the workout programming
    const [workoutInfo, setWorkoutInfo] = useState(emptyWorkoutInfo.current)

    useEffect(() => {
        firestore.collection("workouts").doc('2021-01-15').get().then(function(doc) {
            if (doc.exists) {
                workoutData.current = doc.data();
                console.log(JSON.stringify(workoutData.current, null, 2))
                // Check if we previously recorded a workout for the selected workoutType
                if (workoutData.current[workoutType]) {
                    console.log('made it here')
                    // If there is a previously logged workout for the workoutType update the workoutInfo state object
                    setWorkoutInfo(workoutData.current[workoutType])
                }
                else {
                    // If we have not previously logged a workout for the selected workoutType
                    // then set the workoutInfo state object to empty
                    setWorkoutInfo(emptyWorkoutInfo.current);
                }
            }
            else {
                // If the doc we are looking for does not exist then workoutInfo should be empty
                console.log(`no workout document`)
                // setWorkoutInfo(emptyWorkoutInfo.current);
                // workoutData.current = emptyWorkoutInfo.current;
            }
        }).catch(function(error) {
            console.log(`Error getting document: ${error}`)
        });
    }, [firestore, workoutType])

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
                                {/* <p>{text}</p> */}
                                {/* <p>WORKOUT</p> */}
                                {console.log(JSON.stringify(workoutData.current, null, 2))}
                                {workoutData.current !== undefined && workoutData.current['Metcon'] !== undefined && (<p>{workoutData.current['Metcon'].workout}</p>)}
                                {/* <p>{workoutData !== undefined && workoutData['Metcon'] !== undefined && workoutData['Metcon'].workout}</p> */}
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
