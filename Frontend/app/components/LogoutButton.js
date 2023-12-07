"use client";

import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <ListItem
      disablePadding
      onClick={() => {
        localStorage.removeItem("userId");
        router.replace("/");
      }}
    >
      <ListItemButton>
        <ListItemText primary={"Log out"} />
      </ListItemButton>
    </ListItem>
  );
}
