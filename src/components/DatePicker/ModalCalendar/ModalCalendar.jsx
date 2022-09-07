import React from "react";
import scss from "./ModalCalendar.module.scss";

const ModalCalendar = ({ state, functions, setIsModalActive }) => {
  return (
    <div className={scss.modalWrap}>
      <div className={scss.wrapDateNav}>
        <button className="prev" onClick={() => functions.onClickArrow("prev")}></button>
        <p>{state?.selectedMonth?.monthName} {state.selectedYear}</p>
        <button className="next" onClick={() => functions.onClickArrow("next")}></button>
      </div>
      <div className={scss.wrapDateNav}>
        <button className="prev" onClick={() => functions.changeYear("prev")}></button>
        <p>{state.selectedYear}</p>
        <button className="next" onClick={() => functions.changeYear("next")}></button>
      </div>
      <button className={`closeBtn ${scss.btnClose}`} onClick={() => setIsModalActive(false)}></button>
    </div>
  );
};

export default ModalCalendar;
