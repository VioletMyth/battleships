import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const { search, searchBar, searchBarButton } = styles;
  return (
    <div className={search}>
      <div className={searchBar}></div>
      <div className={searchBarButton}></div>
    </div>
  );
}
