import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "./Form";
import SoftButton from "components/SoftButton";
import { getPermission } from "utils";
import { mobileMaxWidth } from "utils";
import SoftBadge from "components/SoftBadge";
import { Icon } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
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

export default function CreateClient(props) {
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
        <Form
          handleClose={handleClose}
          client={props.client}
          edit={props.edit}
        />
      </Box>
    </Modal>
  );

  return (
    <span>
      {props.edit ? (
        <SoftBadge
          color='info'
          badgeContent={<Icon>edit</Icon>}
          onClick={() => handleOpen()}
        ></SoftBadge>
      ) : (
        <SoftButton
          variant='gradient'
          color='success'
          size='small'
          onClick={handleOpen}
        >
          Crear Cliente
        </SoftButton>
      )}
      {renderModal()}
    </span>
  );
}
