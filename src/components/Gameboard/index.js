import React, { useEffect, useState } from "react";
import styles from "./Gameboard.module.css";
import aircraftShape from "../../assets/aircraftShape.png";
import battleshipShape from "../../assets/battleshipShape.png";
import carrierShape from "../../assets/carrierShape.png";
import submarineShape from "../../assets/submarineShape.png";
import missSmall from "../../assets/missSmall.png";
import miss from "../../assets/miss.png";
import data from "../../data/response.json";
import hitSmall from "../../assets/hitSmall.png";
import hitBig from "../../assets/hitBig.png";
import { GridSquareStatus } from "../../gridSquareStatus";

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

  const shipRenderer = (shipType) => {
    switch (shipType) {
      case "destroyer":
        return (
          <img src={aircraftShape} alt="aircraft" style={{ height: "50px" }} />
        );
      case "cruiser":
        return (
          <img src={battleshipShape} alt="cruiser" style={{ height: "50px" }} />
        );
      case "carrier":
        return (
          <img src={carrierShape} alt="carrier" style={{ height: "50px" }} />
        );
      case "submarine":
        return (
          <img
            src={submarineShape}
            alt="submarine"
            style={{ height: "50px" }}
          />
        );
      case "battleship":
        return (
          <img
            src={battleshipShape}
            alt="battleship"
            style={{ height: "50px" }}
          />
        );
      default:
        break;
    }
  };

  const gridSquareRenderer = (gridSquareStatus) => {
    console.log(gridSquareStatus);
    switch (gridSquareStatus) {
      case GridSquareStatus.Hit:
        return <img src={hitBig} alt="hitBig" style={{ width: "80%" }} />;
      case GridSquareStatus.Miss:
        return <img src={miss} alt="miss" style={{ width: "80%" }} />;
      default:
        return;
    }
  };

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
            setShips(
              (prevShips) => {
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
              },
              (prevState) => console.log(prevState, "asdasd")
            );
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
      <div className={styles.left}>
        <div className={styles.playerContainer}>
          <div className={styles.playerOne}>
            Player 1<div>{playerOneScore}</div>
          </div>
          <div className={styles.playerTwo}>
            Player 2<div>0</div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {ships.map(({ type, positions, hit }) => {
            return (
              <div className={styles.shipContainer}>
                {shipRenderer(type)}
                {hit.map((isHit) =>
                  isHit ? (
                    <img
                      src={hitSmall}
                      alt="miss"
                      style={{ height: "25px", width: "25px" }}
                    />
                  ) : (
                    <img
                      src={missSmall}
                      alt="miss"
                      style={{ height: "25px", width: "25px" }}
                    />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.grid}>
        {grid.map((row, i) => (
          <div className={styles.gridRow}>
            {row.map((col, j) => (
              <div
                className={styles.gridSquare}
                onClick={() => handleClick(i, j)}
              >
                {gridSquareRenderer(grid[i][j])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
