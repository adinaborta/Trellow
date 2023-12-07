import React from "react";
import styles from "../styles/board.module.css";
import Card from "./Card";
import CreateCard from "./CreateCard";
import ListSettings from "./ListSettings";

export default function List({ boardId, list }) {
  return (
    <div className={styles.list} style={{ background: list.color }}>
      <div
        className="mb-4 flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.listHeader}>{list.title}</div>
        <ListSettings list={list} boardId={boardId} />
      </div>

      {list.cards.map((card, i) => {
        return <Card boardId={boardId} type="item-card" key={i} card={card} />;
      })}
      <CreateCard listId={list.list_id} listTitle={list.title} />
    </div>
  );
}
