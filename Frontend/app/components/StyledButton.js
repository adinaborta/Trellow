"use client";

import { Button, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { colors } from "./helpers";

export default function StyledButton({
  onClick,
  color,
  title,
  styles,
  children,
  variant,
  className,
  themeProp,
  size,
}) {
  const theme =
    themeProp ??
    createTheme({
      palette: colors.palette,
    });

  return (
    <ThemeProvider theme={theme}>
      <Button
        type="submit"
        variant={variant ?? "outlined"}
        onClick={onClick}
        color={color}
        className={className}
        size={size ?? "small"}
        style={{ width: "100%", height: "fit-content", ...styles }}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}
