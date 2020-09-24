import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

// Initialize Firestore
var firestore = firebase.firestore();
// Get a reference to the schedule collection of interest
const scheduleRef = firestore.collection("schedules/San Leandro/schedule");

function ScheduleTable() {
  const [scheduleTable, setScheduleTable] = useState("");

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
        console.log(schedule[0]["Day"]);
        setScheduleTable(schedule[0]["Day"]);
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }
    getSchedule();
  }, []);

  return (
    <div>
      <h1>{scheduleTable}</h1>
    </div>
  );
}

export default ScheduleTable;

//   useEffect(
//     () =>
//       getSchedule().then((schedule) =>
//         setScheduleTable(() => schedule[0]["Day"])
//       ),
//     []
//   );

// https://stackoverflow.com/a/53572588/9586164
