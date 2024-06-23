import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { List, ListItemIcon } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

export const StepListBox = styled(Box)`
  width: 100%;
  height: 100vh;
  //max-width: 360px;
  // background-color: lightgray;
`;

export const StepList = styled(List, {
  withComponent: "nav",
})`
  height: 100%;
  //background-color: lightgray;
`;

export const StepDeleteIcon = styled(DeleteOutlineIcon)`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StepItem = styled(Grid)`
  margin: 10px;
  //background-color: lightgray;
  border-radius: 15px;
`;

export const StepAddIcon = styled(ListItemIcon)`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StepName = styled(Typography, {
  withComponent: "span",
})`
  font-weight: 600;
  font-size: 1.2rem;
`;
