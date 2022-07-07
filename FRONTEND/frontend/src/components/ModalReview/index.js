import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ProductContext } from "../../Context/ProductContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  ">img": {
    height: "370px",
  },
};

export default function ModalReivew({ children }) {
  const { showModalReview, setShowReivew } = React.useContext(ProductContext);
  const handleOpen = () => setShowReivew(true);
  const handleClose = () => setShowReivew(false);

  return (
    <div>
      <Modal
        open={showModalReview}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="boxx">
          {children}
        </Box>
      </Modal>
    </div>
  );
}
