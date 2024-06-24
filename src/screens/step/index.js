import { Divider, ListItemButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  StepListBox,
  StepName,
  StepItem,
  StepList,
  StepInfoIcon,
  StepAddIcon,
  StepDeleteIcon,
} from "../../styled/step";
import { AddCircle, InfoOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useRef } from "react";
import { apiStep } from "../../axios/step";
import StepInfoModal from "../../components/step/info";
import { useNavigate } from "react-router-dom";

const initialState = {
  steps: [
    {
      id: 1,
      task_id: 1,
      step_id: 1,
      description: "description 1",
      title: "title 1",
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
    case "SET_STEPS":
      return { ...state, steps: action.payload };
    case "ADD_STEP":
      return { ...state, steps: [...state.steps, action.payload] };
    case "REMOVE_STEP":
      return {
        ...state,
        steps: state.steps.filter((step) => step.id !== action.payload),
      };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
  }
};

const StepApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiStep.getSteps(taskId).then((res) => {
      console.log(res);
      dispatch({ type: "SET_STEPS", payload: res });
    });
  }, [taskId]);

  // methods
  const toggleModal = (step) => () => {
    dispatch({ type: "TOGGLE_MODAL" });
    modalRef.current.setStep(step || {});
  };

  const handleInsertStep = (title, description) => {
    apiStep.addStep(taskId, title, description).then((res) => {
      dispatch({ type: "ADD_STEP", payload: res });
    });
    // .catch(() => {
    //   alert("비정상적인 입력입니다.");
    // });
  };

  const handleDeleteStep = (id) => (event) => {
    apiStep.removeStep(id).then(() => {
      console.log(id);
      dispatch({ type: "REMOVE_STEP", payload: id });
    });
  };

  // refs
  const modalRef = useRef(null);

  return (
    <Grid container>
      <StepInfoModal
        open={state.modalOpen}
        onClose={toggleModal(null)}
        addStep={handleInsertStep}
        // deleteStep={handleDeleteStep}
        ref={modalRef}
        taskId={taskId}
      />
      {/* Task List */}
      <StepListBox>
        <StepList>
          {state.steps.map((step) => (
            <StepItem status={step.status} container key={step.id}>
              <Grid xs={10}>
                {/*xs={10}*/}
                <ListItemButton selected={state.steps.includes(step.id)}>
                  <StepName>{step.title}</StepName>
                </ListItemButton>
              </Grid>
              <Grid>
                {/*xs={2}*/}
                <StepDeleteIcon
                  onClick={handleDeleteStep(step.id)}
                ></StepDeleteIcon>
              </Grid>
            </StepItem>
          ))}
          <Divider />
          <ListItemButton onClick={toggleModal(null)}>
            <StepAddIcon>
              <AddCircle />
            </StepAddIcon>
          </ListItemButton>
        </StepList>
      </StepListBox>
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

export default StepApp;
