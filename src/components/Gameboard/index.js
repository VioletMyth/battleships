import React, { useEffect, useState } from "react";
import styles from "./Gameboard.module.css";
import data from "../../data/response.json";
import { GridSquareStatus } from "../../gridSquareStatus";
import Grid from "../Grid";
import Score from "../Score";

export default function Gameboard() {
  const initialiseGrid = (size) => {
    var grid = Array.apply(null, Array(size)).map(() => {
      return new Array(size).fill(GridSquareStatus.Empty);
    });
    return grid;
  };

  const getShipInitialState = (data) => {
    var ships = [];
    Object.keys(data.shipTypes).map((ship) => {
      ships.push({
        type: ship,
        positions: data?.layout
          ?.filter((layout) => layout.ship === ship)
          .map((layout) => layout?.positions),
        hit: Array(data.shipTypes[ship].size).fill(false),
      });
    });
    return ships;
  };

  const [grid, setGrid] = useState(initialiseGrid(10));
  const [ships, setShips] = useState(getShipInitialState(data));
  const [playerOneScore, setPlayerOneScore] = useState(0);

  console.log(grid);
  console.log(ships);

  useEffect(() => {
    const score = ships.filter(({ hit }) =>
      hit.every((isHit) => isHit === true)
    ).length;
    setPlayerOneScore(score);
  }, [ships]);

  const handleClick = (row, col) => {
    for (let [i, ship] of ships.entries()) {
      for (let [j, position] of ship.positions.entries()) {
        for (let [pIndex, p] of position.entries()) {
          if (p[0] === row && p[1] === col) {
            setShips((prevShips) => {
              return prevShips.map((ship, k) => {
                if (i === k) {
                  return {
                    type: ship.type,
                    positions: ship.positions,
                    hit: ship.hit.map((hitPos, q) =>
                      q === pIndex ? true : hitPos
                    ),
                  };
                }
                return ship;
              });
            });
            grid[row][col] = GridSquareStatus.Hit;
            setGrid(grid);

            return;
          }
        }
      }
    }

    setGrid((prev) =>
      prev.map((x, i) =>
        x.map((y, k) =>
          i === row && col === k ? GridSquareStatus.Miss : grid[i][k]
        )
      )
    );
  };

  return (
    <div className={styles.gameBoard}>
      <Score playerOneScore={playerOneScore} ships={ships} />
      <Grid gridData={grid} onClickHandler={handleClick} />
    </div>
  );
}
