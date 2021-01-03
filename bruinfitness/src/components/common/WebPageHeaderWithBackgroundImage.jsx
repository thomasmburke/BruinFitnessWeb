import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";

function WebPageHeaderWithBackgroundImage() {
    return (
        <section className="dnow-regionsWrap">
            <div className="dnow-regionsContent">
                <div className="card bg-dark text-white">
                <img src="/images/crossfit_banner_stock_image_slim.png" alt="" />
                <div className="overlay-div"></div>
                <div
                    className="card-img-overlay d-flex align-items-center container justify-content-center"
                >
                    <div className="row mb-5">
                    <div className="col-sm-12">
                    <ScrollAnimation animateIn="slideInUp" animateOnce={true}>
                        <h2 className="card-title">
                            CONTACT US
                        </h2>
                        </ScrollAnimation>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default WebPageHeaderWithBackgroundImage
