import React from "react";
import styles from "./Grid.module.css";
import GridRow from "../GridRow";
import { useSelector } from "react-redux";

export default function Grid() {
  const { grid } = styles;
  const gridData = useSelector((state) => state.grid);
  console.log(gridData);
  return (
    <div className={grid}>
      {gridData.map((row, i) => (
        <GridRow row={row} i={i} grid={gridData} key={i} />
      ))}
    </div>
  );
}
