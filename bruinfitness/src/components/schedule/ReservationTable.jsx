import React, { useState, useContext } from 'react'
import { MyContext } from "../../providers/MyProvider";

function ReservationTable() {
    const context = useContext(MyContext)
    // const [scheduleDate, setScheduleDate] = useState("10/24");
    return (
        <h1>{context.state.scheduleDate} Schedule</h1>
    )
}

export default ReservationTable

{/* <div>
            <table className="table table-bordered table-hover table-sm">
                <thead>
    <tr>
    <th colspan="3">{scheduleDate} Schedule</th>
    </tr>
    <tr>
      <th>Time</th>
      <th>Workout Type</th>
      <th>Reservation</th>
    </tr>
  </thead>
            </table>
        </div> */}



{/* <MyContext.Consumer>
            {(context) =>(
                <h1>Inside Consumer {context.state.scheduleDate}</h1>
            )}
        </MyContext.Consumer> */}
