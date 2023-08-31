import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReportForm from "./Form";
import SoftButton from "components/SoftButton";
import { mobileMaxWidth } from "utils";
import SoftBadge from "components/SoftBadge";
import { Icon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
        {/* Agrega el botón de cierre (X) */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 6,
            paddingRight: 6,
          }}
        >
          <Icon
            component={CloseIcon}
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        <ReportForm
          onClose={handleClose}
          report={props.report}
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
          Crear Proyecto
        </SoftButton>
      )}
      {renderModal()}
    </span>
  );
}
