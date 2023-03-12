import React, { useEffect, useState } from "react";
import styles from "./Gameboard.module.css";
import carrierShape from "../../assets/carrierShape.png";
import battleshipShape from "../../assets/battleshipShape.png";
import cruiserShape from "../../assets/cruiserShape.png";
import destroyerShape from "../../assets/destroyerShape.png";

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
          <img
            className={styles.shipImage}
            src={destroyerShape}
            alt="destroyer"
          />
        );
      case "cruiser":
        return (
          <img className={styles.shipImage} src={cruiserShape} alt="cruiser" />
        );
      case "carrier":
        return (
          <img className={styles.shipImage} src={carrierShape} alt="carrier" />
        );
      case "submarine":
        return (
          <img
            className={styles.shipImage}
            src={submarineShape}
            alt="submarine"
          />
        );
      case "battleship":
        return (
          <img
            className={styles.shipImage}
            src={battleshipShape}
            alt="battleship"
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
        return <img src={hitBig} alt="hitBig" className={styles.hit} />;
      case GridSquareStatus.Miss:
        return <img src={miss} alt="miss" className={styles.hit} />;
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
    <div className={styles.container}>
      <div className={styles.gameBoard}>
        <div className={styles.left}>
          <div className={styles.playerContainer}>
            <div className={styles.playerOne}>
              <div className={styles.score}>{playerOneScore}</div>
              <div className={styles.playerTag}>player 1</div>
            </div>
            <div className={styles.playerTwo}>
              <div className={styles.score}>00</div>
              <div className={styles.playerTag}>player 2</div>
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
                        className={styles.hitIndicator}
                        src={hitSmall}
                        alt="miss"
                      />
                    ) : (
                      <img
                        className={styles.hitIndicator}
                        src={missSmall}
                        alt="miss"
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
    </div>
  );
}
