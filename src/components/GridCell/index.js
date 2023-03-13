import React from "react";
import styles from "./GridCell.module.css";
import { GridSquareStatus } from "../../gridSquareStatus";
import hitBig from "../../assets/hitBig.png";
import miss from "../../assets/miss.png";

export default function GridCell({ onClickHandler, row, col, grid }) {
  const { gridSquare, hit } = styles;

  const gridSquareRenderer = (gridSquareStatus) => {
    console.log(gridSquareStatus);
    switch (gridSquareStatus) {
      case GridSquareStatus.Hit:
        return <img src={hitBig} alt="hitBig" className={hit} />;
      case GridSquareStatus.Miss:
        return <img src={miss} alt="miss" className={hit} />;
      default:
        return;
    }
  };

  return (
    <div className={gridSquare} onClick={() => onClickHandler(row, col)}>
      {gridSquareRenderer(grid[row][col])}
    </div>
  );
}
