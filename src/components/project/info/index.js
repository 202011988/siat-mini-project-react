import { forwardRef, useImperativeHandle, useState } from "react";
import CustomModal from "../../info";
import { useNavigate } from "react-router-dom";

const ProjectInfoModal = forwardRef(
  ({ open, onClose, addProject, updateProject, deleteProject }, ref) => {
    const [project, setProject] = useState({});

    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      setProject: (newProject) => {
        setProject(newProject);
      },
    }));

    const validateInputs = (name, description) => {
      // const name = document.getElementById("name");
      // const description = document.getElementById("description");

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
      if (validateInputs(project.name, project.description)) {
        addProject(project.name, project.description);
        onClose();
      }
    };

    const handleUpdate = () => {
      if (validateInputs(project.name, project.description)) {
        updateProject(project.id, project.name, project.description);
        onClose();
      }
    };

    const handleDelete = () => {
      deleteProject(project.id);
      navigate("/");
      onClose();
    };

    const handleChange = (field, value) => {
      setProject((prev) => ({ ...prev, [field]: value }));
    };

    const fields = [
      { name: "name", label: "이름" },
      { name: "description", label: "설명" },
    ];

    const buttons = [
      {
        text: "추가하기",
        variant: "contained",
        disabled: !!project.id,
        onClick: handleInsert,
      },
      {
        text: "수정하기",
        variant: "contained",
        disabled: !project.id,
        onClick: handleUpdate,
      },
      {
        text: "삭제하기",
        variant: "contained",
        color: "warning",
        disabled: !project.id,
        onClick: handleDelete,
      },
      { text: "닫기", variant: "outlined", onClick: onClose },
    ];

    return (
      <CustomModal
        open={open}
        onClose={onClose}
        title="프로젝트 정보"
        fields={fields}
        buttons={buttons}
        values={project}
        onChange={handleChange}
      />
    );
  },
);

export default ProjectInfoModal;
