import React from "react";
import { Item, Label, Header, Icon, Segment } from "semantic-ui-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function LatestResults({ results }) {
  dayjs.extend(relativeTime);
  return (
    <div>
      <Header color="green" as="h2" textAlign="center">
        Your Latest Quiz Results
      </Header>
      {results.length > 0 ? (
        <Item.Group divided>
          {results.map((result, key) => (
            <Item key={key}>
              <Item.Content>
                <Item.Header>
                  Answered:{" "}
                  <span className="latest-results-score">
                    {dayjs().to(dayjs(result.answeredAt))}
                  </span>
                </Item.Header>
                <Item.Meta>Quiz Results</Item.Meta>
                <Item.Description>
                  <Label color="olive" image>
                    Correct Answers:
                    <Label.Detail>{result.correctAnswers}</Label.Detail>
                  </Label>
                  <Label color="red" image>
                    Wrong Answers:
                    <Label.Detail>{result.wrongAnswers}</Label.Detail>
                  </Label>
                </Item.Description>
                <Item.Extra>
                  {result.answers.map((answer, key) => (
                    <Label
                      key={key}
                      color={
                        answer.correctAnswer === answer.answer ? "green" : "red"
                      }
                    >
                      <Label.Detail>
                        <p style={{ textAlign: "center" }}>{answer.answer}</p>
                        <p>
                          Used Hint:{" "}
                          {answer.usedHint ? (
                            <Icon disabled name="thumbs up" />
                          ) : (
                            <Icon disabled name="thumbs down" />
                          )}{" "}
                        </p>
                      </Label.Detail>
                    </Label>
                  ))}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      ) : (
        <Segment raised>
          <Header as="h4">
            Start playing the quiz to get your latest results here!
          </Header>
        </Segment>
      )}
    </div>
  );
}

export default LatestResults;
