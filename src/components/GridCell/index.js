import React, { useEffect } from "react";
import styles from "./GridCell.module.css";
import { GridSquareStatus } from "../../gridSquareStatus";
import hitBig from "../../assets/hitBig.png";
import miss from "../../assets/miss.png";
import { useSelector, useDispatch } from "react-redux";
import { updateGrid } from "../../redux/gridSlice";
import { updateShipsHit } from "../../redux/shipsSlice";

export default function GridCell({ row, col }) {
  const { gridSquare, hit } = styles;
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid);
  const ships = useSelector((state) => state.ships);

  const gridSquareRenderer = (gridSquareStatus) => {
    switch (gridSquareStatus) {
      case GridSquareStatus.Hit:
        return <img src={hitBig} alt="hitBig" className={hit} />;
      case GridSquareStatus.Miss:
        return <img src={miss} alt="miss" className={hit} />;
      default:
        return;
    }
  };

  const handleClick = (row, col) => {
    for (let [i, ship] of ships.entries()) {
      for (let [j, position] of ship.positions.entries()) {
        for (let [pIndex, p] of position.entries()) {
          if (p[0] === row && p[1] === col) {
            dispatch(updateShipsHit({ i, pIndex }));
            dispatch(updateGrid({ row, col, value: GridSquareStatus.Hit }));
            return;
          }
        }
      }
    }
    dispatch(updateGrid({ row, col, value: GridSquareStatus.Miss }));
  };

  return (
    <div className={gridSquare} onClick={() => handleClick(row, col)}>
      {gridSquareRenderer(grid[row][col])}
    </div>
  );
}
