import React from "react";
import styles from "./TemplateWrapper.module.scss";

export default function TemplateWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
