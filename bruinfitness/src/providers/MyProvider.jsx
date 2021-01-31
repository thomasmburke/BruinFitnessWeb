import React, { Component } from "react";

export const MyContext = React.createContext();

class MyProvider extends Component {
  getTodaysDateString() {
    let today = new Date();
    let day = String(today.getDate());
    let month = String(today.getMonth() + 1); //January is 0!
    return `${month}/${day}`;
  }

  formatDate(date) {
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1); //January is 0!
    return `${month}/${day}`;
  }

  getTodaysFirestoreDateString() {
    let today = new Date();
    // Add 0 to the string and then take the last 2 digits e.g. 0+9 -> 09 & 0+10 -> 10
    let day = ('0' + String(today.getDate())).slice(-2);
    let month = ('0' + String(today.getMonth() + 1)).slice(-2); //January is 0!
    let year = String(today.getFullYear());
    return `${year}-${month}-${day}`;
  }

  formatFirestoreDate(date) {
    // Add 0 to the string and then take the last 2 digits e.g. 0+9 -> 09 & 0+10 -> 10
    let day = ('0' + String(date.getDate())).slice(-2);
    let month = ('0' + String(date.getMonth() + 1)).slice(-2); //January is 0!
    let year = String(date.getFullYear());
    return `${year}-${month}-${day}`;
  }

  state = {
    scheduleDate: this.getTodaysDateString(),
    firestoreDate: this.getTodaysFirestoreDateString(),
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          changeDate: (date) =>
            this.setState({ scheduleDate: this.formatDate(date) }),
          changeFirestoreDate: (date) =>
            this.setState({ firestoreDate: this.formatFirestoreDate(date) }),
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
