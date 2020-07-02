"use strict";

// TODO: Enable firebase performance monitoring
firebase.performance();

// var firestore = firebase.firestore();
/*
document.getElementById("clickMe").onclick = function () {
    console.log('composite index query triggered...');
    firestore.collection('workouts')
    .where("name", "==", "tom")
    .where("weight", "==", "200")
    .where("age", "<", 30)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
};
*/
