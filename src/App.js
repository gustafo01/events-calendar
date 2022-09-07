import React, { useState } from "react";
import Calendar from "./components/Calendar/Calendar";

const App = () => {
  const [selectedDate, selectDate] = useState(new Date());

  const initialMarkers = [
    {
      day: '7',
      month: '9',
      year: '2022',
      time: '08:02',
      title: 'Make a task',
      description: 'Make',
      createdAt: "Sep 07 2022 15:07:04",
      dateMarker: "2022-09-07",
      id: 1662547384617
    },
  ];

  localStorage.setItem("markers", JSON.stringify(JSON.parse(localStorage.getItem('markers')) || initialMarkers));

  return (
    <div className="wrapper">
      <Calendar selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  );
};

export default App;
