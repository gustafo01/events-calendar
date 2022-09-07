import React, { useEffect, useState } from "react";
import { createDate } from "../../utils/crateData";
import { createMonth } from "../../utils/createMonth";
import { getMonthesNames } from "../../utils/getMonthesNames";
import { getMonthNumberOfDays } from "../../utils/getMonthNumberOfDays";
import { getWeekDaysNames } from "../../utils/getWeekDaysNames";

export const useCalendar = ({
  firstWeekDay = 2,
  locale = "en-US",
  selectedDate: date,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    createDate({ date, locale: "en-US" })
  );

  const [selectedYear, setSelectedYear] = useState(selectedDate.year);

  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedYear, selectedDate.monthIndex),
      locale,
    })
  );
  const monthesNames = React.useMemo(() => getMonthesNames(locale), [locale]);
  const weekDaysNames = React.useMemo(
    () => getWeekDaysNames(firstWeekDay, locale),
    [firstWeekDay, locale]
  );

  const days = React.useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  );

  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear
    );

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDay - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      7 - lastDay.dayNumberInWeek + shiftIndex > 6
        ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
        : 7 - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }
    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  useEffect(() => {
    setSelectedMonth(
      createMonth({
        date: new Date(selectedYear, selectedMonth.monthIndex),
        locale,
      })
    );
  }, [selectedYear]);

  const onClickArrow = (direction) => {
    if (direction === "next") {
      setSelectedMonth(
        createMonth({
          date: new Date(selectedYear, selectedMonth.monthIndex + 1),
          locale,
        })
      );
    } else {
      setSelectedMonth(
        createMonth({
          date: new Date(selectedYear, selectedMonth.monthIndex - 1),
          locale,
        })
      );
    }
  };

  const changeYear = (direction) => {
    if (direction === "next") {
      setSelectedYear((prevState) => prevState + 1);
    } else {
      setSelectedYear((prevState) => prevState - 1);
    }
  };

  return {
    state: {
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDate,
      selectedMonth,
      selectedYear,
    },
    functions: {
      onClickArrow,
      changeYear,
    },
  };
};
