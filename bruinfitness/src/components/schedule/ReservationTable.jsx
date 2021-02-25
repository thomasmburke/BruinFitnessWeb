import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import React, { useContext } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { MyContext } from "../../providers/MyProvider";
import "./ReservationTable.css";

function ReservationTable() {
  // equivalent of firebase.firestore(), but making use of React Context API to ensure it is a singleton
  const firestore = useFirestore();
  // This context object holds the state from the DatePicker component which sets the date
  const context = useContext(MyContext);
  // Can't use .doc() after .orderBy() is applied to a collectionRef
  // Get a reference to the schedule collection for the currently selected date
  const reservationRef = firestore.collection(
    `schedules/Redwood City/dates/${context.state.firestoreDate}/classes`
  ).orderBy('time', 'asc');
  // Soon to be used when testing is over and reservation info is added daily/weekly
  // Verified that this updates when the datepicker date is changed
  const unorderedResevationRef = firestore.collection(
    `schedules/Redwood City/dates/${context.state.firestoreDate}/classes`
  );
  // This is adding a snapshot listener to this collection in React's useEffect method
  // under the hood. This removes the need for a `setReservationData` method call.
  // The idField param is what sets the doc.id value equal to the document's id, o/w it is not there by default
  // This will also handle listener detachment, kudos to the reactfire team!
  // TODO: what sort of error handling can be put in place here?
  const reservationData = useFirestoreCollectionData(reservationRef, { idField: 'id' });
  // Of the documents keys, these are the ones we want as columns in the table
  const headers = ["time", "workoutType"];
  // Subscribe to auth updates (i.e. onAuthStateChanged())
  const { data: user } = useUser();

  function removeReservation(row) {
    /**
    Summary: Atomically decrements the reservationCnt and removes the signed in user from the class
    @param {Object} row Firestore document data pertaining to a class w/ reservation data.
    @return {} null
    */
    // TODO: remove debug logging
    console.log(`removing reservation for ${user.uid}`);
    // Get a Firestore reference to the class within the classes collection for the day selected
    let docRef = unorderedResevationRef.doc(row["id"]);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const removeUser = firebase.firestore.FieldValue.arrayRemove(user.uid);
    // Atomically remove a user from the "reservedUsers" array field.
    // Atomically decrement the reservationCnt of the class by 1.
    docRef.update({
      reservedUsers: removeUser,
      reservationCnt: decrement,
    });
  }

  function incrementReservation(docId) {
    /** 
    Summary: Attempts a transaction to add a user and increment the reservationCnt of a class
    @param {string} docId Firestore document id of class being incremented.
    @return {Promise<T>} 
    */
    // Get a reference to the class doc being updated
    let docRef = unorderedResevationRef.doc(docId);
    const increment = firebase.firestore.FieldValue.increment(1);
    const addUser = firebase.firestore.FieldValue.arrayUnion(user.uid);
    // using a transaction to ensure we don't exceed the max number of reservations
    // Optional TODO: this transaction may be able to be replaced by clever security rule usage
    return firestore
      .runTransaction(function (transaction) {
        // This code may get re-run multiple times (max 5 times) if there are conflicts.
        return transaction.get(docRef).then(function (reservationDoc) {
          if (!reservationDoc.exists) {
            throw new Error("Document does not exist!");
          }
          // Get the current reservation count
          // TODO: The MAX reservationCnt should come from Firestore as well
          if (reservationDoc.data().reservationCnt >= 12) {
            // If the class is full, we need to alert the user that their reservation attempt was unsuccessful
            // TODO: Would like to test this particular code path so see how the transaction 
            // responds when I don't perform the transaction.update()
            alert("Sorry the class is now full. Please try reserving a different time slot");
          } else {
            // If there is still space left in the class then add the user and increment the count
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
        // TODO: Not sure if I need the then() statement here as I'm not actually doing anything when the promise resolves
        console.log("Transaction successfully committed!");
      })
      .catch(function (error) {
        console.log("Transaction failed: ", error);
      });
  }

  return (
    <React.Fragment>
      {reservationData.data 
      ? (
        <div className="table-wrapper-scroll-y reservation-table-scrollbar">
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th className="th-z-index" colSpan="2">{context.state.scheduleDate} Classes</th>
              </tr>
            </thead>
            <tbody className="tbody-hover-control table-dark">
              {reservationData.data.map((data) => {
                return <TableBody
                  key={data.id}
                  headers={headers}
                  reservationData={data}
                  userId={user.uid}
                  incrementReservation={incrementReservation}
                  removeReservation={removeReservation} />
              }
              )}
            </tbody> 
          </table>
        </div>
        ) : 
        (
          <div className="text-center">
          <p>Oops, no classes uploaded yet for {context.state.scheduleDate}! </p>
          </div>
        )}
    </React.Fragment>
  );
}

const TableBody = ({
  headers,
  reservationData,
  userId,
  incrementReservation,
  removeReservation,
}) => {
  // Dynamically determine how many columns are needed by looking at the list of headers
  const columns = headers ? headers.length : 0;
  // While we wait for the database to provide the required data this will control a spinner being displayed as we wait
  const showSpinner = reservationData === null;

  function buildReservationButton(row) {
    /** 
    Summary: Responsible for building the reservation button and handling the different UI, given state passed to it in the `row`
    @param {Object} row Firestore document data pertaining to a class w/ reservation data.
    @return {Object} HTML to be rendered. Specifically the reservation button placed in the table body's column 
    */
    // If the user has reserved a spot in the class
    if (row["reservedUsers"].includes(userId)) {
      // If they are in the class we need to allow them to leave the class if they can't make it
      return (
        <div className="col-md-6">
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
          <div className="col-md-6">
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
          <div className="col-md-6">Class Full</div>
        );
      }
    }
  }

  function buildRow(row, headers) {
    /**
    Summary: Responsible for building individual table rows given a Firestore document representing a class
    @param: {Object} row Firestore document data pertaining to a class w/ reservation data.
    @param: {Array} headers List of all the column headers for the reservation table.
    @return {Object} HTML to be rendered. Specifically a full HTML table row w/ reservation data.
    */
    return (
      // Wonky way of creating a unique key per row, but works for now
      <tr className="tr-hover-control" key={row["workoutType"] + row["time"]}>
        {headers.map((value, index) => {
          return (
            <td key={index}>
              {/* if it is the column with workout type, then we need to render resevation btn etc */}
              {value === "workoutType" && (
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 vcenter">{row[value]}</div>
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
        <tr className="tr-hover-control" key="spinner-0">
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
