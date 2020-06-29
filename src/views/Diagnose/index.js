import React, { useEffect, useState, Fragment } from "react";
import {
  Container,
  Segment,
  List,
  Header,
  Image,
  Dimmer,
  Loader,
  Divider,
  Dropdown,
  Button,
  TransitionablePortal,
  Statistic,
} from "semantic-ui-react";
import bayes from "bayes";
import { useSelector } from "react-redux";
import Axios from "axios";

const ShowResult = (props) => {
  return (
    <TransitionablePortal
      closeOnTriggerClick
      openOnTriggerClick
      open={props.open}
    >
      <Segment
        style={{ left: "40%", position: "fixed", top: "50%", zIndex: 1000 }}
      >
        <Header>Your Results Came in!</Header>
        {props.result === "positive" ? (
          <Statistic color="red">
            <Statistic.Value>Positive</Statistic.Value>
            <Statistic.Label>
              The Result is Not Good. These Symptoms Can Prove Fatal.
            </Statistic.Label>
          </Statistic>
        ) : (
          <Statistic color="green">
            <Statistic.Value>Negative</Statistic.Value>
            <Statistic.Label>
              The Results are Good. Nothing To Fear About.
            </Statistic.Label>
          </Statistic>
        )}
      </Segment>
    </TransitionablePortal>
  );
};

export default function Diagnose() {
  const classifier = bayes({
    tokenizer: function(text) {
      return text.split(", ");
    },
  });
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState([]);
  const [showPopup, setPopup] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const { answerOptions } = useSelector((state) => state.game);

  const handleChange = (e, data) => {
    setPrediction(data.value);
  };

  async function getFinalPrediction() {
    for (const item of answerOptions) {
      let getResult = item.critical ? "negative" : "positive";
      await classifier.learn(item.symptoms.join(", "), getResult);
    }

    let finalPrediction = prediction.join(", ");
    let showPrediction = await classifier.categorize(finalPrediction);
    setFinalPrediction(showPrediction);
    var stateJson = classifier.toJson();
    console.log(stateJson);
    console.log(showPrediction);
    setPopup(true);
  }

  useEffect(() => {
    Axios.get("/symptoms")
      .then((res) => {
        setSymptoms(res.data);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      {answerOptions.length > 0 && !loading ? (
        <Fragment>
          {showPopup && (
            <ShowResult open={showPopup} result={finalPrediction} />
          )}

          <Segment style={{ height: "400px", overflowY: "scroll" }}>
            <Header as="h3" color="olive">
              Add your Symptoms and we will try to predict the fatality
            </Header>
            <List animated verticalAlign="middle">
              <Header as="h4">
                The users have decided that these infections and viruses are:
              </Header>
              {answerOptions.map((item) => (
                <List.Item key={item.name}>
                  <Image
                    avatar
                    src={
                      item.critical
                        ? "https://image.flaticon.com/icons/png/512/900/900460.png"
                        : "https://www.flaticon.com/premium-icon/icons/svg/900/900459.svg"
                    }
                  />
                  <List.Content>
                    <List.Header>{item.name}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
          <Divider />
          <Segment color="olive">
            <Dropdown
              placeholder="Choose the list of symptoms that you want diagnosed"
              fluid
              search
              selection
              multiple
              label="Choose Symptoms..."
              additionLabel="Izbor"
              pointing="top"
              options={symptoms}
              onChange={(event, data) => {
                handleChange(event, data);
              }}
              noResultsMessage="No Virus/Infection Found. Try Another."
            />
            <Divider />
            <Button
              animated="fade"
              onClick={getFinalPrediction}
              color="olive"
              size="large"
            >
              <Button.Content visible>Get Result</Button.Content>
              <Button.Content hidden>Get Prediction</Button.Content>
            </Button>
            <p>The Prediction can be incorrect due to low amount of data.</p>
          </Segment>
        </Fragment>
      ) : (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )}
    </Container>
  );
}
