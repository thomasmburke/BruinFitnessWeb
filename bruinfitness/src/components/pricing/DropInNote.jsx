import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";
import "./DropInNote.css";

function DropInNote() {
    return (
        <section className="dnow-regionsWrap">
            <div className="dnow-regionsContent">
                <div className="card bg-dark text-white">
                <img src="/images/crossfit_banner_stock_image_slim.png" alt="" />
                <div className="overlay-div"></div>
                <div className="card-img-overlay d-flex align-items-center container">
                    <div className="row mb-5">
                    <div className="col-sm-12 text-content">
                        <ScrollAnimation animateIn="rollIn" animateOnce={true}>
                            <h2 className="card-title">
                                Dropping In?
                            </h2>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="slideInUp" animateOnce={true}>
                        <p style={{color: "white"}}>
                            Currently looking for a new place to workout? Or just in the
                            area for a visit? We love having athletes come by from other
                            gyms!
                        </p>
                        <p style={{margin: "0px 0px", color: "white"}}>
                            To make sure you are as ready as possible on drop in day you
                            can <a href="#">fill out your waiver</a> ahead of time. Make
                            sure to stop by 15 minutes beforehand to stretch out and
                            meet us.
                        </p>
                        </ScrollAnimation>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default DropInNote


