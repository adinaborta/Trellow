"use client";

import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledButton from "./StyledButton";
import { MyContext } from "./MyContext";
import { toast } from "react-toastify";

export default function DeleteList({ handleCloseSettings, list, boardId }) {
  const { updateBoard } = React.useContext(MyContext);
  const handleDeleteSettings = async () => {
    await fetch("http://localhost:4000/boards/list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list_id: list.list_id,
        user_id: localStorage.getItem("userId"),
      }),
    }).then(async (res) => {
      handleClose();
      handleCloseSettings();
      let result = await res.json();
      let type = res.ok ? "info" : "error";
      if (result.message) {
        toast(result.message, {
          theme: "light",
          type: type,
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
      updateBoard();
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen} disableRipple>
        <DeleteIcon />
        Delete list
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this list?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can not undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose} styles={{ width: "fit-content" }}>
            Go back
          </StyledButton>
          <StyledButton
            onClick={handleDeleteSettings}
            styles={{ width: "fit-content" }}
            color="error"
          >
            DELETE
          </StyledButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
