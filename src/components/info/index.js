import Modal from "@mui/material/Modal";
import { ModalBox } from "../../styled/common";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React from "react";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";

const CustomModal = ({
  open,
  onClose,
  title,
  fields,
  buttons,
  values,
  onChange,
}) => {
  console.log(values);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalBox>
        <Grid container flexDirection="column" spacing={3}>
          <Grid>
            <Typography id="modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Grid>
          {fields.map((field) => (
            <Grid item key={field.name}>
              <TextField
                label={field.label}
                variant="outlined"
                value={values[field.name] || ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item>
            <ButtonGroup fullWidth>
              {buttons.map((button) => (
                <Button
                  key={button.text}
                  variant={button.variant}
                  color={button.color}
                  disabled={button.disabled}
                  onClick={button.onClick}
                >
                  {button.text}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Grid>
      </ModalBox>
    </Modal>
  );
};

export default CustomModal;
