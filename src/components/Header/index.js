import React from "react";
import styles from "./Header.module.css";

export default function index() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.searchBar}></div>
      <div className={styles.searchBarButton}></div>
      <div className={styles.threeBox}></div>
      <div className={styles.threeBox}></div>
      <div className={styles.threeBox}></div>
    </div>
  );
}
