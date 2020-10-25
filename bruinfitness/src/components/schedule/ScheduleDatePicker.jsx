import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleDatePicker.css";
import { MyContext } from "../../providers/MyProvider";

function ScheduleDatePicker() {
  const context = useContext(MyContext)
  const [date, setDate] = useState(new Date());
  const handleChange = (date) => {
    context.changeDate(date);
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

{/* <MyContext.Consumer>
            {(context) =>(
              <button onClick={context.changeDate}>Change the date!</button>
            )}
        </MyContext.Consumer> */}

{/* <MyContext.Consumer>
        {(context) =>(
)}
      </MyContext.Consumer> */}
