import React from "react";
import styles from "./style.module.css";

const TextImage = ({ children, source, alt }) => {
  return (
    <div className={styles.mainImageContainer}>
      <img className={styles.imageContainer} alt={alt} src={source} />
      <div className={styles.textImage}>{children}</div>
    </div>
  );
};

export default TextImage;
