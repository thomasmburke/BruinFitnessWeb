import firebase from "firebase/app";
import React, { useContext } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { MyContext } from "../../providers/MyProvider";
import "./ReservationTable.css";

// implement auth and get current user from state
const testUser = "tom";

function ReservationTable() {
  // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
  const firestore = useFirestore();
  // Get a reference to the schedule collection for the currently selected date
  // TODO: switch to the reservationsRef below when there is enough data and I am done testing
  const reservationRef = firestore.collection(
    "schedules/Redwood City/dates/2020_12_13/classes"
  );
  // This context object holds the state from the DatePicker component which sets the date
  const context = useContext(MyContext);
  // This is adding a snapshot listener to this collection in React's useEffect method
  // under the hood. This removes the need for a `setReservationData` method call.
  // The idField param is what sets the doc.id value equal to the document's id, o/w it is not there by default
  // This will also handle listener detachment, kudos to the reactfire team!
  // TODO: what sort of error handling can be put in place here?
  const reservationData = useFirestoreCollectionData(reservationRef, { idField: 'id' });
  // Of the documents keys, these are the ones we want as columns in the table
  const headers = ["time", "workoutType"];
  // Soon to be used when testing is over and reservation info is added daily/weekly
  // Verified that this updates when the datepicker date is changed
  const reservationsRef = firestore.collection(
    `schedules/Redwood City/dates/${context.state.firestoreDate}/classes`
  );

  function removeReservation(row) {
    /*
    Summary: Atomically decrements the reservationCnt and removes the signed in user from the class
    @param {Object} row 
    */
    // TODO: remove debug logging
    console.log(`removing reservation for ${testUser}`);
    // Get a Firestore reference to the class within the classes collection for the day selected
    let docRef = reservationRef.doc(row["id"]);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const removeUser = firebase.firestore.FieldValue.arrayRemove(testUser);
    // Atomically remove a user from the "reservedUsers" array field.
    // Atomically decrement the reservationCnt of the class by 1.
    docRef.update({
      reservedUsers: removeUser,
      reservationCnt: decrement,
    });
  }

  function incrementReservation(docId) {
    /*
    Summary: Attempts a transaction to add a user and increment the reservationCnt of a class
    @param {string} docId
    */
    //   get a reference to the doc being updated
    let docRef = reservationRef.doc(docId);
    const increment = firebase.firestore.FieldValue.increment(1);
    const addUser = firebase.firestore.FieldValue.arrayUnion(testUser);
    // using a transaction to ensure we don't exceed the max number of reservations
    return firestore
      .runTransaction(function (transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then(function (reservationDoc) {
          if (!reservationDoc.exists) {
            throw "Document does not exist!";
          }
          // Get the current reservation count
          if (reservationDoc.data().reservationCnt >= 12) {
            //TODO: should likely put a toast or alert that they were unable to register for the class
            console.log("sorry class is full!");
          } else {
            // if there is still space left in the class then add the user and increment the count
            // Atomically add a user to the "reservedUsers" array field.
            // Atomically increment the reservationCnt of the class by 1.
            transaction.update(docRef, {
              reservationCnt: increment,
              reservedUsers: addUser,
            });
          }
        });
      })
      .then(function () {
        console.log("Transaction successfully committed!");
      })
      .catch(function (error) {
        console.log("Transaction failed: ", error);
      });
  }

  return (
    <div className="table-wrapper-scroll-y reservation-table-scrollbar">
      <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            <th colSpan="3">{context.state.scheduleDate} Classes</th>
          </tr>
        </thead>
        <tbody>
          {reservationData.data && reservationData.data.map((data) => {
            return <TableBody
              key={data.id}
              headers={headers}
              reservationData={data}
              incrementReservation={incrementReservation}
              removeReservation={removeReservation} />
          }
          )}
        </tbody>
      </table>
    </div>
  );
}

const TableBody = ({
  headers,
  reservationData,
  incrementReservation,
  removeReservation,
}) => {
  const columns = headers ? headers.length : 0;
  const showSpinner = reservationData === null;

  function buildReservationButton(row) {
    // If the user has reserved a spot in the class
    if (row["reservedUsers"].includes(testUser)) {
      // If they are in the class we need to allow them to leave the class if they can't make it
      return (
        <div className="col-md-3">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => removeReservation(row)}
          >
            Leave Class
          </button>
          <br />
          {row["reservationCnt"] < 12 ? (
            <small>{row["reservationCnt"]} of 12 reserved</small>
          ) : (
              <small>Class Full</small>
            )}
        </div>
      );
    }
    // If the user has not reserved a spot in the class
    else {
      if (row["reservationCnt"] < 12) {
        // If they are not in the class and there are still spaces available then prompt them with a button to reserve a spot
        return (
          <div className="col-md-3">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => incrementReservation(row["id"])}
            >
              Reserve
            </button>
            <br />
            <small>{row["reservationCnt"]} of 12 reserved</small>
          </div>
        );
      } else {
        return (
          // If they are not in the class and the class is full we remove the button and mark it as full
          <div className="col-md-3">Class Full</div>
        );
      }
    }
  }

  function buildRow(row, headers) {
    return (
      // Wonky way of creating a unique key per row, but works for now
      <tr key={row["workoutType"] + row["time"]}>
        {headers.map((value, index) => {
          return (
            <td key={index}>
              {/* if it is the column with workout type, then we need to render resevation btn etc */}
              {value === "workoutType" && (
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 vcenter">{row[value]}</div>
                    {buildReservationButton(row)}
                  </div>
                </div>
              )}
              {value !== "workoutType" && (
                <React.Fragment>{row[value]}</React.Fragment>
              )}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <React.Fragment>
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
        reservationData &&
        buildRow(reservationData, headers)}
    </React.Fragment>
  );
};

export default ReservationTable;
