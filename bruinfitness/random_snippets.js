    // code to getSchedule using a firestore listener
    function getSchedule() {
        // if using a listener you will also need to detach the listener
      try {
        reservationRef.onSnapshot(function(querySnapshot) {
            let schedule = [];
             // querySnapshot holds multiple documents, we need to unpack all of them
        querySnapshot.forEach(function (doc) {
          let docData = doc.data();
          // for each workout listed in the firestore document create a schedule entry
        schedule.push({
            "Workout Type": docData.workoutType,
            id: doc.id,
            "reservationCnt": docData.reservationCnt,
            Time: docData.time
        })
        });
        setReservationData(schedule);
        });
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }
