import React, { Suspense } from "react";
import BoardCard from "./BoardCard";
import Link from "next/link";

export default function BoardsGallery({ boards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {boards.map(({ board_id, title, image, color }) => {
        return (
          <Link href={`boards/${board_id}`} key={board_id}>
            <BoardCard
              title={title}
              image={image}
              className="galleryCard"
              backgroundColor={color}
            ></BoardCard>
          </Link>
        );
      })}
    </div>
  );
}
