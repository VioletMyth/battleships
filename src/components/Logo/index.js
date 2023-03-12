import React from "react";
import styles from "./Logo.module.css";

export default function Logo() {
  const { logo } = styles;
  return <div className={logo}></div>;
}
