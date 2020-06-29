import React, { Fragment, useEffect } from "react";
import styles from "./style.module.css";
import Chatbot from "./Chatbot";
import {
  Grid,
  Segment,
  Label,
  Container,
  Step,
  Header,
  Icon,
  Statistic,
  Image,
} from "semantic-ui-react";

//Images
import backgroundImage1 from "../../assets/images/mainBackgroundHome.jpg";
import backgroundImage2 from "../../assets/images/backgroundImage2.jpg";

export default function Home() {
  useEffect(() => {
    localStorage.setItem("darkMode", "false");
  }, []);

  return (
    <Fragment>
      <Chatbot />
      <Container className={styles.homeGuestContainer}>
        <Header as="h2" icon textAlign="center">
          <Icon name="cubes" circular />
          <Header.Content>Learn and Improve With BioQuiz</Header.Content>
          <Header.Subheader className={styles.subheaderMain}>
            Join us today and complete the series of questions to help you
            improve your knowledge in Biology. Learn about different infections
            and viruses through interactive learning experience. Recognize
            different symptoms and try to guess the cause.
          </Header.Subheader>
        </Header>
        <Grid centered={true} style={{ paddingTop: "40px" }} columns={3}>
          <Grid.Column stretched largeScreen={10} mobile={6} tablet={6}>
            <Segment raised padded color="green">
              <p className={styles.paragraphHeader}>
                Learn from various users that helped grow this website and be
                one of them to contribute. When you sign up you will be given
                opportunity to play immediately and compete with others.
              </p>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid container relaxed stackable columns="2">
          <Grid.Row width={16}>
            <Grid.Column widescreen={3} tablet={5} floated="left">
              <Segment textAlign="center">
                <Statistic color="olive">
                  <Statistic.Value>5,550</Statistic.Value>
                  <Statistic.Label>Viruses</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>

            <Grid.Column widescreen={3} tablet={5} floated="right">
              <Segment textAlign="center">
                <Statistic color="olive">
                  <Statistic.Value>5,550</Statistic.Value>
                  <Statistic.Label>Symptoms</Statistic.Label>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid stretched stackable relaxed centered columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Segment raised color="green">
                <Label color="green" size="big" ribbon>
                  Add your own input and help others improve!
                </Label>
                <Image
                  style={{ height: "400px" }}
                  src={backgroundImage1}
                  centered
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised color="green">
                <Label color="green" size="big" ribbon="right">
                  Get to know certain viruses through interactive quiz!
                </Label>
                <Image
                  style={{ height: "400px" }}
                  src={backgroundImage2}
                  centered
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <div
            style={{
              bottom: "0",
              right: "0",
              position: "fixed",
              width: "350px",
            }}
          ></div>
        </Grid>
        <div className={styles.stepJoin}>
          <Segment color="green" basic textAlign="center">
            <Step.Group ordered>
              <Step>
                <Icon name="address card outline" />
                <Step.Content>
                  <Step.Title>Sign up</Step.Title>
                  <Step.Description>
                    Quickly sign up by following the link above
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <Icon name="tasks" />
                <Step.Content>
                  <Step.Title>Play</Step.Title>
                  <Step.Description>Play and learn visually</Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <Icon name="database" />
                <Step.Content>
                  <Step.Title>Contribute</Step.Title>
                  <Step.Description>Expand the quiz database</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Segment>
        </div>
      </Container>
    </Fragment>
  );
}
