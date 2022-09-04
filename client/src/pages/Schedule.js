import * as React from "react";
import { generateTimeSlots } from "../utils/timeSlots";
import { AppWrapper } from "../components/common/shared.style";
import { List, ListItem, Paper } from "@mui/material";

const Schedule = () => {
  const morningShift = generateTimeSlots("07:00", "15:00");
  const afternoonShift = generateTimeSlots("15:00", "23:00");
  const nightShift = generateTimeSlots("23:00", "07:00");

  const morningColumns = [];

  console.log(morningShift);
  console.log(afternoonShift);
  console.log(nightShift);

  return (
    <AppWrapper>
      <Paper>
        <List>
          {morningShift.map((time) => (
            <ListItem>{time}</ListItem>
          ))}
        </List>
      </Paper>
    </AppWrapper>
  );
};

export default Schedule;
