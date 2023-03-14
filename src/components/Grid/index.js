import React from "react";
import styles from "./Grid.module.css";
import GridRow from "../GridRow";
import { useSelector } from "react-redux";

export default function Grid() {
  const { grid } = styles;
  const gridData = useSelector((state) => state.grid);
  return (
    <div className={grid}>
      {gridData.map((row, rowIndex) => (
        <GridRow row={row} rowIndex={rowIndex} key={rowIndex} />
      ))}
    </div>
  );
}
