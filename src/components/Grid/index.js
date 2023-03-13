import React from "react";
import styles from "./Grid.module.css";
import GridRow from "../GridRow";

export default function Grid({ onClickHandler, gridData }) {
  const { grid } = styles;
  return (
    <div className={grid}>
      {gridData.map((row, i) => (
        <GridRow
          onClickHandler={onClickHandler}
          row={row}
          i={i}
          grid={gridData}
          key={i}
        />
      ))}
    </div>
  );
}
