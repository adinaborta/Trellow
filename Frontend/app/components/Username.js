"use client";

import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Username() {
  const [username, setUsername] = useState("");
  const getUsername = async () => {
    await fetch(
      `http://localhost:4000/users/${localStorage.getItem("userId")}`,
      {
        next: {
          revalidate: 60,
        },
      }
    ).then(async (res) => {
      let result = await res.json();
      setUsername(`Hi, ${result.name}`);
    });
  };

  useEffect(() => {
    getUsername();
  }, []);
  return (
    <ListItem disablePadding>
      <ListItemText className="pl-2" primary={`${username}`} />
    </ListItem>
  );
}
