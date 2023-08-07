import * as React from "react";
import { useState } from "react";

import styles from "./Footer.module.scss";

const ReactFooter = () => {
  return (
    <div
      style={{
        backgroundColor: "red",
        height: 40,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div style={{ color: "white" }}>1</div>
      <div style={{ color: "white" }}>2</div>
      <div style={{ color: "white" }}>3</div>
    </div>
  );
};
export default ReactFooter;
