"use client";

import React, { useRef } from "react";
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
  Button,
} from "@mui/material";
import { colors } from "./helpers";
import StyledButton from "./StyledButton";
import { MyContext } from "./MyContext";
import { toast } from "react-toastify";

export default function CreateList({ boardTitle, boardId }) {
  const { updateBoard } = React.useContext(MyContext);

  const [loading, setLoading] = React.useState(false);
  const [color, setColor] = React.useState("#b8bcde");
  const titleRef = useRef();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const theme = createTheme({
    palette: colors.palette,
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newColor) => {
    setColor(newColor);
  };

  const createList = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = titleRef.current.value;
    await fetch("http://localhost:4000/boards/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        board_id: boardId,
        color: color,
        user_id: localStorage.getItem("userId"),
      }),
    }).then(async (res) => {
      setLoading(false);
      setOpen(false);
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
      <div style={{ minWidth: "16rem" }}>
        <StyledButton
          onClick={handleClickOpen}
          styles={{
            border: "1px dashed",
            backgroundColor: "#ffffff91",
            color: "#00000099",
          }}
        >
          Add a new list
        </StyledButton>
      </div>
      {/* <div
        className={`${styles.list} cursor-pointer`}
        onClick={handleClickOpen}
      >
        <div className={styles.listHeader} style={{ marginBottom: 0 }}>
          Add a new list
        </div>
      </div> */}
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create a new list in board "{boardTitle}"
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
        <form onSubmit={createList}>
          <DialogContent dividers>
            <FormControl fullWidth>
              <TextField
                id="board-title"
                label="List Title"
                variant="outlined"
                required
                inputRef={titleRef}
              />
              <div className="m-4"></div>
              <ToggleButtonGroup
                value={color}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                {Object.keys(colors.boardColors).map((key) => {
                  let hex = colors.boardColors[key];
                  return (
                    <ToggleButton
                      key={hex}
                      value={hex}
                      style={{
                        backgroundColor: color == hex ? hex : "",
                      }}
                    >
                      <div
                        className={`transition-all
                ${color != hex ? "p-2 mr-2 rounded-sm" : ""}
              `}
                        style={{ backgroundColor: hex }}
                      ></div>
                      <div
                        className={`transition-all text-xs ${
                          color == hex ? "px-3" : ""
                        }`}
                        style={{
                          backgroundColor: color == hex ? hex : "",
                          color: color == hex ? "white" : "",
                        }}
                      >
                        {key}
                      </div>
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
              <div className="m-4"></div>
              <LoadingButton type="submit" loading={loading} variant="outlined">
                <span>Submit</span>
              </LoadingButton>
            </FormControl>
          </DialogContent>
        </form>
      </Dialog>
    </ThemeProvider>
  );
}
