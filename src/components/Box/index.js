import React from "react";
import styles from "./Box.module.css";

export default function Box({ isPrimary }) {
  const { threeBox, primaryBox, secondaryBox } = styles;
  return (
    <div
      className={`${threeBox} ${isPrimary ? primaryBox : secondaryBox}`}
    ></div>
  );
}
