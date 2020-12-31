import React from 'react'
import CalloutText from '../common/CalloutText'
import WebPageHeader from '../common/WebPageHeader'
import PricingAsterix from './PricingAsterix'
import PricingTable from './PricingTable'

function Pricing() {
    return (
        <div className="wrapper pt-2">
            <WebPageHeader header="Our Pricing"/>
            <div className="row justify-content-center pb-4">
                <PricingTable />
                <PricingAsterix />
            </div>
            <CalloutText />
        </div>
    )
}

export default Pricing
