import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useFirestore } from "reactfire";

function Admin() {

    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().substring(0, 10));
    const [workoutType, setWorkoutType] = useState('Metcon');
    const [warmUp, setWarmUp] = useState();
    const [skill, setSkill] = useState();
    const [strength, setStrength] = useState();
    const [coolDown, setCoolDown] = useState();
    const [workout, setWorkout] = useState();

    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();
    const workoutRef = firestore.collection(
        "workouts"
      ).doc(workoutDate);

    const handleSubmit = (event) => {
        event.preventDefault();
        // If you want to see the \n newline characters
        // console.log(JSON.stringify(`workoutType: ${workoutType}\nwarmUp: ${warmUp}\nstrength: ${strength}\nworkout: ${workout}`));
        console.log(`workoutDate: ${workoutDate}\nworkoutType: ${workoutType}\nwarmUp: ${warmUp}\nskill: ${skill}\nstrength: ${strength}\ncool down: ${coolDown}\nworkout: ${workout}`);
        firestore.collection('workouts').doc(workoutDate).set({
            [workoutType]: {
                workoutType: workoutType,
                warmUp: warmUp || null,
                skill: skill || null,
                strength: strength || null,
                coolDown: coolDown || null,
                workout: workout,
                workoutDate: workoutDate
            }
        }, {merge: true})
        .then(() => console.log("workout successfully added!"))
        .catch((error) => console.log(`Error writing workout document: ${error}`))
    }

    return (
        <div className="wrapper py-4">
            <h1 className="text-center">Workout Addition Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group controlId="datepicker" as={Col}>
                        <Form.Label>Workout Date</Form.Label>
                        <Form.Control type="date" required value={workoutDate} onChange={e => setWorkoutDate(e.target.value)}/>
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
                    <Form.Group controlId="warmUp" as={Col}>
                        <Form.Label>WARM-UP</Form.Label>
                        <Form.Control as="textarea" rows={12} value={warmUp} onChange={e => setWarmUp(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="skill" as={Col}>
                        <Form.Label>SKILL</Form.Label>
                        <Form.Control as="textarea" rows={12} value={skill} onChange={e => setSkill(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="strength" as={Col}>
                        <Form.Label>STRENGTH</Form.Label>
                        <Form.Control as="textarea" rows={12} value={strength} onChange={e => setStrength(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="coolDown" as={Col}>
                        <Form.Label>COOL DOWN</Form.Label>
                        <Form.Control as="textarea" rows={12} value={coolDown} onChange={e => setCoolDown(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="workout" as={Col}>
                        <Form.Label>WORKOUT</Form.Label>
                        <Form.Control as="textarea" rows={12} required value={workout} onChange={e => setWorkout(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Admin
