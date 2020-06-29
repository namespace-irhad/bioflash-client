import React, { useState, useEffect, Fragment } from "react";

//Components
import GameStatus from "./Components/GameStatus";
import SymptomCanvas from "./Components/SymptomCanvas";
import Answer from "./Components/Answer";
import SymptomInformation from "./Components/SymptomInformation";
import GameEnding from "./Components/GameEnding";

//Design
import {
  Button,
  Container,
  Dimmer,
  Loader,
  Icon,
  List,
} from "semantic-ui-react";
import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { shuffleArray, sendQuizResults } from "../../redux/actions/gameActions";

export default function Game() {
  //Setting up The Game
  const { answerOptions } = useSelector((state) => state.game);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  //Showing Information of Symptoms on Hover
  const [hoverInfo, setHoverInfo] = useState("");

  //User Inputs during quiz
  const [usedHints, setUsedHints] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  //Ending
  const [showEnding, setEnding] = useState(false);
  const [restart, setRestart] = useState(false);
  const [sendResult, setSendResult] = useState(false);
  const dispatch = useDispatch();

  //Go to the next question or end the quiz. Add the anwered question to the array that will be sent to the database
  const handleClick = () => {
    if (!currentAnswer) {
      setError("Please Choose An Option.");
    } else {
      const answer = {
        correctAnswer: answerOptions[currentQuestion].name,
        answer: currentAnswer,
        usedHint: usedHints,
      };
      setAnswers([...answers, answer]);
      setCurrentAnswer("");

      //Go to the next question if the quiz has not reached the end (Here we can increase the number of questions if desired)
      if (currentQuestion + 1 < 5) {
        setCurrentQuestion(currentQuestion + 1);
        setUsedHints(false);
      } else setEnding(true);
      setError("");
    }
  };

  //When restarting the game, all information is returned to the initial state
  const restartGame = () => {
    setCurrentAnswer("");
    setAnswers([]);
    setCurrentQuestion(0);
    setEnding(false);
    setRestart((prev) => !prev);
  };

  //Select the dropdown question
  const handleDropdown = (e, data) => {
    setCurrentAnswer(data.value);
  };

  //On Hover send the current information as a prop to each element (symptom) during the question
  const onHoverEvent = (current) => {
    setHoverInfo(current);
  };

  const resultsData = () => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let finalAnswers = answers.map((question) => {
      if (question.answer === question.correctAnswer) correctAnswers++;
      else wrongAnswers++;
      return (
        <List.Item
          className={
            question.answer === question.correctAnswer
              ? styles.correctAnswerList
              : styles.wrongAnswerList
          }
          key={question.correctAnswer}
        >
          <List.Content>
            <List.Header>You Picked: {question.answer}</List.Header>
            <strong>Correct Answer:</strong> {question.correctAnswer}
            <List.Description>
              <strong>Used Hints:</strong>{" "}
              {question.usedHint ? "True" : "False"}
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });

    const answerUpload = { answers: answers, correctAnswers, wrongAnswers };
    if (answers.length > 0) {
      if (!sendResult) {
        setSendResult(true);
        dispatch(sendQuizResults(answerUpload));
      }
    }
    return finalAnswers;
  };

  useEffect(() => {
    let allOptions = [];
    answerOptions.forEach((option, key) => {
      allOptions.push({
        key: key,
        text: option.name,
        value: option.name,
      });
    });
    setOptions(allOptions);
    dispatch(shuffleArray(answerOptions));
  }, [dispatch, restart]);

  const question = answerOptions[currentQuestion];

  if (showEnding) {
    return <GameEnding results={resultsData} handleRestart={restartGame} />;
  } else
    return (
      <Container>
        {question ? (
          <Fragment>
            <GameStatus
              getHint={question.name}
              usedHints={setUsedHints}
              total="5"
              current={currentQuestion + 1}
            />
            <SymptomCanvas
              onHoverEvent={onHoverEvent}
              symptoms={question.symptoms}
            />
            <SymptomInformation error={error} getInformation={hoverInfo} />
            <div className={styles.answerGroup}>
              <Answer
                options={options}
                handleChange={handleDropdown}
                errors={error}
              />
              <Button
                color="green"
                animated
                onClick={handleClick}
                className={styles.submitButton}
              >
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div>
          </Fragment>
        ) : (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </Container>
    );
}
