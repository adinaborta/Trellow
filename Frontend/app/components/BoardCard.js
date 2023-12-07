"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/board.module.css";

export default function BoardCard({
  cardId,
  type,
  title,
  description,
  image,
  className,
  backgroundColor,
}) {
  return (
    <div className={`${styles.card} ${styles[className]}`}>
      <div
        className={styles.cardImage}
        style={{
          backgroundColor: backgroundColor ?? "",
          color: backgroundColor ?? "",
        }}
      >
        {image && (
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="Card Image"
          />
        )}
      </div>
      <div className={styles.cardInfo}>
        {/* Card Header */}
        <h2 className={styles.cardTitle}>{title}</h2>

        {/* Card Content */}
        <div className={styles.cardContent}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
