import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import { Popup, Button, Icon } from "semantic-ui-react";

function shouldRender(prevProps, nextProps) {
  return prevProps.current === nextProps.current;
}

/**
 * Status of the Game together with possible hints that player can use
 * @param {showing the current virus so API can fetch the hits required to help the user} props
 */
function GameStatus(props) {
  const [informationData, setInformationData] = useState([]);

  const apiUrl = (query) =>
    `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

  useEffect(() => {
    if (props.getHint !== "" && props.getHint !== informationData) {
      fetch(apiUrl(props.getHint.toLowerCase()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.title !== "Not found.") {
            let replaceValue = new RegExp(props.getHint, "gi");
            setInformationData(
              data.extract
                .replace(replaceValue, "__")
                .match(/[^.?!]+[.!?]+[\])'"`’”]*/g)
            );
          } else {
            setInformationData("Solve this one without a hint. :(");
          }
        })
        .catch((err) => console.log("ERROR", err));
    }
  }, [informationData]);

  return (
    <div className={styles.gameStatusContainer}>
      {informationData.splice(0, 3).map((hint, key) => (
        <Popup
          key={key}
          content={hint ? hint : "Try clicking the hint again later."}
          on="click"
          pinned
          position="bottom center"
          trigger={
            <Button
              onClick={() => props.usedHints(true)}
              color="black"
              size="mini"
              icon
              labelPosition="left"
            >
              <Icon name="help" />
              Hint {key + 1}
            </Button>
          }
        />
      ))}
      <h2>
        Question {props.current} of {props.total}
      </h2>
    </div>
  );
}

export default React.memo(GameStatus, shouldRender);
