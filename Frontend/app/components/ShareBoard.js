"use client";

import React, { useEffect, useRef } from "react";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton,
  FormControl,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  ThemeProvider,
  createTheme,
  MenuItem,
} from "@mui/material";
import { colors } from "./helpers";
import { MyContext } from "./MyContext";
import { toast } from "react-toastify";

export default function ShareBoard({ board, handleCloseSettings }) {
  const { updateBoard } = React.useContext(MyContext);
  const [loading, setLoading] = React.useState(false);
  const emailRef = useRef();
  const [open, setOpen] = React.useState(false);

  const handleShare = () => {
    setOpen(true);
  };

  const theme = createTheme({
    palette: colors.palette,
  });

  const handleClose = () => {
    setOpen(false);
    handleCloseSettings();
  };

  const shareBoard = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    await fetch("http://localhost:4000/boards/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        user_id: localStorage.getItem("userId"),
        board_id: board.board_id,
      }),
    }).then(async (res) => {
      setLoading(false);
      setOpen(false);
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

  return (
    <ThemeProvider theme={theme}>
      <MenuItem onClick={handleShare} disableRipple>
        <ShareIcon />
        Share board
      </MenuItem>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Share this board. Insert the email you want to invite.
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={shareBoard}>
          <DialogContent dividers>
            <FormControl fullWidth>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                required
                inputRef={emailRef}
              />
              <div className="m-4"></div>
              <LoadingButton type="submit" loading={loading} variant="outlined">
                Share
              </LoadingButton>
            </FormControl>
          </DialogContent>
        </form>
      </Dialog>
    </ThemeProvider>
  );
}
