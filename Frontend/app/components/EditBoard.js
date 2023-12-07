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
  Typography,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { colors } from "./helpers";
import { MyContext } from "./MyContext";
import { toast } from "react-toastify";
import PropertyInput from "./PropertyInput";

export default function EditBoard({ board, handleCloseSettings }) {
  const { updateBoard } = React.useContext(MyContext);
  const [loading, setLoading] = React.useState(false);
  const [color, setColor] = React.useState(board.color ?? "#b8bcde");
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [open, setOpen] = React.useState(false);
  const [properties, setProperties] = React.useState({});

  const handleEdit = () => {
    setOpen(true);
  };

  useEffect(() => {
    let prevProperties = {};
    board.properties.forEach((property) => {
      prevProperties[property.property_id] = {
        type: property.type,
        title: property.title,
        value: property.value,
      };
    });

    setProperties(prevProperties);
  }, []);

  const theme = createTheme({
    palette: colors.palette,
  });

  const handleClose = () => {
    setOpen(false);
    handleCloseSettings();
  };
  const handleChange = (event, newColor) => {
    setColor(newColor);
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

  const editBoard = async (e) => {
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
    await fetch("http://localhost:4000/boards/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        color: color,
        user_id: localStorage.getItem("userId"),
        board_id: board.board_id,
        properties: finalProperties,
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
      <MenuItem onClick={handleEdit} disableRipple>
        <EditIcon />
        Edit board
      </MenuItem>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit board
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
        <form onSubmit={editBoard}>
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
                defaultValue={board.title}
                inputRef={titleRef}
              />
              <div className="m-3"></div>
              <TextField
                id="board-description"
                label="Board Description"
                variant="outlined"
                defaultValue={board.description}
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
                    defaultType={properties[key].type}
                    defaultTitle={properties[key].title}
                    defaultValue={properties[key].value}
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
                Save changes
              </LoadingButton>
            </FormControl>
          </DialogContent>
        </form>
      </Dialog>
    </ThemeProvider>
  );
}
