import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { apiTask } from "../../axios/task";

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
      return;
    case "REMOVE_TASK":
      return;
    case "UPDATE_TASK":
      return;
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

  return (
    <div>
      {state.tasks.map((value) => (
        <p>{value.title}</p>
      ))}
    </div>
  );
};

export default TodoApp;
