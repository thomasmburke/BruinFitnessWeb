import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

// Initialize Firestore
var firestore = firebase.firestore();
// Get a reference to the schedule collection of interest
const scheduleRef = firestore.collection("schedules/San Leandro/schedule");

let sampleData = [
  { "Workout Type": "CrossFit", Day: "Thurs", Time: "2:00pm - 2:30pm" },
  { "Workout Type": "Open Gym", Day: "Mon-Fri", Time: "4:00pm - 5:00pm" },
  { "Workout Type": "Weightlifting", Day: "Fri", Time: "2:00pm - 2:30pm" },
];
// console.log(Object.keys(sampleData));

function ScheduleTable() {
  const [scheduleData, setScheduleData] = useState(sampleData);
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
    <div>
      <table className="table table-bordered table-hover">
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

  function buildRow(row, headers) {
    return (
      <tr key={row["Workout Type"]}>
        {headers.map((value, index) => {
          return <td key={index}>{row[value]}</td>;
        })}
      </tr>
    );
  }

  return (
    <tbody>
      {rows &&
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
