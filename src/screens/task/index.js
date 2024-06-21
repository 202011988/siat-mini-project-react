import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  TaskAddIcon,
  TaskInfoIcon,
  TaskList,
  TaskListBox,
  TaskName,
} from "../../styled/task";
import { AddCircle, InfoOutlined } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useEffect, useReducer, useRef} from "react";
import { apiTask } from "../../axios/task";
import TaskInfoModal from "../../components/task/info";

const initialState = {
  tasks: [
    {
      id: 1,
      project_id: 1,
      updated_at: new Date(),
      created_at: new Date(),
      due_date: new Date() + 2,
      description: "description 1",
      title: "title 1",
      status: "PENDING",
    },
  ],
};

const reducer = (state = initialState, action) => {
  // type - task : set, add, remove, update
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((id) => id !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id !== action.payload ? action.payload : task,
        ),
      };
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { projectId } = useParams();

  useEffect(() => {
    apiTask.getTasks(projectId).then((res) => {
      console.log(res);
      dispatch({ type: "SET_TASKS", payload: res });
    });
  }, [projectId]);

  // methods
  const toggleModal = (project) => () => {
    dispatch({ type: "TOGGLE_MODAL" });
    modalRef.current.setProject(project || {});
  };

  const handleListItemClick = (index) => () => {
    dispatch({ type: "SET_SELECTED_INDEX", payload: index });
    navigate("tasks/" + index);
  };

  const handleUpdateTask = (id, name, description) => {
    // TODO
    // apiProject.updateProject(id, name, description).then((res) => {
    //   dispatch({ type: "UPDATE_PROJECT", payload: res });
    // });
  };

  const handleInsertTask = (name, description) => {
    // TODO
    // apiProject.addProject(name, description).then((res) => {
    //   dispatch({ type: "ADD_PROJECT", payload: res });
    // });
  };

  const handleDeleteTask = (id) => {
    // TODO
    // apiProject.removeProject(id).then(() => {
    //   dispatch({ type: "REMOVE_PROJECT", payload: id });
    // });
  };

  // refs
  const modalRef = useRef(null);

  return (
    <Grid container>
      <TaskInfoModal
      open={}
      onClose={}
      addTask={}
      updateTask={}
      deleteTask={}
      ref={modalRef}
      />
      {/* Task List */}
      <Grid xs={7}>
        <TaskListBox>
          <TaskList>
            {state.tasks.map((task) => (
              <Grid container key={task.id}>
                <Grid xs={2}>
                  <TaskInfoIcon>
                    <InfoOutlined onClick={toggleModal(task)} />
                  </TaskInfoIcon>
                </Grid>
                <Grid xs={10}>
                  <ListItemButton selected={state.tasks.includes(task.id)}>
                    <TaskName>{task.title}</TaskName>
                  </ListItemButton>
                </Grid>
              </Grid>
            ))}
            <Divider />
            <ListItemButton onClick={() => {}}>
              <TaskAddIcon>
                <AddCircle />
              </TaskAddIcon>
            </ListItemButton>
          </TaskList>
        </TaskListBox>
      </Grid>
      <Grid xs={5}>
        {/* Steps */}
        <Outlet />
      </Grid>
    </Grid>
  );

  // return (
  //   <div>
  //     {state.tasks.map((value) => (
  //       <p>{value.title}</p>
  //     ))}
  //   </div>
  // );
};

export default TodoApp;
