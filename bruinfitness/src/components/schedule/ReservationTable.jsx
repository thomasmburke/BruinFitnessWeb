import React, { useState, useContext, useEffect } from 'react'
import { MyContext } from "../../providers/MyProvider";
import { firestore } from "../../firebase";

// Get a reference to the schedule collection of interest
const reservationRef = firestore.collection("schedules/San Leandro/schedule");

function ReservationTable() {
    const context = useContext(MyContext)
   const [reservationData, setReservationData] = useState(null);
   const headers = ["Time", "Workout Type"];

// **********************
  // On function component mount lifecycle action
  useEffect(() => {
    /**
     * Summary: Reach out to Firestore and get all schedule entry data
     * @return {Object} Object containing multiple schedule entries
     */
    async function getSchedule() {
      let schedule = [];
      try {
        var querySnapshot = await reservationRef.get();
        // querySnapshot holds multiple documents, we need to unpack all of them
        querySnapshot.forEach(function (doc) {
          let docData = doc.data();
          let workoutType = docData.workoutType;
          // for each firestore document create a schedule entry
          docData.scheduleTimes.forEach((scheduleEntry) =>
            schedule.push({
              "Workout Type": workoutType,
              Time: scheduleEntry.time,
            })
          );
        });
        setReservationData(schedule);
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }
    getSchedule();
  }, []);
// **********************


    return (
        <div>
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                    <th colSpan="3">{context.state.scheduleDate} Schedule</th>
                    </tr>
                </thead>
                <TableBody headers={headers} rows={reservationData}></TableBody>
            </table>
        </div>
    )
}

const TableBody = (props) => {
  const { headers, rows } = props;
  const columns = headers ? headers.length : 0;
  const showSpinner = rows === null;

  function buildRow(row, headers) {
    return (
      // Wonky way of creating a unique key per row, but works for now
      <tr key={row["Workout Type"] + row["Time"]}>
        {headers.map((value, index) => {
            return <td key={index}>
                {row[value]}
                {value === "Workout Type" &&
                    (<div><button className="btn btn-primary btn-sm">Reserve</button>5 of 12 reserved</div>)
                }
            </td>;
        })}
      </tr>
    );
  }

  return (
    <tbody>
      {showSpinner && (
        <tr key="spinner-0">
          <td colSpan={columns} className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </td>
        </tr>
      )}
      {!showSpinner &&
        rows &&
        rows.map((value) => {
          return buildRow(value, headers);
        })}
    </tbody>
  );
};

export default ReservationTable
