import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className={styles.background}>
      <div id={styles.clouds}>
        <div className={`${styles.cloud} ${styles.x1}`}></div>
        <div className={`${styles.cloud} ${styles.x1_5}`}></div>
        <div className={`${styles.cloud} ${styles.x2}`}></div>
        <div className={`${styles.cloud} ${styles.x3}`}></div>
        <div className={`${styles.cloud} ${styles.x4}`}></div>
        <div className={`${styles.cloud} ${styles.x5}`}></div>
      </div>
      <div className={styles.c}>
        <div className={styles._404}>404</div>
        <hr />
        <div className={styles._1}>THE PAGE</div>
        <div className={styles._2}>WAS NOT FOUND</div>
        <Link to="/" className={styles.btn}>
          BACK HOME?
        </Link>
      </div>
    </div>
  );
}

export default Error;
