import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";
import { Card } from 'react-bootstrap';

function CoachCard({animation, coachImgPath, coachName, coachDesc}) {
    return (
        <div className="col-md-4" style={{padding: "1rem"}}>
            <ScrollAnimation animateIn={animation} animateOnce={true}>
              <Card className="text-center">
                  <Card.Img src={coachImgPath}/>
                  <Card.Body>
                      <Card.Title>{coachName}</Card.Title>
                  <hr />
                  <Card.Text>{coachDesc}</Card.Text>
                  <a href="#" className="btn btn-outline-secondary">See Profile</a>
                  </Card.Body>
                </Card>
              </ScrollAnimation> 
          </div>
    )
}

export default CoachCard