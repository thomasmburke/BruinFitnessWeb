import React from 'react';
import Container from "react-bootstrap/Container";
import CalloutText from '../common/CalloutText';
import WebPageHeader from '../common/WebPageHeader';
import CoachCard from './CoachCard';

function Team() {
    return (
        <div className="wrapper pt-2">
            <WebPageHeader header="Our Team" />
            <Container fluid>
                <div className="row padding">
                    <CoachCard 
                    animation="slideInLeft" 
                    coachImgPath="/images/tomburke.jpg" 
                    coachName="Tom Burke" 
                    coachDesc="Tom is an athelete from several backgrounds including kung
                            fu, weightlifting, and gymnastics"/>
                    
                    <CoachCard 
                    animation="slideInUp" 
                    coachImgPath="/images/margauxcarle.jpg" 
                    coachName="Margaux Carle" 
                    coachDesc="Margaux is the head CrossFit coach also boasting an
                    impressive background in nutrition"/>

                    <CoachCard 
                    animation="slideInRight" 
                    coachImgPath="/images/tomburke.jpg" 
                    coachName="Tom Again" 
                    coachDesc="Tom is an athelete from several backgrounds including kung
                            fu, weightlifting, and gymnastics"/>
                </div>
                <hr />
            </Container>
            <CalloutText />
        </div>
    )
}

export default Team
