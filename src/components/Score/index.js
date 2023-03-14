import React, { useEffect } from "react";
import styles from "./Score.module.css";
import PlayerCounter from "../PlayerCounter";
import ShipTracker from "../ShipTracker";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayerScore } from "../../redux/playerScoreSlice";

export default function Score() {
  const { left } = styles;
  const ships = useSelector((state) => state.ships);
  const playerOneScore = useSelector((state) => state.playerScore);
  const dispatch = useDispatch();

  useEffect(() => {
    const score = ships.filter(({ hit }) =>
      hit.every((isHit) => isHit === true)
    ).length;
    dispatch(updatePlayerScore(score));
  }, [ships, dispatch]);

  const padPlayerScore = (num, places) => String(num).padStart(places, "0");

  return (
    <div className={left}>
      <PlayerCounter playerOneScore={padPlayerScore(playerOneScore, 2)} />
      <ShipTracker shipData={ships} />
    </div>
  );
}
