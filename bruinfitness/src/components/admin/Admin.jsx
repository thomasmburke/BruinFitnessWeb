import React, { useEffect, useRef, useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useFirestore } from "reactfire";

function Admin() {

    // Mainly using useRef here so eslint doesn't make me put emptyWorkoutInfo as a trigger arg for useEffect
    const emptyWorkoutInfo = useRef({warmUp: '', skill: '', strength: '', coolDown: '', workout: ''});

    // Set to today's date in YYYY-mm-DD string format
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().substring(0, 10));
    // Metcon is currently the first option in the selector so it is the default
    const [workoutType, setWorkoutType] = useState('Metcon');
    const [workoutInfo, setWorkoutInfo] = useState(emptyWorkoutInfo.current)

    // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
    const firestore = useFirestore();

    useEffect(() => {
        firestore.collection("workouts").doc(workoutDate).get().then(function(doc) {
            if (doc.exists) {
                let workoutData = doc.data();
                console.log(`Document Data: ${workoutData}`);
                if (workoutData[workoutType]) {
                    setWorkoutInfo(workoutData[workoutType])
                }
                else {
                    console.log('made it in else')
                    setWorkoutInfo(emptyWorkoutInfo.current);
                }
            }
            else {
                console.log(`no workout document for ${workoutDate}`)
                setWorkoutInfo(emptyWorkoutInfo.current);
            }
        }).catch(function(error) {
            console.log(`Error getting document: ${error}`)
        });
    }, [firestore, workoutDate, workoutType])

    const handleSubmit = (event) => {
        event.preventDefault();
        // If you want to see the \n newline characters
        // console.log(JSON.stringify(`workoutType: ${workoutType}\nwarmUp: ${warmUp}\nstrength: ${strength}\nworkout: ${workout}`));
        // console.log(`workoutDate: ${workoutDate}\nworkoutType: ${workoutType}\nwarmUp: ${warmUp}\nskill: ${skill}\nstrength: ${strength}\ncool down: ${coolDown}\nworkout: ${workout}`);
        console.log(`workoutDate: ${workoutDate}\nworkoutType: ${workoutType}\nwarmUp: ${workoutInfo.warmUp}\nskill: ${workoutInfo.skill}\nstrength: ${workoutInfo.strength}\ncool down: ${workoutInfo.coolDown}\nworkout: ${workoutInfo.workout}`);
        firestore.collection('workouts').doc(workoutDate).set({
            [workoutType]: {
                workoutType: workoutType,
                warmUp: workoutInfo.warmUp || '',
                skill: workoutInfo.skill || '',
                strength: workoutInfo.strength || '',
                coolDown: workoutInfo.coolDown || '',
                workout: workoutInfo.workout,
                workoutDate: workoutDate
            }
        }, {merge: true})
        .then(() => console.log("workout successfully added!"))
        .catch((error) => console.log(`Error writing workout document: ${error}`))
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setWorkoutInfo(prevWorkoutInfo => ({
            ...prevWorkoutInfo,
            [name]: value
        }));
    }

    return (
        <div className="wrapper py-4">
            <h1 className="text-center">Workout Addition Form</h1>
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
                    <Form.Group controlId="warmUp" as={Col}>
                        <Form.Label>WARM-UP</Form.Label>
                        <Form.Control as="textarea" rows={12} name="warmUp" value={workoutInfo.warmUp} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="skill" as={Col}>
                        <Form.Label>SKILL</Form.Label>
                        <Form.Control as="textarea" rows={12} name="skill" value={workoutInfo.skill} onChange={handleChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="strength" as={Col}>
                        <Form.Label>STRENGTH</Form.Label>
                        <Form.Control as="textarea" rows={12} name="strength" value={workoutInfo.strength} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="coolDown" as={Col}>
                        <Form.Label>COOL DOWN</Form.Label>
                        <Form.Control as="textarea" rows={12} name="coolDown" value={workoutInfo.coolDown} onChange={handleChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="workout" as={Col}>
                        <Form.Label>WORKOUT</Form.Label>
                        <Form.Control as="textarea" rows={12} name="workout" required value={workoutInfo.workout} onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Admin
