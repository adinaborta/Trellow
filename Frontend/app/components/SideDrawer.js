import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import Logo from "../trellow.png";
import Link from "next/link";
import CreateBoard from "./CreateBoard";
import LogoutButton from "./LogoutButton";
import Username from "./Username";

export default function SideDrawer() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Link href="/boards">
        <Image
          src={Logo}
          alt="logo"
          width="100"
          style={{ marginTop: 10, marginLeft: 10 }}
        ></Image>
      </Link>
      <List>
        <Username />
        <Link href="/boards">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Boards"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <CreateBoard />
        <LogoutButton />
      </List>
    </Drawer>
  );
}
