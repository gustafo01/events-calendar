import React, { useState } from "react";
import scss from "./Calendar.module.scss";
import { useCalendar } from "../hooks/useCalendar";
import { checkIsToday } from "../../utils/checkIsToday";
import DatePicker from "../DatePicker/DatePicker";
import { checkMarker } from "../../utils/checkMarker";
import EditMarker from "../EditMarker/EditMarker";

const Calendar = ({
  firstWeekDay = 2,
  selectedDate,
  locale = "en-US",
}) => {
  const { state, functions } = useCalendar({
    firstWeekDay,
    locale,
    selectedDate,
  });

  const [isFormActive, setIsFormActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [item, setItem] = useState("");

  const markers = JSON.parse(localStorage.getItem("markers"));

  const openEdit = (item) => {
    setIsEditActive(true);
    setItem(item);
  };

  return (
    <div>
      <DatePicker
        state={state}
        functions={functions}
        setIsFormActive={setIsFormActive}
        isFormActive={isFormActive}
      />
      <div className={scss.wrap}>
        {state?.calendarDays &&
          state?.calendarDays.map((day) => {
            const isToday = checkIsToday(day?.date);
            const isAdditionalDay =
              day?.monthIndex !== state.selectedMonth.monthIndex;
            const isMarkers = checkMarker(day, markers);
            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                className={`${scss.dayWrap} ${isToday && scss.active} ${
                  isAdditionalDay && scss.activeTest
                }`}
              >
                <div className={scss.infoDate}>
                  <p>{day?.dayShort}</p>
                  <p>{day?.dayNumber}</p>
                </div>
                <div className={scss.marker}>
                  {isMarkers.length > 0 &&
                    isMarkers.map((marker) => (
                      <div key={marker.id}>
                        <div
                          onClick={() => openEdit(marker.id)}
                          className={scss.markerItem}
                        >
                          {marker.title}
                        </div>
                        {isEditActive && item === marker.id && (
                          <EditMarker
                            setIsEditActive={setIsEditActive}
                            marker={marker}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;
