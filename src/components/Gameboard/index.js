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
  console.log(grid);
  console.log(ships);

  const shipRenderer = (shipType) => {
    switch (shipType) {
      case "destroyer":
        return <img src={aircraftShape} alt="aircraft" />;
      case "cruiser":
        return <img src={battleshipShape} alt="cruiser" />;
      case "carrier":
        return <img src={carrierShape} alt="carrier" />;
      case "submarine":
        return <img src={submarineShape} alt="submarine" />;
      case "battleship":
        return <img src={battleshipShape} alt="battleship" />;
      default:
        break;
    }
  };

  const gridSquareRenderer = (gridSquareStatus) => {
    console.log(gridSquareStatus);
    switch (gridSquareStatus) {
      case gridSquareStatus.Hit:
        console.log("we got in here");
        return <img src={hitBig} alt="hitBig" />;
      case gridSquareStatus.Miss:
        return <img src={miss} alt="miss" />;
      default:
        return <></>;
    }
  };

  const handleClick = (row, col) => {
    // ships.forEach((ship, i) => {
    //   ship.positions.forEach((position, j) => {
    //     position.forEach((p, pIndex) => {
    //       if (p[0] === row && p[1] === col) {
    //         setShips((prevShips) => {
    //           return prevShips.map((ship, k) => {
    //             if (i === k) {
    //               return {
    //                 type: ship.type,
    //                 positions: ship.positions,
    //                 hit: ship.hit.map((hitPos, q) =>
    //                   q === pIndex ? true : hitPos
    //                 ),
    //               };
    //             }
    //             return ship;
    //           });
    //         });
    //         //TODO: this needs to be properly set
    //         grid[row][col] = GridSquareStatus.Hit;
    //         setGrid(grid);
    //       } else {
    //         grid[row][col] = GridSquareStatus.Miss;
    //         setGrid(grid);
    //       }
    //       return;
    //     });
    //   });
    // });

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
            //TODO: this needs to be properly set
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
            Player 1<div>0</div>
          </div>
          <div className={styles.playerTwo}>
            Player 2<div>0</div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {Object.keys(data.shipTypes).map((shipType) => {
            return (
              <div className={styles.shipContainer}>
                {shipRenderer(shipType)}
                {[...Array(data?.shipTypes[shipType]?.size)].map(() => {
                  return <img src={missSmall} alt="miss" />;
                })}
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
                {grid[i][j] === GridSquareStatus.Hit && <div>hit</div>}
                {grid[i][j] === GridSquareStatus.Miss && <div>miss</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
