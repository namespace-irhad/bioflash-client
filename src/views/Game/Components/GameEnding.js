import React, { Fragment } from "react";
import { Container, Button, List, Dimmer, Loader } from "semantic-ui-react";
import styles from "../style.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Game Ending Screen after answering all questions
 * @param {props that show final results and ability to restart the game again} props
 */
function GameEnding(props) {
  const { loading } = useSelector((state) => state.ui);

  return (
    <Container className={styles.gameEndContainer} textAlign="center">
      {loading ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <Fragment>
          <h2 className={styles.gameEndHeader}>Quiz Results:</h2>
          <List celled>{props.results()}</List>

          <Button.Group className={styles.buttonsEnd}>
            <Link to="/dashboard">
              <Button color="instagram">Go Back To Dashboard</Button>
            </Link>
            <Button.Or />
            <Button color="black" onClick={props.handleRestart}>
              Try Again
            </Button>
          </Button.Group>
        </Fragment>
      )}
    </Container>
  );
}

export default GameEnding;
