import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import { Item, Label } from "semantic-ui-react";

/**
 * Main Area where player can get better knowledge of the current symptom that is being hovered
 * @param {getting the current information about the quiz question and errors if the user does not submit correctly} param0
 */
function SymptomInformation({ getInformation, error }) {
  const [informationData, setInformationData] = useState("");
  const [dataImage, setDataImage] = useState("");
  const apiUrl = (query) =>
    `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

  useEffect(() => {
    if (getInformation !== "" && getInformation !== informationData) {
      fetch(apiUrl(getInformation.toLowerCase()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.title !== "Not found.") {
            if (data.originalimage) setDataImage(data.originalimage);
            else setDataImage("");
            setInformationData(data.extract);
          } else {
            setInformationData(
              "Information Not Found. Try To guess with other symptoms."
            );
          }
        })
        .catch((err) => console.log("ERROR", err));
    }
  }, [getInformation]);

  return (
    <div className={styles.gameInformationContainer}>
      <Item className={styles.itemInformationContainer}>
        <Item.Image
          className={styles.imageInformationContainer}
          size="tiny"
          src={
            dataImage.source
              ? dataImage.source
              : "https://react.semantic-ui.com/images/wireframe/image.png"
          }
        />
        <Item.Content verticalAlign="middle">
          <Item.Header className={styles.informationHeader}>
            {getInformation}
          </Item.Header>
          <Item.Meta>
            <strong className={styles.itemDescription}>Description</strong>
          </Item.Meta>
          <Item.Description>
            {informationData
              ? informationData
              : "Hover over the symptom to get its information."}
          </Item.Description>
        </Item.Content>
        {error && (
          <Label
            color="red"
            ribbon
            style={{ position: "absolute", top: "0", left: "0" }}
          >
            {error}
          </Label>
        )}
      </Item>
    </div>
  );
}

export default SymptomInformation;
