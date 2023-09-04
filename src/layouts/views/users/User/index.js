import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "./Form";
import SoftButton from "components/SoftButton";
import { mobileMaxWidth } from "utils";
import SoftBadge from "components/SoftBadge";
import { Icon, Tooltip } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const style = {
  position: "absolute",
  width: "50%",
  top: "20%",
  left: "50%",
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

export default function User(props) {
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
        <Form handleClose={handleClose} user={props.user} />
      </Box>
    </Modal>
  );

  return (
    <span>
      <Tooltip title='Asignar clientes y formatos' placement='top'>
        <SoftBadge
          color='info'
          badgeContent={<AssignmentIndIcon />}
          onClick={handleOpen}
        ></SoftBadge>
      </Tooltip>
      {renderModal()}
    </span>
  );
}
