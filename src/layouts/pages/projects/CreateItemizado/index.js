import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProjectForm from "./Form";
import SoftButton from "components/SoftButton";
import { mobileMaxWidth } from "utils";
import SoftBadge from "components/SoftBadge";
import { Icon, Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  width: "30vw",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  overflow: "visible",
  boxShadow: 24,
};

const styleMobile = {
  position: "absolute",
  width: "100%",
  height: "80vh",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "visible",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
};

export default function CreateItemizado(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderModal = () => (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      width={""}
    >
      <Box sx={window.innerWidth <= mobileMaxWidth ? styleMobile : style}>
        <ProjectForm
          onClose={handleClose}
          project={props.project}
          edit={props.edit}
        />
      </Box>
    </Modal>
  );

  return (
    <Tooltip title='Subir itemizado' placement='top'>
      <span>
        <SoftBadge
          color='dark'
          badgeContent={<Icon>upload</Icon>}
          onClick={() => handleOpen()}
        />
        {renderModal()}
      </span>
    </Tooltip>
  );
}
