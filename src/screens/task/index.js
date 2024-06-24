import { Divider, ListItemButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  TaskAddIcon,
  TaskInfoIcon,
  TaskList,
  TaskListBox,
  TaskName,
  TaskItem,
  Dday,
} from "../../styled/task";
import { AddCircle, InfoOutlined } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useRef } from "react";
import { apiTask } from "../../axios/task";
import TaskInfoModal from "../../components/task/info";
import dayjs from "dayjs";

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
  selectedIndex: 1,
  modalOpen: false,
};

const reducer = (state = initialState, action) => {
  // type - task : set, add, remove, update
  // type - selectedIndex : set
  // type - modal: open or close => toggle
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    apiTask.getTasks(projectId).then((res) => {
      console.log(res);
      dispatch({ type: "SET_TASKS", payload: res });
    });
  }, [projectId]);

  // methods
  const toggleModal = (task) => () => {
    dispatch({ type: "TOGGLE_MODAL" });
    modalRef.current.setTask(task || {});
  };

  const handleListItemClick = (index) => () => {
    dispatch({ type: "SET_SELECTED_INDEX", payload: index });
    navigate(`tasks/${index}`);
  };

  const handleUpdateTask = (id, title, description, dueDate, status) => {
    apiTask
      .updateTask(projectId, id, title, description, dueDate, status)
      .then((res) => {
        dispatch({ type: "UPDATE_TASK", payload: res });
      });
  };

  const handleInsertTask = (title, description, dueDate, status) => {
    apiTask
      .addTask(projectId, title, description, dueDate, status)
      .then((res) => {
        dispatch({ type: "ADD_TASK", payload: res });
      });
  };

  const handleDeleteTask = (id) => {
    apiTask.removeTask(projectId, id).then(() => {
      console.log(id);
      dispatch({ type: "REMOVE_TASK", payload: id });
    });
  };

  // refs
  const modalRef = useRef(null);
  console.log(state.tasks);

  return (
    <Grid container>
      <TaskInfoModal
        open={state.modalOpen}
        onClose={toggleModal(null)}
        addTask={handleInsertTask}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
        ref={modalRef}
        projectId={projectId}
      />
      {/* Task List */}
      <Grid xs={7}>
        <TaskListBox>
          <TaskList>
            {state.tasks.map((task) => (
              <TaskItem status={task.status} container key={task.id}>
                <Grid>
                  {/*xs={2}*/}
                  <TaskInfoIcon>
                    <InfoOutlined onClick={toggleModal(task)} />
                  </TaskInfoIcon>
                </Grid>
                <Grid xs={8}>
                  <ListItemButton
                    selected={state.tasks.includes(task.id)}
                    onClick={handleListItemClick(task.id)}
                    //sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <TaskName>{task.title}</TaskName>
                  </ListItemButton>
                </Grid>
                <Grid>
                  {/*xs={10}*/}
                  <ListItemButton>
                    <Dday dday={dayjs().diff(task.dueDate, "days")}>
                      D
                      {dayjs().diff(task.dueDate, "days") < 0
                        ? dayjs().diff(task.dueDate, "days")
                        : dayjs().diff(task.dueDate, "days") === 0
                          ? "-Day"
                          : "+" + dayjs().diff(task.dueDate, "days")}
                    </Dday>
                  </ListItemButton>
                </Grid>
              </TaskItem>
            ))}
            <Divider />
            <ListItemButton onClick={toggleModal(null)}>
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
