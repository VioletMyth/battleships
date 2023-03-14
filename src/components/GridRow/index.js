import React from "react";
import styles from "./GridRow.module.css";
import GridCell from "../GridCell";

export default function GridRow({ row, rowIndex }) {
  const { gridRow } = styles;
  return (
    <div className={gridRow}>
      {row.map((_, colIndex) => (
        <GridCell row={rowIndex} col={colIndex} key={colIndex} />
      ))}
    </div>
  );
}
