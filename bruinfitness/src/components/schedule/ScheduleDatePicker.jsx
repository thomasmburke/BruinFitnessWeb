import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleDatePicker.css";

function ScheduleDatePicker() {
  const [date, setDate] = useState(new Date());
  const handleChange = (date) => setDate(date);

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
        // className="text-center"
        // excludeDates={[new Date(), subDays(new Date(), 1)]}
      />
    </div>
  );
}

export default ScheduleDatePicker;
