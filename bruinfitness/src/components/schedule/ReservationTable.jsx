import React, { useState, useContext, useEffect } from 'react'
import { MyContext } from "../../providers/MyProvider";
import { firestore } from "../../firebase";
import "./ReservationTable.css";

// Get a reference to the schedule collection of interest
// TODO: This should get today's date and use that in the collection path
const reservationRef = firestore.collection("schedules/Redwood City/dates/2020_12_13/classes");

function ReservationTable() {
    const context = useContext(MyContext)
    const [reservationData, setReservationData] = useState(null);
    const headers = ["Time", "Workout Type"];
    // On function component mount lifecycle action
    useEffect(() => {
    /**
     * Summary: Reach out to Firestore and get all schedule/reservation entry data
     * @return {Object} Object containing multiple schedule entries
     */
        var unsubscribe = getReservationData();
        // remember to unsubscribe from your realtime listener on unmount or you will create a memory leak. Why did we return a function from our effect? This is the optional cleanup mechanism for effects.
       return () => unsubscribe();
    }, []);

     // code to getSchedule using a firestore listener
    function getReservationData() {
        // if using a listener you will also need to detach the listener
      try {
        var unsubscribe = reservationRef.onSnapshot(function(querySnapshot) {
            let reservationData = [];
             // querySnapshot holds multiple documents, we need to unpack all of them
        querySnapshot.forEach(function (doc) {
          let docData = doc.data();
          // for each workout listed in the firestore document create a schedule entry
        reservationData.push({
            "Workout Type": docData.workoutType,
            id: doc.id,
            "reservationCnt": docData.reservationCnt,
            Time: docData.time
        })
        });
        setReservationData(reservationData);
        });
        return unsubscribe;
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }

    function incrementReservation(docId){
    //   get a reference to the doc being updated
      let docRef = reservationRef.doc(docId)
      // using a transaction to ensure we don't exceed the max number of reservations
      return firestore.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then(function(reservationDoc) {
            if (!reservationDoc.exists) {
                throw "Document does not exist!";
            }
            // Get the current reservation count
            let reservationCnt = reservationDoc.data().reservationCnt;
            if (reservationCnt >= 12){
                //TODO: should likely put a toast or alert that they were unable to register for the class
                console.log("sorry class is full!")
            } else {
                // if there is still space left in the class then add the user and increment the count
                //TODO: add the user's id to the list of reserved users
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

    return (
        <div>
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                    <th colSpan="3">{context.state.scheduleDate} Classes</th>
                    </tr>
                </thead>
                <TableBody headers={headers} rows={reservationData} incrementReservation={incrementReservation}></TableBody>
            </table>
        </div>
    )
}

const TableBody = ({ headers, rows, incrementReservation }) => {
  const columns = headers ? headers.length : 0;
  const showSpinner = rows === null;

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
