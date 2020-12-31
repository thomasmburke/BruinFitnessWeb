import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";
import Table from "react-bootstrap/Table";
import './PricingTable.css';

function PricingTable() {
    return (
        <div className="col-12 col-sm-9 col-md-6 col-lg-6">
          <ScrollAnimation animateIn="slideInUp" animateOnce={true}>
            <Table
              className="table text-center card-table shadow p-3 mb-5 bg-white rounded pricing-table"
            >
              <thead className="pricing-thead">
                <tr>
                  <th colSpan="2" className="rounded">Memberships</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Monthly Rate</th>
                  <td>
                    $200
                    <span style={{color: "#ddd"}}>*</span>
                  </td>
                </tr>
                <tr>
                  <th>12 Month Contract Rate</th>
                  <td>
                    $170
                    <span style={{color: "#ddd"}}>*</span>
                  </td>
                </tr>
                <tr>
                  <th>10 Class Pass</th>
                  <td>$150</td>
                </tr>
                <tr>
                  <th>Drop-In</th>
                  <td>$20</td>
                </tr>
              </tbody>
            </Table>
            </ScrollAnimation>
        </div>
    )
}

export default PricingTable
