"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/board.module.css";
import List from "../../components/List";
import { Box, Typography } from "@mui/material";
import CreateList from "../../components/CreateList";
import CardExpanded from "@/app/components/CardExpanded";
import BoardSettings from "@/app/components/BoardSettings";
import { useParams } from "next/navigation";
import { MyContext } from "@/app/components/MyContext";
import PropertyInline from "@/app/components/PropertyInline";

// export async function generateStaticParams() {
//   const res = await fetch(`http://localhost:4000/boards/${userId}`);
//   const boards = await res.json();

//   return boards.map((board) => ({
//     board_id: board.board_id.toString(),
//   }));
// }

export default function page() {
  async function getBoard(board_id) {
    const res = await fetch(
      `http://localhost:4000/boards/lists/${localStorage.getItem(
        "userId"
      )}/${board_id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const board = await res.json();
    const cards = {};
    board.lists.map((list) => {
      list.cards.map((card) => {
        cards[card.card_id] = card;
      });
    });
    console.log(board.properties);
    setBoard(board);
    setCards(cards);
    // return { board, cards };
  }
  const params = useParams();
  const [board, setBoard] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getBoard(params.board_id);
  }, []);

  const updateBoard = () => {
    getBoard(params.board_id);
  };

  return (
    <MyContext.Provider value={{ updateBoard }}>
      <div className="pt-10 pl-10 pb-10 h-full relative">
        <CardExpanded cards={cards} />
        <Box>
          <div
            className="mb-4"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                textTransform: "capitalize",
                fontWeight: "bolder",
                margin: 0,
                marginRight: "1rem",
              }}
            >
              {board.title}
            </Typography>
            <BoardSettings board={board} />
          </div>

          <Typography gutterBottom>{board.description}</Typography>
        </Box>
        {board.properties &&
          board.properties.map(({ type, title, value }) => {
            return <PropertyInline type={type} title={title} value={value} />;
          })}
        <main className={styles.board}>
          {board.lists &&
            board.lists.map((list) => {
              return (
                <List key={list.list_id} boardId={board.board_id} list={list} />
              );
            })}
          <CreateList boardTitle={board.title} boardId={board.board_id} />
        </main>
      </div>
    </MyContext.Provider>
  );
}
