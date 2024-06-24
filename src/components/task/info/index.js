import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../info";

const TaskInfoModal = forwardRef(
  ({ open, onClose, addTask, updateTask, deleteTask, projectId }, ref) => {
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

    const validateInputs = (title, description, dueDate) => {
      let isValid = true;

      if (!title || !title.length > 0) {
        alert("유효하지 않은 제목입니다.");
        return false;
      }

      if (!description || !description.length > 0) {
        alert("유효하지 않은 설명입니다.");
        return false;
      }

      if (!dueDate || !dueDate.length > 0) {
        alert("유효하지 않은 기한입니다.");
        return false;
      }
      return isValid;
    };

    const handleInsert = () => {
      // TODO : title, description, dueDate, status
      if (validateInputs(task.title, task.description, task.dueDate)) {
        addTask(task.title, task.description, task.dueDate, task.status);
        onClose();
      }
    };

    const handleUpdate = () => {
      if (
        validateInputs(task.title, task.description, task.dueDate, task.status)
      ) {
        updateTask(
          task.id,
          task.title,
          task.description,
          task.dueDate,
          task.status,
        );
        onClose();
      }
    };

    const handleDelete = () => {
      deleteTask(task.id);
      navigate(`/projects/${projectId}`);
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
