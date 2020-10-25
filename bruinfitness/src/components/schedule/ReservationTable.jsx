import React, { useState, useEffect } from 'react'

function ReservationTable() {
    const [scheduleDate, setScheduleDate] = useState("10/24");
    return (
        <div>
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
        </div>
    )
}

export default ReservationTable
