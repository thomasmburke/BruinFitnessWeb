import React from 'react'
import CalloutText from '../common/CalloutText'
import WebPageHeader from '../common/WebPageHeader'
import DropInNote from './DropInNote'
import PricingAsterix from './PricingAsterix'
import PricingTable from './PricingTable'

function Pricing() {
    return (
        <React.Fragment>
            <div className="wrapper pt-2">
                <WebPageHeader header="Our Pricing"/>
                <div className="row justify-content-center pb-4">
                    <PricingTable />
                    <PricingAsterix />
                </div>
                <CalloutText />
            </div>
            
            <DropInNote />
        </React.Fragment>
    )
}

export default Pricing
