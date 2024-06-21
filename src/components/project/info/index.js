import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { forwardRef, useImperativeHandle, useState } from "react";
import TextField from "@mui/material/TextField";
import { ButtonGroup } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProjectInfoModal = forwardRef(
  ({ open, onClose, addProject, updateProject, deleteProject }, ref) => {
    // const [projectName, setProjectName] = useState("");
    // const [projectDescription, setProjectDescription] = useState("");
    const [project, setProject] = useState({});

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
      onClose();
    };

    console.log(project);

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container flexDirection="column" spacing={3}>
            <Grid>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                프로젝트 정보
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="이름"
                variant="outlined"
                value={project.name || ""}
                onChange={(e) =>
                  setProject((v) => {
                    return {
                      ...v,
                      name: e.target.value,
                    };
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="설명"
                variant="outlined"
                value={project.description || ""}
                onChange={(e) =>
                  setProject((v) => {
                    return {
                      ...v,
                      description: e.target.value,
                    };
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item>
              <ButtonGroup fullWidth>
                <Button
                  variant="contained"
                  disabled={project.id}
                  onClick={handleInsert}
                >
                  추가하기
                </Button>
                <Button
                  variant="contained"
                  disabled={!project.id}
                  onClick={handleUpdate}
                >
                  수정하기
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  disabled={!project.id}
                  onClick={handleDelete}
                >
                  삭제하기
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  닫기
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  },
);

export default ProjectInfoModal;
