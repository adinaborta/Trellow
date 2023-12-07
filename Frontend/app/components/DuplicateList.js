"use client";

import { MenuItem } from "@mui/material";
import React from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { MyContext } from "./MyContext";
import { toast } from "react-toastify";

export default function DuplicateList({ handleCloseSettings, list, boardId }) {
  const { updateBoard } = React.useContext(MyContext);
  const handleDuplicateSettings = async () => {
    await fetch("http://localhost:4000/boards/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: list.title,
        color: list.color,
        user_id: localStorage.getItem("userId"),
        board_id: boardId,
      }),
    }).then(async (res) => {
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
    <MenuItem onClick={handleDuplicateSettings} disableRipple>
      <FileCopyIcon />
      Duplicate list
    </MenuItem>
  );
}
