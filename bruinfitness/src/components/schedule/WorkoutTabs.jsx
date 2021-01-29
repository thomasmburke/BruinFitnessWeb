import React, { useContext } from 'react';
// import { TabPane } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { MyContext } from "../../providers/MyProvider";
import "./WorkoutTabs.css";

function WorkoutTabs() {
    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();
    // This context object holds the state from the DatePicker component which sets the date
    const context = useContext(MyContext);
    
    // Holds the meat of the workout programming
    // const [workoutInfo, setWorkoutInfo] = useState();
    const workoutRef = firestore.collection('workouts').doc('2021-01-15')
    const {data: workoutInfo} = useFirestoreDocDataOnce(workoutRef);
    const workoutTypeHeaders = ['Metcon', 'Weightlifting', 'Mobility', 'Endurance', 'Kettlebell']

    // const showSpinner = workoutInfo !== undefined ;

    return (
        <div>
            <Tab.Container id="workout-tabs" defaultActiveKey={workoutTypeHeaders[0]}>
                <Row>
                    <Col sm={4}>
                    <Nav variant="pills" className="flex-column">
                        {workoutInfo && workoutTypeHeaders.map((workoutTypeHeader) => {
                            if (workoutInfo[workoutTypeHeader]) {
                                console.debug(`workout pill for : ${workoutTypeHeader}`);
                                return (
                                    <Nav.Item>
                                        <Nav.Link className="workout-pill" eventKey={workoutTypeHeader}>{workoutTypeHeader}</Nav.Link>
                                    </Nav.Item>
                                )
                            }
                            return null
                        })}
                    </Nav>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {workoutInfo && workoutTypeHeaders.map((workoutTypeHeader) => {
                            if (workoutInfo[workoutTypeHeader]) {
                                console.debug(`adding TabPane for : ${workoutTypeHeader}`)
                                return (
                                    <Tab.Pane eventKey={workoutTypeHeader}>
                                        <TabPane workoutType={workoutTypeHeader} workoutInfo={workoutInfo} />
                                    </Tab.Pane>
                                )
                            }
                            return null
                        })}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container> 
        </div>
    )
}

const TabPane = ({workoutType, workoutInfo}) => {

    const workoutHeaderList = ["warmUp", "skill", "strength", "workout", "coolDown"]

    const showSpinner = () => {
        if (workoutInfo !== undefined && workoutInfo[workoutType] !== undefined){
            return false
        } else {
            return true
        }
    }

    function buildTabPane(){
        return (
        <div className="workout-tab-wrapper-scroll-y workout-tab-scrollbar" style={{whiteSpace: "pre-wrap"}}>
            {showSpinner() && (
                <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            )}
            {!showSpinner() &&
                buildTabPaneContent()
                }
            </div>
        );
    }

    function buildTabPaneContent(){
        return (
        <div>
            {workoutHeaderList.map(workoutHeader => {
                console.debug(`workoutHeader: ${workoutHeader}`)
                console.debug(`workoutIndex: ${workoutInfo[workoutType][workoutHeader]}`)
                if (workoutInfo[workoutType][workoutHeader]) {
                    console.debug(`adding TabPane content for: ${workoutHeader}`)
                    return (
                        <React.Fragment key={workoutHeader}>
                        <p className="workout-content-header">{camelToUpperSentenceCase(workoutHeader)}</p>
                        <p className="workout-content">{workoutInfo[workoutType][workoutHeader]}</p>
                        </React.Fragment>
                    )
                }
                // make eslint happy with a return for null workout content
                return null
            })}
        </div>
        )
    }

    function camelToUpperSentenceCase(text){
        return text.replace( /([A-Z])/g, " $1" ).toUpperCase();
    }

    return (<React.Fragment>{buildTabPane()}</React.Fragment>);
}

export default WorkoutTabs


