import React, { useEffect, useState } from "react";
import styles from "./Gameboard.module.css";
import data from "../../data/response.json";
import { GridSquareStatus } from "../../gridSquareStatus";
import Grid from "../Grid";
import Score from "../Score";

export default function Gameboard() {
  // const [ships, setShips] = useState(getShipInitialState(data));
  const [playerOneScore, setPlayerOneScore] = useState(0);

  // console.log(ships);

  // useEffect(() => {
  //   const score = ships.filter(({ hit }) =>
  //     hit.every((isHit) => isHit === true)
  //   ).length;
  //   setPlayerOneScore(score);
  // }, [ships]);

  return (
    <div className={styles.gameBoard}>
      <Score playerOneScore={playerOneScore} />
      <Grid />
    </div>
  );
}
