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

    const showSpinner = () => {
        if (workoutInfo !== undefined && workoutInfo['Metcon'] !== undefined){
            return false
        } else {
            return true
        }
    }
    // const showSpinner = workoutInfo !== undefined && workoutInfo['Metcon'] !== undefined;

    // useEffect(() => {
    //     firestore.collection("workouts").doc('2021-01-15').get().then(function(doc) {
    //         if (doc.exists) {
    //             setWorkoutInfo(doc.data());
    //         }
    //         else {
    //             console.log(`no workout document`)
    //         }
    //     }).catch(function(error) {
    //         console.log(`Error getting document: ${error}`)
    //     });
    // }, [firestore])

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
                            <TabPane workoutInfo={workoutInfo} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container> 
        </div>
    )
}

const TabPane = ({workoutInfo}) => {

    const showSpinner = () => {
        if (workoutInfo !== undefined && workoutInfo['Metcon'] !== undefined){
            return false
        } else {
            return true
        }
    }

    function buildTabPane(workoutInfo){
        return (
        <div className="workout-tab-wrapper-scroll-y workout-tab-scrollbar" style={{whiteSpace: "pre-wrap"}}>
            {showSpinner() && (
                <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            )}
            {!showSpinner() &&
                (<div>
                    <p className="workout-content-header">WARM UP</p>
                    <p className="workout-content">{workoutInfo['Metcon'].warmUp}</p>
                    <p className="workout-content-header">SKILL</p>
                    <p className="workout-content">{workoutInfo['Metcon'].skill}</p>
                    <p className="workout-content-header">WORKOUT</p>
                    <p className="workout-content">{workoutInfo['Metcon'].workout}</p>
                </div>)
                }
            </div>
        );
    }

    return (<React.Fragment>{buildTabPane(workoutInfo)}</React.Fragment>);
}

export default WorkoutTabs


