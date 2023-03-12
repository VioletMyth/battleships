import React from "react";
import styles from "./Header.module.css";

export default function index() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.search}>
        <div className={styles.searchBar}></div>
        <div className={styles.searchBarButton}></div>
      </div>
      <div className={styles.threeBoxContainer}>
        <div className={`${styles.threeBox} ${styles.boxOne}`}></div>
        <div className={`${styles.threeBox} ${styles.boxTwo}`}></div>
        <div className={`${styles.threeBox} ${styles.boxThree}`}></div>
      </div>
    </div>
  );
}
