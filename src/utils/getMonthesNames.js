import { createDate } from "./crateData";

export const getMonthesNames = (locale = "en-US") => {
  const monthesNames = Array.from({length: 12});

  const d = new Date();

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1),
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });

  return monthesNames;
};
