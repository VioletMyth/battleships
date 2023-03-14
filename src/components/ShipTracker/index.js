import React from "react";
import styles from "./ShipTracker.module.css";
import ShipCounter from "../ShipCounter";

export default function ShipTracker({ shipData }) {
  const { imageContainer } = styles;
  return (
    <div className={imageContainer}>
      {shipData.map(({ type, hit }) => {
        return <ShipCounter hitData={hit} shipType={type} />;
      })}
    </div>
  );
}
