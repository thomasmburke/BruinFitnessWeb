"use strict";

var firestore = firebase.firestore();
const docRef = firestore.doc(
  "schedules/San Leandro/schedule/LR7CLQA7fs5h07DAOpWb"
);
const scheduleRef = firestore.collection("schedules/San Leandro/schedule");

/**
 * Summary: Reach out to Firestore and get all schedule entry data
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
    return schedule;
  } catch (err) {
    console.log("Error getting documents", err);
  }
}

/**
 * Summary: Create table body and header (optional)
 */
async function generateScheduleTable() {
  let schedule = await getSchedule();
  let table = document.querySelector("#scheduleTable");
  // Get the keys of the javascript schedule object
  //   let scheduleHeaders = Object.keys(schedule[0]);
  //   generateTableHead(table, scheduleHeaders);
  generateTableBody(table, schedule);
}

/**
 * Summary: Create table header
 * @param {HTMLTableElement}   table           The HTML Table element we look to add headers to
 * @param {Array}   dataHeaders          List of table headers
 */
function generateTableHead(table, dataHeaders) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  dataHeaders.forEach((header) => {
    let th = document.createElement("th");
    let text = document.createTextNode(header);
    th.appendChild(text);
    row.appendChild(th);
  });
}

/**
 * Summary: Create table body and populate it with schedule data
 * @param {HTMLTableElement}   table           The HTML Table element we look to add headers to
 * @param {Array}   data          All the data entries to be added as rows to the table body
 */
function generateTableBody(table, data) {
  var tbdy = document.createElement("tbody");
  table.appendChild(tbdy);
  data.forEach((scheduleObj) => {
    let row = tbdy.insertRow();
    for (let key in scheduleObj) {
      let cell = row.insertCell();
      let text = document.createTextNode(scheduleObj[key]);
      cell.appendChild(text);
    }
  });
}

// DYNAMIC SCHEDULE TABLE CREATION
generateScheduleTable();
