import React, {Component} from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
    getTodaysDateString(){
        let today = new Date();
        let day = String(today.getDate())
        let month = String(today.getMonth() + 1) //January is 0!
        return `${month}/${day}`
    }
    formatDate(date){
        let day = String(date.getDate())
        let month = String(date.getMonth() + 1) //January is 0!
        return `${month}/${day}`
    }

    state = {
        scheduleDate: this.getTodaysDateString()
    }
    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                changeDate: (date) => this.setState({scheduleDate: this.formatDate(date)})
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider;
