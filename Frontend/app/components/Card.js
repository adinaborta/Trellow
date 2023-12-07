import React from "react";
import styles from "../styles/board.module.css";
import Link from "next/link";

export default function Card({
  type,
  card,
  image,
  className,
  backgroundColor,
}) {
  return (
    <Link href={`?card=${card.card_id}`}>
      <div className={`${styles.card} ${styles[className]}`}>
        <div
          className={styles.cardImage}
          style={{
            backgroundColor: backgroundColor ?? "",
            color: backgroundColor ?? "",
          }}
        >
          {card.image && (
            <img
              className="w-full h-full object-cover"
              src={card.image}
              alt="Card Image"
            />
          )}
        </div>
        <div className={styles.cardInfo}>
          {/* Card Header */}
          <h2 className={styles.cardTitle}>{card.title}</h2>

          {/* Card Content */}
          <div className={styles.cardContent}>
            <p>{card.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
