"use strict";

var firestore = firebase.firestore();
const docRef = firestore.doc(
  "schedules/San Leandro/schedule/LR7CLQA7fs5h07DAOpWb"
);
const scheduleRef = firestore.collection("schedules/San Leandro/schedule");

async function getSchedule() {
  let schedule = [];
  try {
    var querySnapshot = await scheduleRef.get();
    querySnapshot.forEach(function (doc) {
      let docData = doc.data();
      let workoutType = docData.workoutType;
      docData.scheduleTimes.forEach((scheduleEntry) =>
        schedule.push({
          workoutType: workoutType,
          day: scheduleEntry.day,
          time: scheduleEntry.time,
        })
      );
    });
    return schedule;
  } catch (err) {
    console.log("Error getting documents", err);
  }
}

async function generateScheduleTable() {
  let schedule = await getSchedule();
  let table = document.querySelector("table");
  let scheduleHeaders = Object.keys(schedule[0]);
  generateTableBody(table, schedule);
  generateTableHead(table, scheduleHeaders);
}

generateScheduleTable();

// DYNAMIC SCHEDULE TABLE CREATION

let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" },
];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTableBody(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let x in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[x]);
      cell.appendChild(text);
    }
  }
}
