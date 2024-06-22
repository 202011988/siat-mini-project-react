import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../info";

const TaskInfoModal = forwardRef(
  ({ open, onClose, addTask, updateTask, deleteTask }, ref) => {
    const [task, setTask] = useState({});

    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      setTask: (newTask) => {
        setTask(() => {
          return {
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate || null,
            status:
              newTask.status === "PENDING" || newTask.status === undefined
                ? 0
                : newTask.status === "IN_PROGRESS"
                  ? 1
                  : 2,
          };
        });
      },
    }));

    console.log(task);

    const handleInsert = () => {
      // TODO : title, description, dueDate, status
      addTask(task.title, task.description, task.dueDate, task.status);
      onClose();
    };

    const handleUpdate = () => {
      // TODO
      updateTask();
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
      {
        name: "dueDate",
        label: "마감일",
        date: true,
      },
      { name: "title", label: "제목" },
      { name: "description", label: "설명" },
      { name: "status", label: "상태", status: true },
    ];

    const buttons = [
      {
        text: "추가하기",
        variant: "contained",
        disabled: !!task.id,
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
