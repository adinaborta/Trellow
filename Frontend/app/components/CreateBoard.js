"use client";

import React, { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { colors, id } from "./helpers";
import { useRouter } from "next/navigation";
import PropertyInput from "./PropertyInput";

export default function CreateBoard() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [color, setColor] = React.useState("#b8bcde");
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [open, setOpen] = React.useState(false);
  const [properties, setProperties] = React.useState({});

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

  const createBoard = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    let finalProperties = [];
    Object.keys(properties).forEach((key) => {
      let property = properties[key];
      if (property.type && property.title && property.value) {
        finalProperties.push(property);
      }
    });
    console.log(finalProperties);
    await fetch("http://localhost:4000/boards", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        color: color,
        user_id: localStorage.getItem("userId"),
        properties: finalProperties,
      }),
    }).then(async (res) => {
      setLoading(false);
      setOpen(false);
      const board = await res.json();
      router.push("/boards/" + board.board_id);
    });
  };

  const updateProperties = (key, type, title, value) => {
    let prevProperties = { ...properties };
    prevProperties[key].type = type;
    prevProperties[key].title = title;
    prevProperties[key].value = value;
    setProperties(prevProperties);
  };

  const deleteProperty = (key) => {
    let prevProperties = { ...properties };
    delete prevProperties[key];
    setProperties(prevProperties);
  };

  return (
    <ThemeProvider theme={theme}>
      <ListItem disablePadding onClick={handleClickOpen}>
        <ListItemButton>
          <ListItemText primary={"Create board"} />
        </ListItemButton>
      </ListItem>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create a new board
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
        <form onSubmit={createBoard}>
          <DialogContent dividers>
            <FormControl fullWidth>
              <Typography>General</Typography>
              <hr></hr>
              <div className="m-2"></div>
              <TextField
                id="board-title"
                label="Board Title"
                variant="outlined"
                required
                inputRef={titleRef}
              />
              <div className="m-3"></div>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                inputRef={descriptionRef}
              />
              <div className="m-3"></div>
              <Typography>Properties</Typography>
              <hr></hr>
              <div className="m-2"></div>
              {Object.keys(properties).map((key) => {
                return (
                  <PropertyInput
                    key={key}
                    id={key}
                    updateProperties={updateProperties}
                    deleteProperty={deleteProperty}
                  />
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "fit-content",
                }}
                onClick={() => {
                  let key = Object.keys(properties).length
                    ? Math.max(
                        ...Object.keys(properties).map((key) => parseInt(key))
                      ) + 1
                    : 1;
                  let prevProperties = { ...properties };
                  prevProperties[key] = { type: "", title: "", value: "" };
                  setProperties(prevProperties);
                }}
              >
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>
                  Add a property
                </Typography>
              </div>
              <div className="m-3"></div>
              <Typography>Styles</Typography>
              <hr></hr>
              <div className="m-2"></div>
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
              <div className="m-3"></div>
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
