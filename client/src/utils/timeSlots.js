import moment from "moment";

export const generateTimeSlots = (start, end) => {
  let startTime = moment(start, "HH:mm");
  let endTime = moment(end, "HH:mm");

  if (endTime.isBefore(startTime)) {
    endTime.add(1, "day");
  }

  let timeSlots = [];

  while (startTime <= endTime) {
    timeSlots.push(new moment(startTime).format("HH:mm"));
    startTime.add(20, "minutes");
  }
  return timeSlots;
};
