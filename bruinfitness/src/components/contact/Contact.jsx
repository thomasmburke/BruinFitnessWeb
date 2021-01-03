import React from 'react'
import WebPageHeaderWithBackgroundImage from '../common/WebPageHeaderWithBackgroundImage'
import ContactForm from './ContactForm'
import ContactInfoColumn from './ContactInfoColumn'

function Contact() {
    return (
        <React.Fragment>
            <WebPageHeaderWithBackgroundImage />
            <div className="wrapper">
                <div className="row m-4 justify-content-between">
                    <ContactInfoColumn />
                    <ContactForm />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Contact
