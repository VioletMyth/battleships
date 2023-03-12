import React from "react";
import Box from "../Box";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <SearchBar />
      <div className={styles.threeBoxContainer}>
        <Box isPrimary />
        <Box />
        <Box />
      </div>
    </div>
  );
}
