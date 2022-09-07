import React, { useState } from "react";
import AddMarker from "../AddMarker/AddMarker";
import scss from "./DatePicker.module.scss";
import ModalCalendar from "./ModalCalendar/ModalCalendar";

const DatePicker = ({ state, functions, isFormActive, setIsFormActive }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div className={scss.dateNav}>
      <div className={scss.form}>
        <button
          className="addBtn"
          onClick={() => setIsFormActive(true)}
        ></button>
        {isFormActive && <AddMarker setIsFormActive={setIsFormActive} />}
      </div>
      <div className={scss.wrapSelect}>
        <button
          className="prev"
          onClick={() => functions.onClickArrow("prev")}
        ></button>
        <p>
          {state?.selectedMonth?.monthName} {state.selectedYear}
        </p>
        <button
          className="next"
          onClick={() => functions.onClickArrow("next")}
        ></button>
        <button
          className={scss.calendarBtn}
          onClick={() => setIsModalActive(true)}
        ></button>
      </div>
      {isModalActive && (
        <ModalCalendar
          state={state}
          functions={functions}
          setIsModalActive={setIsModalActive}
        />
      )}
    </div>
  );
};

export default DatePicker;
