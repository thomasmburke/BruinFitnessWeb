    // code to getSchedule using a firestore listener
    function getReservationData() {
        // if using a listener you will also need to detach the listener
      try {
        reservationRef.onSnapshot(function(querySnapshot) {
            let reservationData = [];
             // querySnapshot holds multiple documents, we need to unpack all of them
        querySnapshot.forEach(function (doc) {
          let docData = doc.data();
          // for each workout listed in the firestore document create a schedule entry
        reservationData.push({
            "Workout Type": docData.workoutType,
            id: doc.id,
            "reservationCnt": docData.reservationCnt,
            Time: docData.time
        })
        });
        setReservationData(reservationData);
        });
      } catch (err) {
        console.log("Error getting documents", err);
      }
    }


    function incrementReservation(docId){
    //   get a reference to the doc being updated
      let docRef = reservationRef.doc(docId)
      // using a transaction to ensure we don't exceed the max number of reservations
      return firestore.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then(function(reservationDoc) {
            if (!reservationDoc.exists) {
                throw "Document does not exist!";
            }
            // Get the current reservation count
            let reservationCnt = reservationDoc.data().reservationCnt;
            if (reservationCnt >= 12){
                //TODO: should likely put a toast or alert that they were unable to register for the class
                console.log("sorry class is full!")
            } else {
                // if there is still space left in the class then add the user and increment the count
                //TODO: add the user's id to the list of reserved users
                reservationCnt++;
                transaction.update(docRef, { reservationCnt: reservationCnt });
            }
            // update the local state (reservationData) with the number of users reserved
            for (var i = 0, l = reservationData.length; i < l; i++) {
                    if (reservationData[i]["id"] === docId){
                        const newReservationData= [...reservationData];
                        newReservationData[i]["reservationCnt"] = reservationCnt;
                        console.log(`reservationCnt --> ${reservationCnt}`)
                        setReservationData(newReservationData);
                    }
                }
        });
    }).then(function() {
        console.log("Transaction successfully committed!");
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });
  }

  async function getReservationData() {
      // reservation data will be a list of objects containing the time, workoutType, reservationCnt, etc...
        let reservationData = [];
        try {
            var querySnapshot = await reservationRef.get();
            // querySnapshot holds multiple documents, we need to unpack all of them
            querySnapshot.forEach(function (doc) {
            let docData = doc.data();
            // for each document extract reservationData
            reservationData.push({
                "Workout Type": docData.workoutType,
                id: doc.id,
                "reservationCnt": docData.reservationCnt,
                Time: docData.time
            })
            });
            // set component's state variable to something that is not null
            setReservationData(reservationData);
        } catch (err) {
            console.log("Error getting documents", err);
        }
    }
