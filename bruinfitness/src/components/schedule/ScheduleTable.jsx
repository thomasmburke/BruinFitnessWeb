import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import "./ScheduleTable.css";

// Get a reference to the schedule collection of interest
const scheduleRef = firestore.collection("schedules/San Leandro/schedule");

function ScheduleTable() {
  const [scheduleData, setScheduleData] = useState(null);
  const headers = ["Workout Type", "Day", "Time"];

  // On function component mount lifecycle action
  useEffect(() => {
    /**
     * Summary: Reach out to Firestore and get all schedule entry data
     * @return {Object} Object containing multiple schedule entries
     */
    async function getSchedule() {
      let schedule = [];
      try {
        var querySnapshot = await scheduleRef.get();
        // querySnapshot holds multiple documents, we need to unpack all of them
        querySnapshot.forEach(function (doc) {
          let docData = doc.data();
          let workoutType = docData.workoutType;
          // for each firestore document create a schedule entry
          docData.scheduleTimes.forEach((scheduleEntry) =>
            schedule.push({
              "Workout Type": workoutType,
              Day: scheduleEntry.day,
              Time: scheduleEntry.time,
            })
          );
        });
        // return schedule;
        setScheduleData(schedule);
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }
    getSchedule();
  }, []);

  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
        {/* table-sm makes all table cells small */}
      <table className="table table-bordered table-hover table-sm">
        <TableHeader headers={headers}></TableHeader>
        <TableBody headers={headers} rows={scheduleData}></TableBody>
      </table>
    </div>
  );
}

const TableHeader = (props) => {
  const { headers } = props;
  return (
    <thead className="thead-dark" key="header-1">
      <tr key="header-0">
        {headers &&
          headers.map((value, index) => {
            return (
              <th key={index}>
                <div>{value}</div>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const { headers, rows } = props;
  const columns = headers ? headers.length : 0;
  const showSpinner = rows === null;

  function buildRow(row, headers) {
    return (
      // Wonky way of creating a unique key per row, but works for now
      <tr key={row["Workout Type"] + row["Day"] + row["Time"]}>
        {headers.map((value, index) => {
          return <td key={index}>{row[value]}</td>;
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

export default ScheduleTable;

// How I avoided react hook warnings, says I may need to use suspense in the future
// https://stackoverflow.com/a/53572588/9586164

// How to create a dynamic bootstrap table with react hooks!
// https://dev.to/abodero/creating-a-dynamic-table-using-bootstrap-4-and-react-hooks-4a1m
