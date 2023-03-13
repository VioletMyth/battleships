import React from "react";
import styles from "./GridRow.module.css";
import GridCell from "../GridCell";

export default function GridRow({ onClickHandler, row, i, grid }) {
  const { gridRow } = styles;
  return (
    <div className={gridRow}>
      {row.map((col, j) => (
        <GridCell
          onClickHandler={onClickHandler}
          row={i}
          col={j}
          grid={grid}
          key={j}
        />
      ))}
    </div>
  );
}
