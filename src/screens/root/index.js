import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useReducer, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { apiProject } from "../../axios/project";
import {
  ProjectAddIcon,
  ProjectInfoIcon,
  ProjectList,
  ProjectListBox,
  ProjectName,
} from "../../styled/root";
import { Divider, ListItem, ListItemButton } from "@mui/material";
import { AddCircle, InfoOutlined, Login, Logout } from "@mui/icons-material";
import ProjectInfoModal from "../../components/project/info";
import Typography from "@mui/material/Typography";

const initialState = {
  projects: [
    {
      created_at: Date.now(),
      updated_at: Date.now(),
      id: 1,
      user_id: 1,
      name: "project 1",
      description: "description 1",
    },
  ],
  selectedIndex: 1,
  modalOpen: false,
};

const reducer = (state, action) => {
  // type - project : set, add, remove, update
  // type - selectedIndex : set
  // type - modal: open or close => toggle
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload,
        ),
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project,
        ),
      };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
  }
};

const RootScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    apiProject.getProjects().then((res) => {
      dispatch({ type: "SET_PROJECTS", payload: res });
    });
  }, []);

  // methods
  const handleLogin = () => {
    navigate("/signin");
  };
  const handleLogout = () => {};

  const toggleModal = (project) => () => {
    dispatch({ type: "TOGGLE_MODAL" });
    modalRef.current.setProject(project || {});
  };

  const handleListItemClick = (index) => () => {
    dispatch({ type: "SET_SELECTED_INDEX", payload: index });
    navigate("/projects/" + index);
  };

  const handleUpdateProject = (id, name, description) => {
    apiProject.updateProject(id, name, description).then((res) => {
      dispatch({ type: "UPDATE_PROJECT", payload: res });
    });
  };

  const handleInsertProject = (name, description) => {
    apiProject.addProject(name, description).then((res) => {
      dispatch({ type: "ADD_PROJECT", payload: res });
    });
  };

  const handleDeleteProject = (id) => {
    apiProject.removeProject(id).then(() => {
      dispatch({ type: "REMOVE_PROJECT", payload: id });
    });
  };

  // refs
  const modalRef = useRef(null);

  return (
    <Grid container>
      {/*Project Info Modal TODO: Update */}
      <ProjectInfoModal
        open={state.modalOpen}
        onClose={toggleModal(null)}
        addProject={handleInsertProject}
        updateProject={handleUpdateProject}
        deleteProject={handleDeleteProject}
        ref={modalRef}
      />
      {/* Project List */}
      <Grid xs={2}>
        <ProjectListBox>
          <ProjectList>
            {state.projects.map((project) => (
              <Grid container key={project.id}>
                <Grid>
                  {/*xs={2}*/}
                  <ProjectInfoIcon>
                    <InfoOutlined onClick={toggleModal(project)} />
                  </ProjectInfoIcon>
                </Grid>
                <Grid>
                  {/*xs={10}*/}
                  <ListItemButton
                    selected={state.projects.includes(project.id)}
                    onClick={handleListItemClick(project.id)}
                  >
                    <ProjectName>{project.name}</ProjectName>
                  </ListItemButton>
                </Grid>
              </Grid>
            ))}
            <Divider />
            <ListItemButton onClick={toggleModal(null)}>
              <ProjectAddIcon>
                <AddCircle />
              </ProjectAddIcon>
            </ListItemButton>
            <Divider />
            {!state.isLoggedIn ? (
              <ListItemButton onClick={handleLogin}>
                <Login />
                Login
              </ListItemButton>
            ) : (
              <>
                <ListItem>
                  <Typography variant="body2">{state.userEmail}</Typography>
                </ListItem>
                <ListItemButton onClick={handleLogout}>
                  <Logout />
                  Logout
                </ListItemButton>
              </>
            )}
          </ProjectList>
        </ProjectListBox>
      </Grid>
      <Grid xs={10}>
        {/* Tasks */}
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default RootScreen;
