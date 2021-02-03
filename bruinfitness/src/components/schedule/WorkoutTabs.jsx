import React, { useContext, useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { MyContext } from "../../providers/MyProvider";
import WebPageHeader from "../common/WebPageHeader";
import "./WorkoutTabs.css";

// Assumption made by this component is there will always be a Metcon on everyday
// If there is not then no workout tab will be selected by default and
// The Oops! no workouts uploaded message will surface

function WorkoutTabs() {
    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();
    // This context object holds the state from the DatePicker component which sets the date
    const context = useContext(MyContext);
    const workoutRef = firestore.collection('workouts').doc(context.state.firestoreDate);
    const {data: workoutInfo} = useFirestoreDocDataOnce(workoutRef);
    const workoutTypeHeaders = ['Metcon', 'Weightlifting', 'Mobility', 'Endurance', 'Kettlebell']
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 576);

    const showSpinner = workoutInfo ? false : true;

    const updateMedia = () => {
        setDesktop(window.innerWidth >= 576);
      };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });

    return (
        <div>
            {!isDesktop && <WebPageHeader header="Programming" additionalClassNames="remove-bottom-spacing"/>}
            <Tab.Container id="workout-tabs" defaultActiveKey={workoutTypeHeaders[0]}>
                {/* no margin top needed on bigger screens, but margin top required on smaller screens for when the COLs are stacked */}
                <Row className="mt-4 mt-lg-0">
                    <Col sm={4} >
                    <Nav variant="pills" className="workout-tab-flex-column">
                        {workoutInfo && workoutTypeHeaders.map((workoutTypeHeader) => {
                            if (workoutInfo[workoutTypeHeader]) {
                                console.debug(`workout pill for : ${workoutTypeHeader}`);
                                return (
                                    <Nav.Item key={workoutTypeHeader} className="mx-0 mx-md-2">
                                        <Nav.Link className="workout-pill" eventKey={workoutTypeHeader}>{workoutTypeHeader}</Nav.Link>
                                    </Nav.Item>
                                )
                            }
                            return null
                        })}
                    </Nav>
                    </Col>
                    <Col sm={8}>
                        {isDesktop && <WebPageHeader header="Programming" />}
                        {workoutInfo && !workoutInfo['Metcon'] && <p className="text-center">Oops, no workout progamming uploaded yet for {context.state.scheduleDate}!</p>}
                    <Tab.Content>
                        {showSpinner && (
                            <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        {!showSpinner && workoutTypeHeaders.map((workoutTypeHeader) => {
                            if (workoutInfo[workoutTypeHeader]) {
                                console.debug(`adding TabPane for : ${workoutTypeHeader}`)
                                return (
                                    <Tab.Pane eventKey={workoutTypeHeader} key={workoutTypeHeader}>
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
        <div className="workout-tab-wrapper-scroll-y workout-tab-scrollbar mt-3 mt-sm-0" style={{whiteSpace: "pre-wrap"}}>
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


