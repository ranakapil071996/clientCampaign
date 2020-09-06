import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 400,
      }}
    >
      <CircularProgress color="primary" size={20} />
    </div>
  );
}
