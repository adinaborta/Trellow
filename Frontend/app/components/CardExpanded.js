"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DialogContent,
  Dialog,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { colors } from "./helpers";
import { useSearchParams, useRouter } from "next/navigation";
import EditableText from "./EditableText";
import StyledButton from "./StyledButton";
import CardSettings from "./CardSettings";
import styles from "../styles/board.module.css";
import { MyContext } from "./MyContext";
import { toast } from "react-toastify";

export default function CardExpanded({ cards }) {
  const { updateBoard } = useContext(MyContext);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState({});
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [saveButtonVisibility, setSaveButtonVisibility] = useState(false);
  const handleClose = () => {
    router.back();
  };

  const theme = createTheme({
    palette: colors.palette,
  });

  useEffect(() => {
    if (titleRef.current) handleChange();
  }, [card]);

  useEffect(() => {
    let cardId = searchParams.get("card");
    if (cardId) {
      setOpen(true);
      setCard(cards[cardId]);
    } else {
      setOpen(false);
      setSaveButtonVisibility(false);
    }
  }, [searchParams, cards]);

  const handleChange = () => {
    let newTitle = titleRef.current.value;
    let newDescription = descriptionRef.current.value;
    if (newTitle != card.title || newDescription != card.description) {
      setSaveButtonVisibility(true);
    } else {
      setSaveButtonVisibility(false);
    }
  };

  const updateCard = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    await fetch("http://localhost:4000/boards/card/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        user_id: localStorage.getItem("userId"),
        card_id: card.card_id,
      }),
    }).then(async (res) => {
      let result = await res.json();
      let type = res.ok ? "info" : "error";
      if (result.message) {
        toast(result.message, {
          theme: "light",
          type: type,
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
      updateBoard();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {card && (
        <Dialog
          scroll={"paper"}
          maxWidth={"md"}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div
            className={styles.cardExtendedImage}
            style={{ color: card ? card.color : "" }}
          >
            <img
              src={card.image ?? "https://source.unsplash.com/featured/300x220"}
            ></img>
          </div>
          <CardSettings card={card} />
          <DialogContent dividers style={{ padding: "4rem" }}>
            <EditableText
              id={"title"}
              defaultValue={card.title}
              className="editable-text-title"
              inputRef={titleRef}
              handleChange={handleChange}
              placeholder={"Write a title..."}
            />
            <EditableText
              id={"description"}
              defaultValue={card.description}
              inputRef={descriptionRef}
              multiline={true}
              handleChange={handleChange}
            />
            <StyledButton
              styles={{
                marginTop: "2rem",
                display: saveButtonVisibility ? "block" : "none",
              }}
              onClick={updateCard}
            >
              Save changes
            </StyledButton>
          </DialogContent>
        </Dialog>
      )}
    </ThemeProvider>
  );
}
