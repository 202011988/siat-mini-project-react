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

    const handleInsert = () => {
      addProject(project.name, project.description);
      onClose();
    };

    const handleUpdate = () => {
      updateProject(project.id, project.name, project.description);
      onClose();
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
