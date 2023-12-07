"use client";

import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PropertyInput({
  updateProperties,
  id,
  deleteProperty,
}) {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const propertyTypes = [
    {
      label: "Text",
      value: "text",
    },
    {
      label: "Number",
      value: "number",
    },
    {
      label: "Date",
      value: "date",
    },
    {
      label: "URL",
      value: "url",
    },
    {
      label: "Email",
      value: "email",
    },
  ];

  useEffect(() => {
    if (type && title) updateProperties(id, type, title);
  }, [type, title]);

  return (
    <div
      className="mb-2"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Autocomplete
        disablePortal
        style={{ width: type ? "45%" : "100%" }}
        id="combo-box-demo"
        onChange={(e, newValue) => {
          setTitle("");
          setType(newValue ? newValue.value : "");
        }}
        options={propertyTypes}
        renderInput={(params) => (
          <TextField {...params} label="Property type" />
        )}
      />
      {type && (
        <>
          <TextField
            InputLabelProps={{ shrink: type == "date" }}
            id="outlined-basic"
            label="Property title"
            variant="outlined"
            type={type}
            value={title}
            style={{ width: "45%", marginLeft: "auto" }}
            onChange={(e, newValue) => {
              setTitle(e.target.value);
            }}
          />
        </>
      )}
      <IconButton
        style={{ width: "8%" }}
        onClick={() => {
          deleteProperty(id);
        }}
      >
        <DeleteIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
      </IconButton>
    </div>
  );
}
