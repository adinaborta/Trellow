"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import StyledButton from "./StyledButton";
import { MoreHorizOutlined } from "@mui/icons-material";
import EditBoard from "./EditBoard";
import ShareBoard from "./ShareBoard";
import DeleteBoard from "./DeleteBoard";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function BoardSettings({ board }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSettings = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledButton
        variant={"text"}
        onClick={handleClick}
        styles={{ width: "fit-content", minWidth: "auto" }}
      >
        <MoreHorizOutlined />
      </StyledButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={openSettings}
        onClose={handleCloseSettings}
      >
        <EditBoard handleCloseSettings={handleCloseSettings} board={board} />
        <ShareBoard handleCloseSettings={handleCloseSettings} board={board} />

        <Divider sx={{ my: 0.5 }} />
        <DeleteBoard handleCloseSettings={handleCloseSettings} board={board} />
      </StyledMenu>
    </>
  );
}
