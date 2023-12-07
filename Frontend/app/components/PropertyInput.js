"use client";

import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PropertyInput({
  updateProperties,
  id,
  deleteProperty,
  defaultType = "",
  defaultTitle = "",
  defaultValue = "",
}) {
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
  const [type, setType] = useState(defaultType);
  const [title, setTitle] = useState(defaultTitle);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (type && title && value) updateProperties(id, type, title, value);
  }, [type, title, value]);

  return (
    <div
      className="mb-3"
      style={{
        display: "grid",
        gap: "5px",
        gridTemplateColumns: `repeat(${type ? "3" : "1"}, 1fr) 8%`,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Property type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Property type"
          onChange={(e) => {
            setTitle("");
            setValue("");
            setType(e.target.value);
          }}
        >
          {propertyTypes.map(({ label, value }) => {
            return <MenuItem value={value}>{label}</MenuItem>;
          })}
        </Select>
      </FormControl>
      {type && (
        <>
          <TextField
            id="outlined-basic"
            label="Property title"
            variant="outlined"
            type={"text"}
            value={title}
            onChange={(e, newValue) => {
              setTitle(e.target.value);
            }}
          />
        </>
      )}
      {type && (
        <>
          <TextField
            InputLabelProps={{ shrink: true }}
            id="outlined-basic"
            label="Value"
            variant="outlined"
            type={type}
            value={value}
            onChange={(e, newValue) => {
              setValue(e.target.value);
            }}
          />
        </>
      )}
      <IconButton
        onClick={() => {
          deleteProperty(id);
        }}
      >
        <DeleteIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
      </IconButton>
    </div>
  );
}
