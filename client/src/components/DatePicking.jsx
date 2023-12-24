import React, { useState } from "react";
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import "react-datepicker/dist/react-datepicker.css";

const DatePicking = ({ name }) => {
  const [startDate, setStartDate] = useState("");

  const range = (start, end) => {
    return new Array(end - start + 1).fill().map((d, i) => i + start);
  };
  const years = range(1940, getYear(new Date()));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
          className="bg-primary text-white"
        >
          <button
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "center",
              borderRadius: 3,
            }}
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>
          <select
            className="bg-primary text-white"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="bg-primary text-white"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            required
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "center",
              borderRadius: 3,
            }}
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="bg-primary text-white"
          >
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className=" bg-base-200 input input-bordered w-full"
      name={name}
      required
    />
  );
};

export default DatePicking;
