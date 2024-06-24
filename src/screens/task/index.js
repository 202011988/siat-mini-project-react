import { Divider, ListItemButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  TaskAddIcon,
  TaskInfoIcon,
  TaskList,
  TaskListBox,
  TaskName,
  TaskItem,
} from "../../styled/task";
import { AddCircle, InfoOutlined } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useRef } from "react";
import { apiTask } from "../../axios/task";
import TaskInfoModal from "../../components/task/info";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const initialState = {
  tasks: [],
  selectedIndex: null,
  modalOpen: false,
  totalPage: 0,
  currentPage: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      console.log("작업 설정 중:", action.payload);
      return { ...state, tasks: action.payload.tasks, totalPage: action.payload.totalPage };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "REMOVE_TASK":
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const modalRef = useRef(null);

  const fetchTasks = async (projectId, currentPage) => {
    try {
      const res = await apiTask.getTasks(projectId, currentPage);
      console.log("API 응답:", res);

      if (res.resultList && Array.isArray(res.resultList)) {
        dispatch({
          type: "SET_TASKS",
          payload: { tasks: res.resultList, totalPage: res.totalPage },
        });
      } else {
        console.error("resultList가 배열이 아니거나 정의되지 않음:", res.resultList);
      }
    } catch (error) {
      console.error("작업을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTasks(projectId, state.currentPage);
  }, [projectId, state.currentPage]);

  const toggleModal = (task) => () => {
    dispatch({ type: "TOGGLE_MODAL" });
    modalRef.current.setTask(task || {});
  };

  const handleListItemClick = (index) => () => {
    dispatch({ type: "SET_SELECTED_INDEX", payload: index });
    navigate(`tasks/${index}`);
  };

  const handleUpdateTask = (id, title, description, dueDate, status) => {
    apiTask.updateTask(projectId, id, title, description, dueDate, status).then(() => {
      fetchTasks(projectId, state.currentPage); // 작업 업데이트 후 다시 데이터를 가져옴
    }).catch(error => {
      console.error("작업을 업데이트하는 중 오류 발생:", error);
    });
  };

  const handleInsertTask = (title, description, dueDate, status) => {
    apiTask.addTask(projectId, title, description, dueDate, status).then(() => {
      fetchTasks(projectId, state.currentPage); // 작업 추가 후 다시 데이터를 가져옴
    }).catch(error => {
      console.error("작업을 추가하는 중 오류 발생:", error);
    });
  };

  const handleDeleteTask = (id) => {
    apiTask.removeTask(projectId, id).then(() => {
      fetchTasks(projectId, state.currentPage); // 작업 삭제 후 다시 데이터를 가져옴
    }).catch(error => {
      console.error("작업을 삭제하는 중 오류 발생:", error);
    });
  };

  const handlePageChange = (event, value) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: value - 1 });
  };

  console.log("현재 state.tasks:", state.tasks);

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
      <Grid xs={7}>
        <TaskListBox>
          <TaskList>
            {state.tasks.length > 0 ? (
              state.tasks.map((task) => (
                <TaskItem status={task.status} container key={task.id}>
                  <Grid>
                    <TaskInfoIcon>
                      <InfoOutlined onClick={toggleModal(task)} />
                    </TaskInfoIcon>
                  </Grid>
                  <Grid>
                    <ListItemButton
                      selected={state.selectedIndex === task.id}
                      onClick={handleListItemClick(task.id)}
                    >
                      <TaskName>{task.title}</TaskName>
                    </ListItemButton>
                  </Grid>
                </TaskItem>
              ))
            ) : (
              <p>Task가 없습니다.</p>
            )}
            <Divider />
            <ListItemButton onClick={toggleModal(null)}>
              <TaskAddIcon>
                <AddCircle />
              </TaskAddIcon>
            </ListItemButton>
          </TaskList>
          <Stack spacing={2}>
            <Pagination
              count={state.totalPage}
              page={state.currentPage + 1}
              onChange={handlePageChange}
            />
          </Stack>
        </TaskListBox>
      </Grid>
      <Grid xs={5}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default TodoApp;