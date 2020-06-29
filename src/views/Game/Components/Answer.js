import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import styles from "../style.module.css";

/**
 * Component that shows the dropdown with possible answers
 * @param {list of all possible virus options} props
 */
function Answer(props) {
  const [listOptions, setListOptions] = useState([]);
  useEffect(() => {
    setListOptions(props.options);
  }, [props.options]);

  return (
    <div className={styles.answerDropdown}>
      <Dropdown
        placeholder="Choose your verdict"
        fluid
        search
        selection
        label="What Virus/Infection is this?"
        additionLabel="Izbor"
        pointing="top"
        options={listOptions}
        onChange={(event, data) => {
          props.handleChange(event, data);
        }}
        error={props.errors ? true : false}
        noResultsMessage="No Virus/Infection Found. Try Another."
      />
    </div>
  );
}

export default Answer;
