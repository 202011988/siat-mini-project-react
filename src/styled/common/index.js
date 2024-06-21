import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fdfdfa;
  border: 2px solid #000;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;
