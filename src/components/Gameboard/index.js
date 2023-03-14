import React from "react";
import styles from "./Gameboard.module.css";
import Grid from "../Grid";
import Score from "../Score";

export default function Gameboard() {
  return (
    <div className={styles.gameBoard}>
      <Score />
      <Grid />
    </div>
  );
}
