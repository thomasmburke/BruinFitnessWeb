import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useFirestore } from "reactfire";
import './Admin.css';

function AdminSchedule() {

    // Set to today's date in YYYY-mm-DD string format
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().substring(0, 10));
    // Metcon is currently the first option in the selector so it is the default
    const [workoutType, setWorkoutType] = useState('Metcon');

    const [fancySubmitClass, setFancySubmitClass] = useState('')
    const isCheckHidden = useRef(true);

    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();

    const handleSubmit = (event) => {
        // When the form is submitted we write the corresponding workoutInfo to Firestore
        event.preventDefault();
        // We set merge: true because if we perform a set on workoutType: 'Weightlifting'
        // it will not overwrite a different workoutType map e.g. 'Metcon'

        
        // firestore.collection('workouts').doc(workoutDate).set({
        //     [workoutType]: {
        //         workoutType: workoutType,
        //         warmUp: workoutInfo.warmUp || '',
        //         skill: workoutInfo.skill || '',
        //         strength: workoutInfo.strength || '',
        //         coolDown: workoutInfo.coolDown || '',
        //         workout: workoutInfo.workout,
        //         workoutDate: workoutDate
        //     }
        // }, {merge: true})
        // .then(() => console.log("workout successfully added!"))
        // .catch((error) => console.log(`Error writing workout document: ${error}`))

        // // Not only do we write to Firestore, but also we update the react state
        // workoutData.current[workoutType] = {
        //     workoutType: workoutType,
        //     warmUp: workoutInfo.warmUp || '',
        //     skill: workoutInfo.skill || '',
        //     strength: workoutInfo.strength || '',
        //     coolDown: workoutInfo.coolDown || '',
        //     workout: workoutInfo.workout,
        //     workoutDate: workoutDate
        // }
        // setWorkoutInfo(workoutData.current[workoutType]);

        fancySubmit();
    }

    // const handleChange = e => {
    //     // For any new input in one of the workoutInfo text boxes we need to update that 
    //     // specific portion of the workoutInfo state object while maintaining the rest

    //     // extract the name and value elements of the Form.Control
    //     const {name, value} = e.target;
    //     setWorkoutInfo(prevWorkoutInfo => ({
    //         ...prevWorkoutInfo,
    //         [name]: value
    //     }));
    // }

    function fancySubmit(){
        setFancySubmitClass('onSubmitBtnClick');
        setTimeout(function(){
            isCheckHidden.current = false;
            setFancySubmitClass('submitBtnValidate');
            setTimeout(function(){
                isCheckHidden.current = true;
                setFancySubmitClass('');
            }, 1250)
        }, 2250)
    }

    return (
        <div className="wrapper py-4">
            <h1 className="text-center">Schedule Modification Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group controlId="datepicker" as={Col}>
                        <Form.Label>Workout Date</Form.Label>
                        <Form.Control type="date" required value={workoutDate} onChange={e => {console.log("in workoutDate onchange");setWorkoutDate(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group controlId="workoutType" as={Col}>
                        <Form.Label>Workout Type</Form.Label>
                        <Form.Control as="select" required value={workoutType} onChange={e => setWorkoutType(e.target.value)}>
                        <option>Metcon</option>
                        <option>Weightlifting</option>
                        <option>Mobility</option>
                        <option>Kettlebell</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="startTime" as={Col}>
                        <Form.Label>Class Start Time</Form.Label>
                        <Form.Control type="time" required />
                    </Form.Group>
                    <Form.Group controlId="endTime" as={Col}>
                        <Form.Label>Class End Time</Form.Label>
                        <Form.Control type="time" required />
                    </Form.Group>
                </Form.Row>
                <div className="submitBtnContainer">
                    <button  type="submit" className={`submitBtn ${fancySubmitClass}`}>{isCheckHidden.current ? "SUBMIT" : <FontAwesomeIcon icon={faCheck} color="white"/>}</button>
                </div>
            </Form>
        </div>
    )
}

export default AdminSchedule
