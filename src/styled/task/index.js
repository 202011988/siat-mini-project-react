import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { List, ListItemIcon } from "@mui/material";
import Typography from "@mui/material/Typography";

export const TaskListBox = styled(Box)`
  width: 100%;
  height: 100vh;
  //max-width: 360px;
  background-color: lightgray;
`;

export const TaskList = styled(List, {
  withComponent: "nav",
})`
  height: 100%;
`;

export const TaskInfoIcon = styled(ListItemIcon)`
  justify-content: center;
  align-items: center;
  height: 100%;
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
