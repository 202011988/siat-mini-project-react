import { forwardRef, useImperativeHandle, useState } from "react";
import CustomModal from "../../info";
import { useNavigate } from "react-router-dom";

const StepInfoModal = forwardRef(({ open, onClose, addStep }, ref, taskId) => {
  const [step, setStep] = useState({});

  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    setStep: (newStep) => {
      setStep(newStep);
    },
  }));

  const validateInputs = (name, description) => {
    let isValid = true;

    if (!name || !name.length > 0) {
      alert("유효하지 않은 이름입니다.");
      return false;
    }

    if (!description || !description.length > 0) {
      alert("유효하지 않은 설명입니다.");
      return false;
    }
    return isValid;
  };
  const handleInsert = () => {
    if (validateInputs(step.title, step.description)) {
      addStep(step.title, step.description);
      onClose();
    }
  };

  // const handleDelete = () => {
  //   deleteStep(step.id);
  //   navigate("/");
  //   onClose();
  // };

  const handleChange = (field, value) => {
    setStep((prev) => ({ ...prev, [field]: value }));
  };

  const fields = [
    { name: "title", label: "이름" },
    { name: "description", label: "설명" },
  ];

  const buttons = [
    {
      text: "추가하기",
      variant: "contained",
      disabled: !!step.id,
      onClick: handleInsert,
    },
    { text: "닫기", variant: "outlined", onClick: onClose },
  ];

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="단계 추가"
      fields={fields}
      buttons={buttons}
      values={step}
      onChange={handleChange}
    />
  );
});

export default StepInfoModal;
