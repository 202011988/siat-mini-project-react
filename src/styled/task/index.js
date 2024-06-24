import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { List, ListItemIcon } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

export const TaskListBox = styled(Box)`
  width: 100%;
  height: 100vh;
  //max-width: 360px;
  // background-color: lightgray;
`;

export const TaskList = styled(List, {
  withComponent: "nav",
})`
  height: 100%;
  //background-color: lightgray;
`;

export const TaskInfoIcon = styled(ListItemIcon)`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Dday = styled(Typography, {
  withComponent: "span",
})`
  color: ${(props) =>
    props.dday > 0 ? "gray" : props.dday > -10 ? "red" : "black"};
  font-weight: 600;
  font-size: 1.2rem;
`;

const statusColor = {
  PENDING: "lightgreen",
  IN_PROGRESS: "lightblue",
  COMPLETED: "lightgray",
};

export const TaskItem = styled(Grid)`
  margin: 10px;
  background-color: ${({ status }) => statusColor[status]};
  border-radius: 15px;
`;

export const TaskAddIcon = styled(TaskInfoIcon)`
  width: 100%;
`;

export const TaskName = styled(Typography, {
  withComponent: "span",
})`
  font-weight: 600;
  font-size: 1.2rem;
`;
