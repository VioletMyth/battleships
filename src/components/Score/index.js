import React from "react";
import styles from "./Score.module.css";
import PlayerCounter from "../PlayerCounter";
import ShipTracker from "../ShipTracker";

export default function Score({ playerOneScore, ships }) {
  const { left } = styles;
  return (
    <div className={left}>
      <PlayerCounter playerOneScore={playerOneScore} />
      <ShipTracker shipData={ships} />
    </div>
  );
}
