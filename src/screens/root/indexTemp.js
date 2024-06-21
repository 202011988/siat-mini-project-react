import React, { useEffect, useReducer } from "react";
import Box from "@mui/material/Box";
import {
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Delete, Edit, PostAdd } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const initialValues = [
  {
    id: 0,
    name: "project1",
  },
  {
    id: 1,
    name: "project2",
  },
  {
    id: 2,
    name: "project3",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RootScreenTemp = () => {
  // TODO: reducer 사용 (최적화)

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [newProjectName, setNewProjectName] = React.useState("");
  const [newProjectDescription, setNewProjectDescription] = React.useState("");
  const [projects, setProjects] = React.useState(initialValues);

  // Modal
  const [projectInsertModal, setProjectInsertModal] = React.useState(false);
  // const [new]

  useEffect(() => {
    // TODO: get projects - OK
    // axios.get("/api/projects").then((response) => {
    //   setProjects(response.data);
    // });
  }, []);

  const navigate = useNavigate();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate("/projects/" + index);
  };

  const handleOpen = () => setProjectInsertModal(true);
  const handleClose = () => setProjectInsertModal(false);

  const handleInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const insertProject = () => {
    // TODO: insert a project
    axios
      .post(`api/projects/`)
      .setProjects((v) => [projects, { id: v.length, name: newProjectName }]);
    setNewProjectName("");
    setProjectInsertModal(false);
  };

  // test
  console.log("rendering");

  return (
    <Grid container flexDirection="row" height="100%">
      <Grid
        container
        flexDirection="column"
        justifyContent="space-evenly"
        xs={3}
      >
        <Grid item>
          {/*  project list */}
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List component="nav" aria-label="secondary mailbox folder">
              {projects.map(({ id, name }) => (
                <>
                  <ListItemIcon>
                    <Delete
                      color="warning"
                      onClick={() => {
                        // TODO: delete the project
                        axios
                          .delete(`/api/projects/${id}`)
                          .then(() => {
                            setProjects((v) =>
                              v.filter((project) => project.id !== id),
                            );
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    />
                  </ListItemIcon>

                  <Edit
                    onClick={() => {
                      // TODO: edit the project (name, description)
                    }}
                  />
                  <ListItemButton
                    selected={selectedIndex === id}
                    onClick={(event) => handleListItemClick(event, id)}
                    key={id}
                  >
                    <ListItemText primary={name} />
                  </ListItemButton>
                </>
              ))}
              <ListItem>
                <ListItemText primary={<PostAdd />} onClick={handleOpen} />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item>
          {/*  user account */}
          user box
        </Grid>
      </Grid>
      <Grid item xs={9}>
        {/* insert a project modal */}
        <Modal
          open={projectInsertModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Addition Your Project
            </Typography>
            <Grid container flexDirection="column">
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="이름"
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="설명"
                  variant="outlined"
                  style={{ marginBottom: 15 }}
                />
              </Grid>
              <Grid item>
                {/*<ButtonGroup size="large">*/}
                <Button
                  variant="contained"
                  size="large"
                  style={{ margin: 15 }}
                  onClick={insertProject}
                >
                  추가
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  style={{ margin: 15 }}
                  onClick={() => {
                    setProjectInsertModal(false);
                    setNewProjectName("");
                    setNewProjectDescription("");
                  }}
                >
                  취소
                </Button>
                {/*</ButtonGroup>*/}
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Outlet />
        {/*<Outlet context={selectedIndex} />*/}
        {/*<TodoApp projectId={selectedIndex} />*/}
      </Grid>
    </Grid>
  );
};

export default RootScreenTemp;
