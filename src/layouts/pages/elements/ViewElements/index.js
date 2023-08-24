import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "./Form";
import SoftButton from "components/SoftButton";
import { mobileMaxWidth } from "utils";
import SoftBadge from "components/SoftBadge";
import { Icon, Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  width: "40vw",
  maxHeight: "70vh",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  overflow: "scroll",
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

export default function CreateProject(props) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 6,
            paddingRight: 6,
          }}
        >
          <Icon onClick={handleClose} style={{ cursor: "pointer" }}>
            close
          </Icon>
        </div>
        <Form onClose={handleClose} element={props.element} edit={props.edit} />
      </Box>
    </Modal>
  );

  return (
    <span>
      <Tooltip title='Ver elemento' placement='top'>
        <SoftBadge
          color='dark'
          badgeContent={<Icon>visibility_icon</Icon>}
          onClick={() => handleOpen()}
        ></SoftBadge>
      </Tooltip>
      {renderModal()}
    </span>
  );
}
