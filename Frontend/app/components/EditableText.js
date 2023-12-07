import { Input, TextField } from "@mui/material";
import React from "react";
import styles from "../styles/board.module.css";

export default function EditableText({
  id,
  defaultValue,
  className,
  inputRef,
  handleChange,
  multiline,
  placeholder,
}) {
  return (
    <Input
      inputRef={inputRef}
      id={id}
      autoComplete="false"
      autoCorrect="false"
      defaultValue={defaultValue}
      className={`${styles["editable-text"]} ${styles[className]}`}
      onChange={handleChange}
      multiline={multiline}
      placeholder={placeholder ?? "Write something..."}
    />
  );
}
