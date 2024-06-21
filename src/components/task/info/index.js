import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../info";

const TaskInfoModal = forwardRef(
  ({ open, onClose, addTask, updateTask, deleteTask }, ref) => {
    const [task, setTask] = useState({});

    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      setTask: (newTask) => {
        setTask(newTask);
      },
    }));

    const handleInsert = () => {
      // TODO
      onClose();
    };

    const handleUpdate = () => {
      // TODO
      onClose();
    };

    const handleDelete = () => {
      // TODO
      onClose();
    };

    const handleChange = (field, value) => {
      setTask((prev) => ({ ...prev, [field]: value }));
    };

    const fields = [
      { name: "dueDate", label: "마감일" },
      { name: "title", label: "제목" },
      { name: "description", label: "설명" },
      { name: "status", label: "상태" },
    ];

    const buttons = [
      {
        text: "추가하기",
        variant: "contained",
        disabled: task.id,
        onClick: handleInsert,
      },
      {
        text: "수정하기",
        variant: "contained",
        disabled: !task.id,
        onClick: handleUpdate,
      },
      {
        text: "삭제하기",
        variant: "contained",
        color: "warning",
        disabled: !task.id,
        onClick: handleDelete,
      },
      { text: "닫기", variant: "outlined", onClick: onClose },
    ];

    return (
      <CustomModal
        open={open}
        onClose={onClose}
        title="할 일 정보"
        fields={fields}
        buttons={buttons}
        values={task}
        onChange={handleChange}
      />
    );
  },
);

export default TaskInfoModal;
