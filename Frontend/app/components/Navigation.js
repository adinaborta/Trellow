"use client";

import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import StyledButton from "./StyledButton";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.replace("/");
    }
  }, []);
  return (
    <div
      className="px-4 py-2 flex"
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        height: "3rem",
      }}
    >
      <Typography>Trellow</Typography>
      {/* <div>
        <StyledButton>Share</StyledButton>
      </div> */}
    </div>
  );
}
