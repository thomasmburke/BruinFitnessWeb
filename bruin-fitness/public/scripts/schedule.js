"use strict";

var firestore = firebase.firestore();
const docRef = firestore.doc(
  "schedules/San Leandro/schedule/LR7CLQA7fs5h07DAOpWb"
);

function getRealtimeUpdates() {
  docRef.onSnapshot(function (doc) {
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log("data from firestore: " + myData.workoutType);
    }
  });
}

getRealtimeUpdates();

// document.getElementById("clickMe").onclick = function () {
//     console.log('Query triggered...');
//     firestore.collection('schedules').document("San Leandro").collection("schedule").document("
// LR7CLQA7fs5h07DAOpWb")
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 console.log(doc.id, " => ", doc.data());
//             });
//         })
//         .catch(function (error) {
//             console.log("Error getting documents: ", error);
//         });
// };
