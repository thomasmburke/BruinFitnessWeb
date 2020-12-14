import React, { useState, useContext, useEffect } from 'react'
import { MyContext } from "../../providers/MyProvider";
import { firestore } from "../../firebase";
import "./ReservationTable.css";

// Get a reference to the schedule collection of interest
// const reservationRef = firestore.collection("schedules/San Leandro/schedule");
const reservationRef = firestore.collection("schedules/Redwood City/dates/2020_12_13/classes");

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
          // for each workout listed in the firestore document create a schedule entry
        //   docData.scheduleTimes.forEach((scheduleEntry) =>
        //     schedule.push({
        //       "Workout Type": workoutType,
        //       Time: scheduleEntry.time,
        //       "reservationCnt": scheduleEntry.reservationCnt,
        //       id: doc.id
        //     })
        //   );
        schedule.push({
            "Workout Type": docData.workoutType,
            id: doc.id,
            "reservationCnt": docData.reservationCnt,
            Time: docData.time
        })
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
                    <th colSpan="3">{context.state.scheduleDate} Classes</th>
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

  function incrementReservation(docId){
    //   get a reference to the doc being updated
      let docRef = reservationRef.doc(docId)

      return firestore.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then(function(reservationDoc) {
            if (!reservationDoc.exists) {
                throw "Document does not exist!";
            }
            // Get the current reservation count
            let reservationCnt = reservationDoc.data().reservationCnt;
            if (reservationCnt >= 12){
                console.log("sorry class is full!")
            } else {
                reservationCnt++;
                transaction.update(docRef, { reservationCnt: reservationCnt });
            }
        });
    }).then(function() {
        console.log("Transaction successfully committed!");
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });

  }

  function buildRow(row, headers) {
    return (
      // Wonky way of creating a unique key per row, but works for now
      <tr key={row["Workout Type"] + row["Time"]}>
        {headers.map((value, index) => {
            return <td key={index}>
                {/* if it is the column with workout type, then we need to render resevation btn etc */}
                {value === "Workout Type" &&
                        (
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 vcenter">
                                        {row[value]}
                                    </div>
                                    {/* If less than 12 people have registered we need present a reservation button and how many spots are left */}
                                    {row["reservationCnt"] < 12 ?
                                        (
                                            <div className="col-md-3">
                                                <button className="btn btn-primary btn-sm"
                                                onClick={() => incrementReservation(row["id"])}>Reserve</button>
                                                <br />
                                                <small>{row["reservationCnt"]} of 12 reserved</small>
                                            </div>
                                        ) : (
                                            // otherwise we need to mark the class as full
                                            <div className="col-md-3">
                                                Class Full
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        )}
                {value !== "Workout Type"&&
                    (
                        <React.Fragment>
                        {row[value]}
                        </React.Fragment>
                    )}
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





{/* <div className="tableRow">
                    {row[value]}
                    {value === "Workout Type" &&
                        (<div><button className="btn btn-primary btn-sm">Reserve</button>5 of 12 reserved</div>)
                    }
                </div> */}
