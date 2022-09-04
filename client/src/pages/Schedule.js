import * as React from "react";
import { generateTimeSlots } from "../utils/timeSlots";
import { AppWrapper } from "../components/common/shared.style";
import { List, ListItem, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Schedule = () => {
  const morningShift = generateTimeSlots("07:00", "15:00");
  const afternoonShift = generateTimeSlots("15:00", "23:00");
  const nightShift = generateTimeSlots("23:00", "07:00");

  const { user } = useSelector((state) => state.user);

  if (!user) {
    return (
      <AppWrapper>
        <Typography>You do not have permission to see this page</Typography>
      </AppWrapper>
    );
  }

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
