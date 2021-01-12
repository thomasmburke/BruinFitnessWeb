import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirestore } from "reactfire";

function Admin() {

    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().substring(0, 10));
    const [workoutType, setWorkoutType] = useState('Metcon');
    const [warmUp, setWarmUp] = useState();
    const [strength, setStrength] = useState();
    const [workout, setWorkout] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        // If you want to see the \n newline characters
        // console.log(JSON.stringify(`workoutType: ${workoutType}\nwarmUp: ${warmUp}\nstrength: ${strength}\nworkout: ${workout}`));
        console.log(`workoutDate: ${workoutDate}\nworkoutType: ${workoutType}\nwarmUp: ${warmUp}\nstrength: ${strength}\nworkout: ${workout}`);
        firestore.collection('workouts').add({
            workoutType: workoutType,
            warmUp: warmUp,
            strength: strength,
            workout: workout,
            workoutDate: workoutDate
        })
        .then(() => console.log("workout successfully added!"))
        .catch((error) => console.log(`Error writing workout document: ${error}`))
    }

    return (
        <div className="wrapper py-4">
            <h1 className="text-center">Workout Addition Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="datepicker">
                    <Form.Label>Workout Date</Form.Label>
                    <Form.Control type="date" required value={workoutDate} onChange={e => setWorkoutDate(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Workout Type</Form.Label>
                    <Form.Control as="select" value={workoutType} onChange={e => setWorkoutType(e.target.value)}>
                    <option>Metcon</option>
                    <option>Weightlifting</option>
                    <option>Mobility</option>
                    <option>Kettlebell</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="warmUp">
                    <Form.Label>WARM-UP</Form.Label>
                    <Form.Control as="textarea" rows={12} value={warmUp} onChange={e => setWarmUp(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea2">
                    <Form.Label>STRENGTH</Form.Label>
                    <Form.Control as="textarea" rows={12} value={strength} onChange={e => setStrength(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea3">
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
