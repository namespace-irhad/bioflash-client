import React from "react";
import SymptomAnimation from "./SymptomAnimation";
import sizeMe from "react-sizeme";
import styles from "../style.module.css";

/**
 * 'Canvas' of the whole game. This is the container where the symptoms are being rendered in. Using the package sizeMe, the whole container is rendered more responsive
 * @param {sending information to help the user give more information on hovered symptom} props
 */
function SymptomCanvas(props) {
  const { width } = props.size;

  return (
    <div
      style={{
        maxWidth: "80%",
        margin: "auto",
        height: "500px",
        backgroundColor: "#ffd3e1",
      }}
      className={styles.gameBackground}
    >
      {props.symptoms.map((symptom, key) => (
        <SymptomAnimation
          onHover={props.onHoverEvent}
          key={key}
          symptom={symptom}
          dimensions={{ width: width }}
        />
      ))}
    </div>
  );
}

export default sizeMe()(SymptomCanvas);
