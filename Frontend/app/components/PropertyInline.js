import React from "react";
import NumbersIcon from "@mui/icons-material/Numbers";
import ShortTextIcon from "@mui/icons-material/ShortText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkIcon from "@mui/icons-material/Link";
import { Box, Typography } from "@mui/material";

export default function PropertyInline({ title, type, value }) {
  return (
    <Box
      sx={{ color: (theme) => theme.palette.grey[500] }}
      style={{ display: "flex", alignItems: "center" }}
    >
      {type == "text" && <ShortTextIcon />}
      {type == "number" && <NumbersIcon />}
      {type == "date" && <CalendarMonthIcon />}
      {type == "url" && <LinkIcon />}
      {type == "email" && <MailOutlineIcon />}
      <Typography
        style={{ marginLeft: "0.5rem", width: "150px" }}
        variant="subtitle2"
      >
        {title}
      </Typography>
      <Typography style={{ marginLeft: "0.5rem" }} variant="subtitle2">
        {value}
      </Typography>
    </Box>
  );
}
