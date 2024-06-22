import Modal from "@mui/material/Modal";
import { ModalBox } from "../../styled/common";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React from "react";
import { ButtonGroup, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import FormControl from "@mui/material/FormControl";

const CustomModal = ({
  open,
  onClose,
  title,
  fields,
  buttons,
  values,
  onChange,
}) => {
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
              {field.date !== undefined ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Basic date picker"
                      onChange={(e) => {
                        // "2024-06-05T15:00:00.000Z" {e.$d} or {e.$y, e.$m, e.$D}
                        // console.log(
                        //   "".concat(
                        //     e.$y,
                        //     String(e.$M + 1).padStart(2, "0"),
                        //     String(e.$D).padStart(2, "0"),
                        //   ),
                        // );
                        onChange(
                          field.name,
                          [
                            e.$y,
                            String(e.$M + 1).padStart(2, "0"),
                            String(e.$D).padStart(2, "0"),
                          ].join("-"),
                        );
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              ) : field.status !== undefined ? (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={values[field.name] || 0}
                    onChange={(e) => {
                      onChange(field.name, e.target.value);
                    }}
                    autoWidth
                  >
                    <MenuItem value={0}>PENDING</MenuItem>
                    <MenuItem value={1}>IN_PROGRESS</MenuItem>
                    <MenuItem value={2}>COMPLETED</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label={field.label}
                  variant="outlined"
                  value={values[field.name] || ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  fullWidth
                />
              )}
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
