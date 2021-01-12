import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from "../../providers/MyProvider";
import "./ScheduleDatePicker.css";

function ScheduleDatePicker() {
  const context = useContext(MyContext);
  const [date, setDate] = useState(new Date());
  const handleChange = (date) => {
    // Change the date displayed in the UI
    context.changeDate(date);
    //Change the date for the Firestore collection ref
    context.changeFirestoreDate(date);
    setDate(date);
  };

  let oneWeekBack = new Date();
  let oneWeekForward = new Date();
  oneWeekBack.setDate(oneWeekBack.getDate() - 7);
  oneWeekForward.setDate(oneWeekForward.getDate() + 7);

  return (
    <div className="datepicker-div">
      <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat="MMMM d, yyyy"
        minDate={oneWeekBack}
        maxDate={oneWeekForward}
        closeOnScroll={true}
        // placeholderText="Placeholder Text 🗓️"
        // className="text-center"
        // excludeDates={[new Date(), subDays(new Date(), 1)]}
      />
    </div>
  );
}

export default ScheduleDatePicker;