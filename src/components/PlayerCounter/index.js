import React from "react";
import styles from "./PlayerCounter.module.css";

export default function PlayerCounter({ playerOneScore }) {
  const { playerContainer, playerOne, playerTwo, score, playerTag } = styles;
  return (
    <div className={playerContainer}>
      <div className={playerOne}>
        <div className={score}>{playerOneScore}</div>
        <div className={playerTag}>player 1</div>
      </div>
      <div className={playerTwo}>
        <div className={score}>00</div>
        <div className={playerTag}>player 2</div>
      </div>
    </div>
  );
}
