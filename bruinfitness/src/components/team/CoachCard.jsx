import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

function CoachCard({animation, coachImgPath, coachName, coachDesc}) {
    return (
        <div className="col-md-4">
            <ScrollAnimation animateIn={animation} animateOnce={true}>
              <div className="card">
                <img className="card-img-top" src={coachImgPath} alt=""/>
                <div className="card-body">
                  <h4 className="card-title">{coachName}</h4>
                  <hr />
                  <p className="card-text">{coachDesc}</p>
                  <a href="#" className="btn btn-outline-secondary">See Profile</a>
                </div>
              </div>
              </ScrollAnimation> 
          </div>
    )
}

export default CoachCard
