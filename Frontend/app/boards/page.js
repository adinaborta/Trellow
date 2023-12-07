"use client";

import React, { Suspense, useEffect, useState } from "react";
import styles from "../styles/board.module.css";
import BoardsGallery from "../components/BoardsGallery";
import Image from "next/image";
import NothingFound from "../images/nothinghere.png";
import { Box, Typography } from "@mui/material";

export default function page() {
  const [boards, setBoards] = useState([]);
  async function getBoards() {
    const res = await fetch(
      `http://localhost:4000/boards/${localStorage.getItem("userId")}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const boards = await res.json();

    setBoards(boards);
    // return boards;
  }
  useEffect(() => {
    getBoards();
  }, []);
  return (
    <main className={styles.boardsGallery}>
      {boards.length ? (
        <BoardsGallery boards={boards} />
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            className="m-5"
            alt="nothing here"
            width={500}
            src={NothingFound}
          ></Image>
          <Typography variant="h3" style={{ margin: "3rem 0 1rem 0" }}>
            You have no boards yet.
          </Typography>
          <Typography variant="body2">
            You will see your boards here. You can create your boards from the
            menu on the left.
          </Typography>
        </Box>
      )}
    </main>
  );
}
