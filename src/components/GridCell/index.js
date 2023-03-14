import React from "react";
import styles from "./GridCell.module.css";
import { GridSquareStatus } from "../../gridSquareStatus";
import hitBig from "../../assets/hitBig.png";
import miss from "../../assets/miss.png";
import { useSelector, useDispatch } from "react-redux";
import { updateGrid } from "../../redux/gridSlice";
import { updateShipsHit } from "../../redux/shipsSlice";

export default function GridCell({ row, col }) {
  const { gridSquare, hit, emptySquare } = styles;
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
        return <div className={emptySquare}></div>;
    }
  };

  const handleClick = (row, col) => {
    for (let [shipIndex, ship] of ships.entries()) {
      for (let position of ship.positions) {
        for (let [positionIndex, coordinates] of position.entries()) {
          if (coordinates[0] === row && coordinates[1] === col) {
            dispatch(updateShipsHit({ shipIndex, positionIndex }));
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
