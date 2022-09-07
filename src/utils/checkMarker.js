export const checkMarker = (day, markers) => {
  return markers.filter(
    (marker) =>
      +marker.day === day.dayNumber &&
      +marker.month === day.monthNumber &&
      +marker.year === day.year
  );
};
